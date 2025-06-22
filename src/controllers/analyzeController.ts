// src/controllers/analyzeController.ts
import { Request, Response } from 'express';
import { analyzeImage, parseAnalysisResponse } from '../services/aiService.ts';
import { base64ToImage } from '../services/imageService.ts';
import { GlobalRateLimiter } from '../middleware/rateLimiter.ts';
import { AnalyzeRequest, ApiResponse } from '../types.ts';
import logger from '../utils/logger.ts';

// Initialize global rate limiter
const globalLimiter = new GlobalRateLimiter();

/**
 * Controller for the /api/analyze endpoint
 */
export async function analyzeController(req: Request, res: Response): Promise<void> {
    // Check global rate limit
    if (globalLimiter.isLimitReached()) {
        const response: ApiResponse = {
            message: "Too many requests: Server Busy, We are serving at max",
            status: "error"
        };
        res.status(503).json(response);
        return;
    }

    // Increment global request counter
    globalLimiter.incrementCount();

    try {
        const { imageData, variables = {} }: AnalyzeRequest = req.body;
        
        // Validate request
        if (!imageData) {
            const response: ApiResponse = {
                message: "Missing required data",
                error: 'No image data provided',
                status: "error"
            };
            res.status(400).json(response);
            return;
        }

        // Process image
        const imagePart = await base64ToImage(imageData);
        
        // Get model name from environment
        const modelName = process.env.MODEL as string;
        
        // Analyze image with AI
        const textResponse = await analyzeImage(imagePart, variables, modelName);
        // console.log(textResponse);
        
        // Parse the response
        const { success, result } = parseAnalysisResponse(textResponse);
        
        // Prepare response based on parsing success
        const apiResponse: ApiResponse = success
            ? {
                message: "Image processed",
                data: [result],
                status: "success"
            }
            : {
                message: "Image processed but response format error",
                data: [result],
                status: "partial_success"
            };
            
            logger.info(`API SUCCESS`);
        res.json(apiResponse);
    } catch (error: any) {
        const apiResponse: ApiResponse = {
            message: error.message,
            error: "Failed to process image",
            status: "error"
        };
        
        logger.info(`API FAILED`);
        res.status(500).json(apiResponse);
    }
}