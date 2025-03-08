import dotenv from 'dotenv';
import { createApp } from './app.ts';
import { initializeAI } from './services/aiService.ts';

// Load environment variables
dotenv.config();

// environment variables
const port: number = Number(process.env.PORT) || 3001;
const apiKey: string = process.env.GEMINI_API_KEY as string;

// service
initializeAI(apiKey);

const app = createApp();
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});