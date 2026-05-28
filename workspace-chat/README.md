# Another No One — Workspace de Planejamento

Sala de bate-papo web em tempo real para colaboracao no design de Another No One.
Drop-in, drop-out, sempre ativa. Multiplos usuarios, contexto compartilhado, IA integrada.

## Funcionalidades

- **Chat em tempo real** via WebSocket (Socket.io)
- **Persistencia** de mensagens em SQLite
- **Lista de usuarios online** com panel lateral
- **Modo Rapido** — resposta curta e direta da IA
- **Modo Profundo** — analise extensa do contexto atual
- **Resumo** — sintese estruturada do planejamento até agora
- **Historico completo** — novos usuarios recebem as ultimas 100 mensagens ao entrar
- **Tema militar/sci-fi** escuro, coerente com a identidade do jogo

## Stack

| Camada | Tecnologia |
|--------|------------|
| Servidor | Node.js + Express + Socket.io + better-sqlite3 |
| Cliente | React + Vite + Socket.io-client + Lucide |
| IA | OpenAI API (gpt-4.1-nano / gpt-4.1-mini) |

## Requisitos

- Node.js 18+
- Chave de API da OpenAI

## Instalacao

### 1. Servidor

```bash
cd server
npm install
```

Crie o arquivo `.env`:

```
OPENAI_API_KEY=sk-sua-chave-aqui
PORT=3001
```

Inicie:

```bash
npm start
```

O servidor roda em `http://localhost:3001`.

### 2. Cliente

Em outro terminal:

```bash
cd client
npm install
npm run dev
```

O cliente roda em `http://localhost:5173`.

## Como usar

1. Acesse `http://localhost:5173`
2. Digite seu nome/callsign e o ID da sala (padrao: `ano-planejamento`)
3. Converse em tempo real com outros planejadores
4. Use os botoes no header para disparar a IA:
   - **Rapido** — resposta breve sobre o contexto atual
   - **Pensar Fundo** — analise profunda com gaps e proximos passos
   - **Resumir** — sintese estruturada das decisoes tomadas

## Arquitetura da IA

A IA nao responde automaticamente a cada mensagem. Ela e acionada sob demanda.
Quando um usuario clica em um modo:

1. O servidor coleta as ultimas 100 mensagens da sala
2. Monta um prompt com instrucoes especificas (rapido/profundo/resumo)
3. Envia para a OpenAI API
4. Quando a resposta chega, insere como mensagem tipo `ai` no chat
5. Todos na sala veem a resposta em tempo real

Os modos usam modelos diferentes:
- **Rapido**: `gpt-4.1-nano` — rapido, barato, direto
- **Profundo / Resumo**: `gpt-4.1-mini` — mais capaz, ainda rapido

Para usar modelos maiores (gpt-4.1, o3), edite o `server.js` na funcao `askAI`.

## Persistencia

Mensagens ficam em `server/chat.db` (SQLite). O historico e recuperado
automaticamente quando alguem entra na sala.

## Deploy

O servidor pode ser deployado em qualquer VPS com Node.js.
O cliente pode ser buildado com `npm run build` e servido como estatico
(ou proxied pelo proprio servidor Express).

---

*Outra No One. Outra conversa. Mesma guerra.*
