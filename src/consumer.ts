import { Worker, Job } from 'bullmq';
import prisma from './config/database';
import dotenv from 'dotenv';

dotenv.config();

const worker = new Worker('userQueue', async (job: Job) => {
  console.log(`📥 Processando usuário: ${job.data.name} (${job.data.email})`);
  try {
    const user = await prisma.user.create({ data: { name: job.data.name, email: job.data.email } });
    console.log(`✅ Usuário salvo no banco: ${user.name} (ID: ${user.id})`);
  } catch (error) {
    console.error(`❌ Erro ao salvar usuário:`, error);
    throw error;
  }
}, {
  connection: {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379
  }
});

console.log('🔄 Worker iniciado e aguardando mensagens...');