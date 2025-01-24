# Backend Legends

## Descrição

**Backend Legends** é uma API RESTful desenvolvida em Node.js com Express e Prisma para gerenciar dados relacionados a esportes. O projeto inclui funcionalidades como:

- Cadastro de jogadores, times e eventos esportivos.
- Integração com a API Futebol para informações de campeonatos.
- Consumo do Campeonato Paulista como exemplo principal, destacando a temporada de 2025.
- Simulação de partidas e estatísticas esportivas.
- Documentação da API com Swagger.
- Testes automatizados utilizando Jest.

## Tecnologias Utilizadas

- Node.js
- Typescript
- Express
- Prisma
- PostgreSQL
- Swagger
- Jest
- Thunder Client (para testes manuais)

## Requisitos

- Node.js(v16 ou superior)
- PostgreSQL
- NPM ou YARN

## Configuração do Ambiente

1. Clone o repositório:

    ```
    git clone git@github.com:Prdsilva80/backend-legends.git
    cd backend-legends
    ```

2. Instale as dependências:

    ```
    npm install
    ```

3. Configure as variáveis de ambiente criando um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

    ```
    DATABASE_URL=postgresql://seu-usuario:senha@localhost:5432/backend_legends
    PORT=3000
    ```

4. Execute as migrações para criar as tabelas no banco de dados:

    ```
    npx prisma migrate dev
    ```

5. Inicie o servidor:

    ```
    npm run dev
    ```

O servidor estará rodando em `http://localhost:3000`.

## Documentação da API

A documentação da API está disponível no Swagger em:

- **URL:** `http://localhost:3000/api-docs`

## Rotas Disponíveis

**Players**

- **GET /api/players:** Lista todos os jogadores.
- **GET /api/players/:id:** Busca um jogador pelo ID.
- **POST /api/players:** Cria um novo jogador.

  - Corpo da requisição:

    ```
    {
    "name": "Nome do Jogador",
    "position": "Posição",
    "teamId": 1
    }
    ```

- **PUT /api/players/** **:id: Atualiza um jogador pelo ID.
- **DELETE /api/players/** **:id: Remove um jogador pelo ID.

**Teams**

- **GET /api/teams:** Lista todos os times.
- **GET /api/teams/:id:** Busca um time pelo ID.
- **POST /api/teams:** Cria um novo time.

  - Corpo da requisição:

    ```
    {
    "name": "São Paulo FC",
    "country": "Brazil"
    }
    ```

- **PUT /api/teams/:id:** Atualiza um time pelo ID.
- **DELETE /api/teams/:id:** Remove um time pelo ID.

**Events**

- **GET /api/events:** Lista todos os eventos esportivos.
- **GET /api/events/:id:** Busca um evento pelo ID.
- **POST /api/events:** Cria um novo evento.

  - Corpo da requisição:

    ```
    {
    "name": "Final Match",
    "date": "2025-12-31T00:00:00.000Z",
    "location": "Morumbis",
    "teamId": 1
    }
    ```

- **PUT /api/events/:id:** Atualiza um evento pelo ID.
- **DELETE /api/events/:id:** Remove um evento pelo ID.

**Simulador de Estatísticas**

- **POST /api/simulator/match:** Simula uma partida entre dois times.
  - Corpo da requisição:

    ```
    {
    "teamA": "São Paulo",
    "teamB": "Palmeiras"
    }
    ```

- **GET /api/simulator/player/:id:** Gera estatísticas de um jogador.
- **GET /api/simulator/team/:id:** Gera estatísticas de um time.

**API Futebol**

- **GET /api/futebol/competitions:** Lista todos os campeonatos.
- **GET /api/futebol/competitions/:id:** Busca detalhes de um campeonato pelo ID.
- **GET /api/futebol/competitions/:id/teams:** Lista os times de um campeonato.
- **GET /api/futebol/competitions/:id/matches:** Lista as partidas de um campeonato.

**NOTA:** A API Futebol foi configurada para consumir dados do Campeonato Paulista, representando os campeonatos estaduais em curso no momento.

**Testes**

Os testes foram implementados utilizando `Jest`. Para executar os testes:

1. Rode os testes:

    ```
    npm test
    ```

2. Certifique-se de que o banco de dados está configurado corretamente antes de executar os testes.

### Exemplo de Requisição com Thunder Client

**Simulação de Partida**

- **URL:** `POST` `http://localhost:3000/api/simulator/match`

- **Body:**

    ```
    {
  "teamA": "São Paulo",
  "teamB": "Palmeiras"
    }
    ```

- **Resposta:**

    ```
    {
  "teamA": "São Paulo",
  "teamB": "Palmeiras",
  "teamAScore": 2,
  "teamBScore": 1,
  "winner": "São Paulo"
    }
    ```

## Melhorias Futuras

- Integração com mais APIs esportivas.
- Implementação de autenticação.
- Adição de uma interface frontend para consumo da API.
