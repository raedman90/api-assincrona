# 📌 API Assíncrona com RabbitMQ, Redis, BullMQ e Prisma

## 🚀 Sobre o Projeto
Esta API foi desenvolvida para demonstrar o uso de processamento assíncrono utilizando **RabbitMQ**, **Redis**, **BullMQ** e **Prisma**.
A API permite o envio de requisições para a fila, onde um Worker processa e armazena os dados no banco de dados PostgreSQL.

## 🛠️ Tecnologias Utilizadas
- **Node.js + Express.js** → API
- **RabbitMQ** → Message Broker
- **Redis** → Gerenciamento de filas
- **BullMQ** → Processamento assíncrono
- **PostgreSQL** → Banco de dados
- **Prisma** → ORM
- **Docker + Docker Compose** → Configuração dos serviços

## 📦 Configuração do Ambiente
### 🔧 Pré-requisitos
Antes de rodar o projeto, certifique-se de ter instalado:
- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/install/)

### 🚀 Instalação e Configuração
Clone o repositório:
```sh
 git clone https://github.com/seu-usuario/api-assincrona.git
 cd api-assincrona
```

Instale as dependências:
```sh
npm install
```

Crie o arquivo **.env** com as configurações do banco e do RabbitMQ:
```ini
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
REDIS_HOST=localhost
REDIS_PORT=6379
```

Inicie os serviços no Docker:
```sh
docker-compose up -d
```

Gere as migrações do banco de dados:
```sh
npx prisma migrate dev --name init
```

Inicie a API:
```sh
npm run dev
```

Em outra aba do terminal, inicie o Worker:
```sh
node dist/workers/UserWorker.js
```

## 📌 Endpoints Disponíveis
### ✅ Criar Usuário
**POST** `/users`
```json
{
  "name": "João Silva",
  "email": "joao@email.com"
}
```
✅ **Resposta**:
```json
{
  "message": "Usuário enviado para processamento"
}
```

---
### ✅ Listar Usuários
**GET** `/users`
✅ **Resposta**:
```json
[
  {
    "id": "uuid",
    "name": "João Silva",
    "email": "joao@email.com",
    "createdAt": "2025-02-19T14:00:00.000Z"
  }
]
```

---
### ✅ Consultar Status da Fila
**GET** `/users/queue/status`
✅ **Resposta**:
```json
{
  "waiting": 2,
  "active": 1,
  "completed": 5,
  "failed": 0
}
```

## 📜 Licença
Este projeto é de código aberto e está licenciado sob a **MIT License**.

