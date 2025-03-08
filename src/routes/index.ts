// src/routes/index.ts
import { Router, Request, Response } from 'express';
import { ipLimiter } from '../middleware/rateLimiter.ts';
import { analyzeController } from '../controllers/analyzeController.ts';

const router = Router();

// Health check routes
router.get('/', (_req: Request, res: Response): void => {
    res.json({ message: "hello" });
});

router.get('/ping', (_req: Request, res: Response): void => {
    res.json({ message: "Server pinged at Ping" });
});

// Analysis route
router.post('/api/analyze', ipLimiter, analyzeController);

export default router;