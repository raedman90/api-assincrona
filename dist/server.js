"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const client_1 = require("@prisma/client");
const bullmq_1 = require("bullmq");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const prisma = new client_1.PrismaClient();
const userQueue = new bullmq_1.Queue('userQueue', {
    connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379
    }
});
app.use(body_parser_1.default.json());
app.use('/users', userRoutes_1.default);
prisma.$connect()
    .then(() => {
    console.log('Banco de dados conectado!');
    app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
})
    .catch((err) => console.error('Erro ao conectar ao banco de dados:', err));
