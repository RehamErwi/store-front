import express, { Application, Request, Response } from 'express';
import RateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import config from './config';
import errorMiddleware from './middleware/errorMiddleware';
import routes from './routes';

const PORT = config.port || 3000;

const app: Application = express();

app.use(express.json());
app.use(morgan('common'));
app.use(helmet());
app.use(
    RateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
        standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
        legacyHeaders: false, // Disable the `X-RateLimit-*` headers
        message:
            'Too many requests from this IP, please try again after 15 minutes',
    })
);
app.use('/api', routes);
app.get('/', (_req: Request, res: Response) => {
    res.json({
        message: '👋 from main!',
    });
});

app.use(errorMiddleware);

app.use((_req: Request, res: Response) => {
    res.status(404).json({
        message: '404 Not found',
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});

export default app;
