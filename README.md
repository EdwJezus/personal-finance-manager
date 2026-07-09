# Sistema de Controle de Gastos Residenciais

Aplicação Full Stack desenvolvida como teste técnico para gerenciamento
de pessoas e controle de gastos residenciais.

O sistema permite cadastrar pessoas, registrar receitas e despesas,
visualizar transações e acompanhar o resumo financeiro geral e
individual de cada pessoa.

------------------------------------------------------------------------

# Funcionalidades

## 👤 Gerenciamento de Pessoas

-   Cadastro de pessoas
-   Listagem de pessoas cadastradas
-   Exclusão de pessoas
-   Exclusão automática das transações relacionadas

## 💳 Gerenciamento de Transações

-   Cadastro de receitas e despesas
-   Associação da transação a uma pessoa
-   Listagem completa das transações
-   Atualização automática das informações após alterações

## 📊 Resumo Financeiro

-   Total geral de receitas
-   Total geral de despesas
-   Saldo geral
-   Resumo financeiro individual por pessoa

## ✅ Validações de Negócio

-   Apenas os tipos **RECEITA** e **DESPESA** são aceitos
-   Menores de 18 anos podem registrar apenas despesas
-   Não é permitido cadastrar transações para pessoas inexistentes
-   Validações realizadas no backend

------------------------------------------------------------------------

# Interface

A aplicação possui uma interface desenvolvida em React contendo:

-   Dashboard responsivo
-   Cards com indicadores financeiros
-   Tabelas para visualização dos dados
-   Scroll interno nas listagens
-   Feedback das operações através de mensagens ao usuário

------------------------------------------------------------------------

# Funcionalidades

## Dashboard



------------------------------------------------------------------------

# Arquitetura

``` text
.
├── backend/
│   ├── Contexts/
│   ├── Controllers/
│   ├── Models/
│   ├── Services/
│   └── Program.cs
│
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Pessoa/
│   │   │   ├── Total/
│   │   │   └── Transacao/
│   │   ├── pages/
│   │   ├── services/
│   │   └── types/
│   └── package.json
│
└── README.md
```

------------------------------------------------------------------------

# Como Executar

## Backend

``` bash
cd backend
dotnet restore
dotnet run
```

## Frontend

``` bash
cd frontend
npm install
npm run dev
```

A aplicação ficará disponível em:

``` text
http://localhost:5173
```

------------------------------------------------------------------------

# Regras de Negócio

-   Pessoas menores de 18 anos podem registrar apenas despesas.
-   Apenas os tipos **RECEITA** e **DESPESA** são válidos.
-   Toda transação deve estar vinculada a uma pessoa cadastrada.
-   Ao excluir uma pessoa, suas transações também são removidas.
-   O resumo financeiro é atualizado automaticamente após alterações.

------------------------------------------------------------------------

# Tecnologias Utilizadas

## Backend

-   C#
-   ASP.NET Core
-   Entity Framework Core
-   SQLite

## Frontend

-   React
-   TypeScript
-   Vite
-   CSS

------------------------------------------------------------------------

# Conceitos Aplicados

-   Arquitetura em camadas
-   Programação Orientada a Objetos
-   Componentização com React
-   Consumo de API REST
-   CRUD completo
-   Validação de regras de negócio
-   Organização por componentes reutilizáveis
-   Responsividade

------------------------------------------------------------------------

# Licença

------------------------------------------------------------------------

MIT License © **Eduardo Jesus**
