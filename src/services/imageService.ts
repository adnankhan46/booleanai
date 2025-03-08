import sharp from 'sharp';
import { ImagePart } from '../types.ts';

export async function base64ToImage(base64String: string): Promise<ImagePart> {
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