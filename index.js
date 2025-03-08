import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';
import sharp from 'sharp';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 3, // limit each IP to 5 requests per windowMs
    message: { message: "Too many requests in a minute, You can make a maximum of 3 request per minute" }, // response message
});

// Helper function to convert base64 to image buffer
async function base64ToImage(base64String) {
    // Remove data URL prefix if present
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');
    
    // Convert to PNG format using sharp
    const pngBuffer = await sharp(imageBuffer)
        .png()
        .toBuffer();
    
    return {
        inlineData: {
            data: pngBuffer.toString('base64'),
            mimeType: 'image/png'
        }
    };
}
// GLobal Limit Handling
let requestCount = 0;
const REQUEST_LIMIT = 15;
const LIMIT_WINDOW_MS = 60 * 1000;

setInterval(() => {
    requestCount = 0;
  }, LIMIT_WINDOW_MS);

/*  # ABOUT: <POST> '/api/analyze/' :
 1. Checking GLobal Limit, Increment ReqCount
 2. From body, taking imageData and Variables(Extra Supportive words) for imageData, converting variables to strings
 3.  */
app.post('/api/analyze', limiter,async (req, res) => {
    if (requestCount >= REQUEST_LIMIT) {
        // here Server limit is reached
        return res.status(503).json({ message: "Too many request: Server Busy, We are serving at max" });
      }
      requestCount++;

    try {
        const { imageData, variables = {} } = req.body;
        
        if (!imageData) {
            return res.status(400).json({ error: 'No image data provided' });
        }

        const model = genAI.getGenerativeModel({ model: process.env.MODEL });
        const imagePart = await base64ToImage(imageData);

        const prompt = `You have been given an image with digital electronics questions or circuit problems to solve.
        Based on the problem in the image, return only the appropriate JSON object in plain text (do not use backticks or the word 'json').
        Understand the text and numbers from image properly, also if it is a K-Map then make proper coordinates and then give correct answer
The types of questions may include:

1. Logic Gate Expressions:
Return format: {"type": "logic_expression", "expr": "original expression", "result": "simplified expression"}

2. Code Conversions (BCD, Excess-3, etc.):
Return format: {"type": "code_conversion", "input_type": "BCD", "output_type": "Excess-3", "input": "input value", "result": "converted value"}

3. K-maps:
Return format: {"type": "kmap", "variables": ["A", "B", "C"], "minimized_sop": "simplified SOP", "minimized_pos": "simplified POS", "expression_type": "SOP"}

4. Binary Arithmetic:
Return format: {"type": "binary_arithmetic", "operation": "addition", "operand1": "1010", "operand2": "0101", "result": "1111"}

5. Boolean Algebra:
Return format: {"type": "boolean_simplification", "original": "original expression", "result": "simplified expression"}

Analyze the problem in the image and return ONLY the appropriate JSON object.
Make sure do not use backticks and json names, give only return values as json like object,

now based on the question type,
Use proper escape characters for special symbols. Use 'exclamation mark' for showing 'not' or 'complement'
If any variables are provided, use their values: ${JSON.stringify(variables)}`;

        const result = await model.generateContent([prompt, imagePart]);
        const response = result.response;
        const text = response.text();

        // Remove any backticks or formatting issues before parsing
        // const cleanText0 = text.replace(/`/g, '').trim(); // Removes backticks
        // const cleanText = cleanText0.replace(/json/g, '').trim(); // Removes backticks
        console.log(text);

        // Try to parse the response as JSON
        try {
            const jsonResponse = JSON.parse(text);
            console.log("Parsed JSON data:", jsonResponse);
            res.json({
                message: "Image processed",
                data: [jsonResponse],
                status: "success"
            });
        } catch (e) {
            console.error('JSON parsing error:', e);
            res.json({
                message: "Image processed but response format error",
                data: [{ type: "raw_response", result: text }],
                status: "partial_success"
            });
        }

    } catch (error) {
        console.error('Error:', error);
        console.error('Error ka Message: ', error.statusText);
        res.status(500).json({
            message: error.statusText,
            error: "Failed to process image",
            status: "error"
        });
    }
});

app.get('/', (req, res) => res.json({ "message": "hello" }));
app.get('/ping', (req, res) => res.json({ "message": "Server pinged at X" }));

// check memory usage
  
const formatMemoryUsage = (data) => `${Math.round(data / 1024 / 1024 * 100) / 100} MB`;
  
const memoryData = process.memoryUsage();

const memoryUsage = {
  rss: `${formatMemoryUsage(memoryData.rss)} -> Resident Set Size - total memory allocated for the process execution`,
  heapTotal: `${formatMemoryUsage(memoryData.heapTotal)} -> total size of the allocated heap`,
  heapUsed: `${formatMemoryUsage(memoryData.heapUsed)} -> actual memory used during the execution`,
  external: `${formatMemoryUsage(memoryData.external)} -> V8 external memory`,
};

console.log(memoryUsage);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
