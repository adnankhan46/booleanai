import express, { Application } from 'express';
import cors from 'cors';
import routes from './routes/index.ts';

export function createApp(): Application {
    const app: Application = express();
    
    // middlewares
    app.use(cors());
    app.use(express.json({ limit: '50mb' }));
    
    // routes
    app.use(routes);
    
    return app;
}