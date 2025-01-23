import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes';
import { swaggerUi, swaggerSpec } from './config/swagger';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', routes);

// Adicione a documentação do Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
