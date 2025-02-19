import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes';
import { PrismaClient } from '@prisma/client';
import { Queue } from 'bullmq';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const prisma = new PrismaClient();

const userQueue = new Queue('userQueue', {
  connection: {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379
  }
});

app.use(bodyParser.json());
app.use('/users', userRoutes);

prisma.$connect()
  .then(() => {
    console.log('Banco de dados conectado!');
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
  })
  .catch((err: unknown) => console.error('Erro ao conectar ao banco de dados:', err));
