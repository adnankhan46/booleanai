import { GoogleGenerativeAI, GenerativeModel, Part } from '@google/generative-ai';
import { ImagePart, AnalysisResult } from '../types.ts';
import { generatePrompt } from '../utils/promptGenerator.ts';

let genAI: GoogleGenerativeAI;

/**
 * Initialize the Gemini AI client
*/
export function initializeAI(apiKey: string): void {
    genAI = new GoogleGenerativeAI(apiKey);
}

/** info:
 * Analyzes an image using Gemini AI
 * @param imageData - Image data to analyze
 * @param variables - Variables to include in the prompt
 * @param modelName - Name of the model to use
 * @returns Promise resolving to analysis text
 */
export async function analyzeImage(
    imagePart: ImagePart, 
    variables: Record<string, any> = {}, 
    modelName: string
): Promise<string> {
    if (!genAI) {
        throw new Error('AI service not initialized');
    }

    const model: GenerativeModel = genAI.getGenerativeModel({ model: modelName });
    const prompt: string = generatePrompt(variables);
    
    const result = await model.generateContent([prompt, imagePart as unknown as Part]);
    return result.response.text();
}

/**
 * Parses the analysis response into a structured result
 * @param responseText - Text response from AI
 * @returns Parsed analysis result or raw response
 */
export function parseAnalysisResponse(responseText: string): {
    success: boolean;
    result: AnalysisResult;
} {
    try {
        const parsedResult: AnalysisResult = JSON.parse(responseText);
        return {
            success: true,
            result: parsedResult
        };
    } catch (e) {
        return {
            success: false,
            result: { 
                type: 'raw_response', 
                result: responseText 
            }
        };
    }
}