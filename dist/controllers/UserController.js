"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getQueueStatus = exports.listUsers = exports.createUser = void 0;
const bullmq_1 = require("bullmq");
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const prisma = new client_1.PrismaClient();
const userQueue = new bullmq_1.Queue('userQueue', {
    connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email } = req.body;
        if (!name || !email) {
            return res.status(400).json({ message: 'Nome e email são obrigatórios' });
        }
        yield userQueue.add('createUser', { name, email });
        res.status(202).json({ message: 'Usuário enviado para processamento' });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao adicionar usuário à fila', error });
    }
});
exports.createUser = createUser;
const listUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma.user.findMany();
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao buscar usuários', error });
    }
});
exports.listUsers = listUsers;
const getQueueStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const waiting = yield userQueue.getWaitingCount();
        const active = yield userQueue.getActiveCount();
        const completed = yield userQueue.getCompletedCount();
        const failed = yield userQueue.getFailedCount();
        res.status(200).json({ waiting, active, completed, failed });
    }
    catch (error) {
        res.status(500).json({ message: 'Erro ao obter status da fila', error });
    }
});
exports.getQueueStatus = getQueueStatus;
