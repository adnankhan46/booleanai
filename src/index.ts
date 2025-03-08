import express, { Request, Response, Application } from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import cors from 'cors';
import sharp from 'sharp';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';

dotenv.config();

const app: Application = express();
const port: number = Number(process.env.PORT) || 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 3, // limit each IP to 3 requests per windowMs
    message: { message: "Too many requests in a minute, You can make a maximum of 3 requests per minute" },
});

// Helper function to convert base64 to image buffer
async function base64ToImage(base64String: string) {
    const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
    const imageBuffer = Buffer.from(base64Data, 'base64');
    
    const pngBuffer = await sharp(imageBuffer).png().toBuffer();
    
    return {
        inlineData: {
            data: pngBuffer.toString('base64'),
            mimeType: 'image/png'
        }
    };
}

// Global Limit Handling
let requestCount = 0;
const REQUEST_LIMIT = 15;
const LIMIT_WINDOW_MS = 60 * 1000;

setInterval(() => {
    requestCount = 0;
}, LIMIT_WINDOW_MS);

app.post('/api/analyze', limiter, async (req: Request, res: Response): Promise<any|void> => {
    if (requestCount >= REQUEST_LIMIT) {
        return res.status(503).json({ message: "Too many requests: Server Busy, We are serving at max" });
    }
    requestCount++;

    try {
        const { imageData, variables = {} } = req.body;
        
        if (!imageData) {
            return res.status(400).json({ error: 'No image data provided' });
        }

        const model = genAI.getGenerativeModel({ model: process.env.MODEL as string });
        const imagePart = await base64ToImage(imageData);

        const prompt = `You have been given an image with digital electronics questions or circuit problems to solve.\n\nUse proper escape characters for special symbols. Use 'exclamation mark' for showing 'not' or 'complement'. If any variables are provided, use their values: ${JSON.stringify(variables)}`;

        const result = await model.generateContent([prompt, imagePart]);
        const response = result.response;
        const text = response.text();
        
        try {
            const jsonResponse = JSON.parse(text);
            res.json({
                message: "Image processed",
                data: [jsonResponse],
                status: "success"
            });
        } catch (e) {
            res.json({
                message: "Image processed but response format error",
                data: [{ type: "raw_response", result: text }],
                status: "partial_success"
            });
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message,
            error: "Failed to process image",
            status: "error"
        });
    }
});

app.get('/', (req: Request, res: Response):any => res.json({ message: "hello" }));
app.get('/ping', (req: Request, res: Response):any => res.json({ message: "Server pinged at Ping" }));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
