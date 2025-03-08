import express, { Request, Response, Application } from 'express';
import { GoogleGenerativeAI, GenerativeModel, Part } from '@google/generative-ai';
import cors from 'cors';
import sharp from 'sharp';
import dotenv from 'dotenv';
import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';

// Define interfaces for request and response types
interface AnalyzeRequest {
  imageData: string;
  variables?: Record<string, any>;
}

interface ImagePart {
  inlineData: {
    data: string;
    mimeType: string;
  };
}

interface ApiResponse {
  message: string;
  data?: any[];
  status: 'success' | 'partial_success' | 'error';
  error?: string;
}

// Response types for different analysis results
interface LogicExpressionResult {
  type: 'logic_expression';
  expr: string;
  result: string;
}

interface CodeConversionResult {
  type: 'code_conversion';
  input_type: string;
  output_type: string;
  input: string;
  result: string;
}

interface KmapResult {
  type: 'kmap';
  variables: string[];
  minimized_sop: string;
  minimized_pos: string;
  expression_type: string;
}

interface BinaryArithmeticResult {
  type: 'binary_arithmetic';
  operation: string;
  operand1: string;
  operand2: string;
  result: string;
}

interface BooleanSimplificationResult {
  type: 'boolean_simplification';
  original: string;
  result: string;
}

interface RawResponseResult {
  type: 'raw_response';
  result: string;
}

type AnalysisResult = 
  | LogicExpressionResult 
  | CodeConversionResult 
  | KmapResult 
  | BinaryArithmeticResult 
  | BooleanSimplificationResult 
  | RawResponseResult;

dotenv.config();

const app: Application = express();
const port: number = Number(process.env.PORT) || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const limiter: RateLimitRequestHandler = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 3, // limit each IP to 3 requests per windowMs
    message: { message: "Too many requests in a minute, You can make a maximum of 3 requests per minute" },
});

// Helper function to convert base64 to image buffer
async function base64ToImage(base64String: string): Promise<ImagePart> {
    const base64Data: string = base64String.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer: Buffer = Buffer.from(base64Data, 'base64');
    
    const pngBuffer: Buffer = await sharp(imageBuffer).png().toBuffer();
    
    return {
        inlineData: {
            data: pngBuffer.toString('base64'),
            mimeType: 'image/png'
        }
    };
}

// Global Limit Handling
let requestCount: number = 0;
const REQUEST_LIMIT: number = 15;
const LIMIT_WINDOW_MS: number = 60 * 1000;

setInterval(() => {
    requestCount = 0;
}, LIMIT_WINDOW_MS);

app.post('/api/analyze', limiter, async (req: Request, res: Response): Promise<void> => {
    if (requestCount >= REQUEST_LIMIT) {
        res.status(503).json({ 
            message: "Too many requests: Server Busy, We are serving at max",
            status: "error" 
        });
        return;
    }
    requestCount++;

    try {
        const { imageData, variables = {} }: AnalyzeRequest = req.body;
        
        if (!imageData) {
            res.status(400).json({ 
                error: 'No image data provided',
                status: "error",
                message: "Missing required data" 
            });
            return;
        }

        const model: GenerativeModel = genAI.getGenerativeModel({ model: process.env.MODEL as string });
        const imagePart: ImagePart = await base64ToImage(imageData);

        const prompt: string = `You have been given an image with digital electronics questions or circuit problems to solve.
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

        const result = await model.generateContent([prompt, imagePart as unknown as Part]);
        const textResponse = await result.response.text();
        console.log("Result: ", textResponse);
        
        try {
            const jsonResponse: AnalysisResult = JSON.parse(textResponse);
            const apiResponse: ApiResponse = {
                message: "Image processed",
                data: [jsonResponse],
                status: "success"
            };
            res.json(apiResponse);
        } catch (e) {
            const apiResponse: ApiResponse = {
                message: "Image processed but response format error",
                data: [{ type: "raw_response", result: textResponse }],
                status: "partial_success"
            };
            res.json(apiResponse);
        }
    } catch (error: any) {
        const apiResponse: ApiResponse = {
            message: error.message,
            error: "Failed to process image",
            status: "error"
        };
        res.status(500).json(apiResponse);
    }
});

app.get('/', (_req: Request, res: Response): void => {
    res.json({ message: "hello" });
});

app.get('/ping', (_req: Request, res: Response): void => {
    res.json({ message: "Server pinged at Ping" });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});