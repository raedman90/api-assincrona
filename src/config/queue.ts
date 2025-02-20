import { Queue } from 'bullmq';
import dotenv from 'dotenv';

dotenv.config();

const userQueue = new Queue('userQueue', {
  connection: {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379
  }
});

export default userQueue;