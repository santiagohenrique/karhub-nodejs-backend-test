# Karhub Backend Test

API em Node.js para gerenciamento de autopeças e priorização de reposição de estoque.

## Tecnologias usadas

- NestJS (Node.js + TypeScript)
- TypeORM
- MariaDB (via Docker)
- Jest (testes)

## Como subir o projeto

### 1. Pré-requisitos

- Node.js 20x ou superior
- pnpm
- Docker + Docker Compose

### 2. Instalar dependências

```bash
pnpm install
```

### 3. Configurar variáveis de ambiente

Copie o arquivo de exemplo e ajuste se necessário:

```bash
cp .env.example .env
```

### 4. Subir banco de dados

```bash
docker compose up -d
```

### 5. Subir a aplicação em desenvolvimento

```bash
pnpm run dev
```

Subir a aplicação em dev automaticamente executa as migrations.

### 6. Rodar seed de peças

Em outro terminal, rodar:

```bash
pnpm run seed:parts
```

Observação: o seed só insere os dados se a tabela `parts` estiver vazia.

----------

API local:

- Base URL: `http://localhost:3000/api`
- Swagger: `http://localhost:3000/api/docs`

## Rodar testes

```bash
pnpm test
```

## Resumo da solução

- CRUD completo de peças (`/parts`)
- Endpoint de priorização (`/restock/priorities`)
- Cálculo de reposição isolado da camada HTTP
- Organização por camadas com foco em DDD (domain, app, infra)
