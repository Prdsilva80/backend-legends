import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import routes from './routes';
import logger from './config/logger';
import { swaggerUi, swaggerSpec } from './config/swagger';

dotenv.config();

const app = express();

// Middleware para limitar requisições
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 100, // Máximo de 100 requisições por IP a cada 15 min
    message: "Muitas requisições deste IP, tente novamente mais tarde."
});

app.use(cors());
app.use(helmet());
app.use(express.json());

// Logger antes das requisições
app.use((req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});

app.use(limiter);
app.use('/api', routes);

// Adiciona a documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware de erro global
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.stack);
    res.status(500).json({ error: 'Erro interno do servidor' });
});

export default app;
