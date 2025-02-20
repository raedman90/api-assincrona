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
const bullmq_1 = require("bullmq");
const database_1 = __importDefault(require("./config/database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const worker = new bullmq_1.Worker('userQueue', (job) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`📥 Processando usuário: ${job.data.name} (${job.data.email})`);
    try {
        const user = yield database_1.default.user.create({ data: { name: job.data.name, email: job.data.email } });
        console.log(`✅ Usuário salvo no banco: ${user.name} (ID: ${user.id})`);
    }
    catch (error) {
        console.error(`❌ Erro ao salvar usuário:`, error);
        throw error;
    }
}), {
    connection: {
        host: process.env.REDIS_HOST || 'localhost',
        port: Number(process.env.REDIS_PORT) || 6379
    }
});
console.log('🔄 Worker iniciado e aguardando mensagens...');
