import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import routes from './routes/index.ts';
import logger, {stream} from './utils/logger.ts';
import morgan from 'morgan';


export function createApp(): Application {
    const app: Application = express();
    
    // middlewares
    app.use(cors());
    app.use(express.json({ limit: '50mb' }));

    // request logging middleware
    app.use((req: Request, res: Response, next: NextFunction) => {
        logger.info(`${req.method} ${req.url}`);
        next();
    });

    app.use(morgan('combined', { stream }));
    
    // routes
    app.use(routes);
    
    return app;
}