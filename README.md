# 🎟️ API Node.js com PostgreSQL para Gestão de Ingressos

Este projeto é uma API REST criada com Node.js e PostgreSQL para gerenciar a venda de ingressos para eventos.

## 🛠️ Passo 1: Configurar o Ambiente

### 1️⃣ Instalar o Node.js
Caso ainda não tenha instalado, baixe e instale o [Node.js](https://nodejs.org/).

Verifique a instalação:
```sh
node -v
npm -v
```

### 2️⃣ Criar a Pasta do Projeto e Inicializar o Node.js
Crie a pasta do projeto e execute:
```sh
mkdir ingressos-api
cd ingressos-api
npm init -y
```
Isso criará um arquivo `package.json`, que gerencia as dependências do projeto.

### 3️⃣ Instalar Dependências
Agora, instale as bibliotecas necessárias:
```sh
npm install express cors dotenv pg
```

📌 Explicação das dependências:
- `express` → Framework para criar o servidor web
- `cors` → Permite que a API seja acessada por outros domínios
- `dotenv` → Gerencia variáveis de ambiente
- `pg` → Cliente PostgreSQL para Node.js

Para reiniciar o servidor automaticamente ao salvar alterações, instale o Nodemon:
```sh
npm install nodemon --save-dev
```

### 4️⃣ Configurar os Scripts no package.json
Edite `package.json` e adicione dentro de `scripts`:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```
Agora podemos iniciar o servidor com:
```sh
npm run dev
```

## 🌍 Passo 2: Criar o Arquivo .env
Crie um arquivo `.env` na raiz do projeto e adicione:
```sh
PORT=3000
DB_USER=postgres
DB_HOST=localhost
DB_NAME=eventos
DB_PASSWORD=sua_senha
DB_PORT=5432
```
Substitua `DB_PASSWORD` pelos dados reais do seu PostgreSQL.

## 📂 Passo 3: Criar o Arquivo .gitignore
No arquivo `.gitignore`, adicione:
```sh
node_modules/
.env
```
Isso impede que arquivos sensíveis sejam enviados ao repositório.

## 📥 Clonando o Repositório
Se deseja clonar este projeto do GitHub, execute:
```sh
https://github.com/juguarnieri/gestao-ingressos-BackEnd.git
cd ingressos-api
npm install
```
Isso baixará o código e instalará as dependências necessárias.

## 🗄️ Passo 4: Configurar o Banco de Dados

### 1️⃣ Criar o Banco de Dados e a Tabela
No PostgreSQL, execute o seguinte SQL:
```sql
CREATE DATABASE bilheteria;

CREATE TABLE ingressos (
    id SERIAL PRIMARY KEY,
    evento VARCHAR(255) NOT NULL,
    local VARCHAR(255)  NOT NULL,
    data_evento DATE NOT NULL,
    categoria VARCHAR(50) NOT NULL,
    preco DECIMAL(10,2) NOT NULL,
    quantidade_disponivel INTEGER NOT NULL
);

INSERT INTO ingressos (evento, local, data_evento, categoria, preco, quantidade_disponivel) VALUES 
('Show sertanejo- Ana Castela', 'Valinhos, São Paulo', '2025-09-10', 'Pista', 100.00, 500),
('Show sertanejo- Ana Castela', 'Valinhos, São Paulo', '2025-09-10', 'Pista VIP', 200.00, 300),
('Show sertanejo- Ana Castela', 'Valinhos, São Paulo', '2025-09-10', 'Camarote', 300.00, 200),
('Show sertanejo- Ana Castela', 'Valinhos, São Paulo', '2025-09-10', 'Arquibancada', 80.00, 800);

```

## 🚀 Passo 5: Rodando a API

### 1️⃣ Modo Desenvolvimento
```sh
npm run dev
```

### 2️⃣ Modo Produção
```sh
npm start
```

A API estará rodando em: [http://localhost:3000](http://localhost:3000)

## 🛣️ Passo 6: Endpoints da API

### 📌 Criar um novo ingresso
**POST** `/ingressos`
```json
{
       "evento": "Show sertanejo- Ana Castela",
        "local": "Valinhos, SÆo Paulo",
        "data_evento": "2025-09-10T03:00:00.000Z",
        "categoria": "Pista",
        "preco": "100.00",
        "quantidade_disponivel": 700
}
```

### 📌 Listar todos os ingressos disponíveis
**GET** `/ingressos`

### 📌 Consultar um ingresso específico
**GET** `/ingressos/:id`

### 📌 Atualizar um ingresso
**PUT** `/ingressos/:id`
Body-raw
```json
{
    "evento": "Show sertanejo- Ana Castela",
    "local": "Valinhos, SÆo Paulo",
    "data_evento": "2025-09-10T03:00:00.000Z",
    "categoria": "Pista",
    "preco": "100.00",
    "quantidade_disponivel": 160
}
```

### 📌 Remover um ingresso
**DELETE** `/ingressos/:id`

### 📌 Realizar a venda de um ingresso
**POST** `/venda`
```json
{
  "id": 1,
  "quantidade": 18,
  "preco":100
}
```

Fluxo esperado:
1. Buscar o ingresso pelo `id`.
2. Verificar se há ingressos disponíveis suficientes.
3. Se houver, subtrair a quantidade vendida de `quantidade_disponivel`.
4. Se `quantidade_disponivel` chegar a 0, impedir novas vendas.
5. Retornar uma mensagem de sucesso com os detalhes da compra.

### 📌 Resposta de Sucesso (HTTP 200)
```json
{
    "mensagem": "Compra realizada com sucesso!",
    "evento": "Show sertanejo- Ana Castela",
    "categoria": "Pista",
    "preco_unitario": "100.00",
    "quantidade_comprada": 18,
    "preco_total": "1800.00",
    "quantidade_restante": 464
}
```

### 📌 Erro por falta de ingressos (HTTP 400)
```json
{
  "erro": "Ingressos insuficientes para a venda."
}
```

## 📂 Estrutura do Projeto
```
ingressos-api/
│── src/
│   ├── config/
│   │   ├── database.js
│   ├── models/
│   │   ├── ticketModel.js
│   ├── controllers/
│   │   ├── ticketController.js
│   ├── routes/
│   │   ├── ticketRoutes.js
│   ├── database/
│   │   ├── schema.sql
│── .env
│── package.json
│── .gitignore
│── server.js
```

## 📜 Licença
Este projeto está sob a Licença MIT.
