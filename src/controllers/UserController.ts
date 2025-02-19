import { Request, Response } from 'express';
import { Queue } from 'bullmq';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const userQueue = new Queue('userQueue', {
  connection: {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379
  }
});

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;
    
    if (!name || !email) {
      return res.status(400).json({ message: 'Nome e email são obrigatórios' });
    }
    
    await userQueue.add('createUser', { name, email });
    
    res.status(202).json({ message: 'Usuário enviado para processamento' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar usuário à fila', error });
  }
};

export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error });
  }
};

export const getQueueStatus = async (req: Request, res: Response) => {
  try {
    const waiting = await userQueue.getWaitingCount();
    const active = await userQueue.getActiveCount();
    const completed = await userQueue.getCompletedCount();
    const failed = await userQueue.getFailedCount();
    
    res.status(200).json({ waiting, active, completed, failed });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter status da fila', error });
  }
};
