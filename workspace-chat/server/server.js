import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import Database from "better-sqlite3";
import multer from "multer";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, ".env") });

const app = express();
app.use(cors());
app.use(express.json({ limit: "20mb" }));

const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
  maxHttpBufferSize: 20e6,
});

// === Config ===
const JWT_SECRET = process.env.JWT_SECRET || "ano-jwt-secret-change-in-production";
const SALT_ROUNDS = 10;

// === SQLite ===
const db = new Database(join(__dirname, "chat.db"));
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    display_name TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    room_id TEXT NOT NULL DEFAULT 'default',
    username TEXT NOT NULL,
    content TEXT NOT NULL,
    type TEXT DEFAULT 'user',
    model TEXT,
    attachment TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

const insertMsg = db.prepare(
  "INSERT INTO messages (room_id, username, content, type, model, attachment) VALUES (?, ?, ?, ?, ?, ?)"
);
const selectHistory = db.prepare(
  "SELECT * FROM messages WHERE room_id = ? ORDER BY created_at DESC LIMIT 100"
);
const findUser = db.prepare("SELECT * FROM users WHERE username = ?");
const updateUserName = db.prepare("UPDATE users SET username = ? WHERE id = ?");
const updateUserPass = db.prepare("UPDATE users SET password_hash = ? WHERE id = ?");

// === Seed default users ===
const seedUsers = [
  { username: "dude", password: "dude123" },
  { username: "magno", password: "magno123" },
  { username: "rene", password: "rene123" },
];
for (const u of seedUsers) {
  const existing = findUser.get(u.username);
  if (!existing) {
    const hash = bcrypt.hashSync(u.password, SALT_ROUNDS);
    db.prepare("INSERT INTO users (username, password_hash) VALUES (?, ?)").run(u.username, hash);
    console.log(`Usuario criado: ${u.username}`);
  }
}

// === Multer ===
const storage = multer.diskStorage({
  destination: join(__dirname, "uploads"),
  filename: (_req, file, cb) => {
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = file.originalname.split(".").pop();
    cb(null, `${unique}.${ext}`);
  },
});
const upload = multer({ storage, limits: { fileSize: 15 * 1024 * 1024 } });

// === Auth helpers ===
function signToken(userId, username) {
  return jwt.sign({ id: userId, username }, JWT_SECRET, { expiresIn: "7d" });
}

function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

// === Ollama ===
const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "https://api.ollama.com";
const OLLAMA_API_KEY = process.env.OLLAMA_API_KEY;
const OLLAMA_MODEL = process.env.OLLAMA_MODEL_DEEP || "kimi-k2.6";

const SYSTEM_PROMPT = `Voce e um assistente de design de jogos para "Another No One", um jogo persistente de acao-tatica sci-fi com simulacao emergente global. Voce conhece todos os documentos de design. Seja direto, tecnico e pragmatico. Responda em portugues.`;

const QUICK_PROMPT = `Responda de forma breve e direta (maximo 3 paragrafos curtos). Foque no essencial.`;
const DEEP_PROMPT = `Analise profundamente o contexto de planejamento abaixo. Identifique inconsistencias, gaps, oportunidades de design e sugira proximos passos concretos. Seja extenso e detalhado.`;
const SUMMARY_PROMPT = `Resuma o contexto de planejamento abaixo em topicos estruturados. Destaque decisoes tomadas, questoes em aberto e proximos passos sugeridos.`;

function isImage(mime, filename) {
  if (mime && /\/(png|jpeg|jpg|gif|webp|bmp)/i.test(mime)) return true;
  return /\.(png|jpe?g|gif|webp|bmp)$/i.test(filename || "");
}

function isTextDoc(filename) {
  return /\.(txt|md|json|csv|log)$/i.test(filename || "");
}

function fileToBase64(path) {
  const buf = readFileSync(path);
  return buf.toString("base64");
}

function buildMessages(history, mode, attachmentInfo) {
  const instruction = mode === "quick" ? QUICK_PROMPT : mode === "summary" ? SUMMARY_PROMPT : DEEP_PROMPT;
  const messages = [{ role: "system", content: SYSTEM_PROMPT + "\n\n" + instruction }];

  for (const m of history.slice(-50)) {
    const msg = { role: m.username === "IA" ? "assistant" : "user", content: `[${m.username}]: ${m.content}` };
    if (m.attachment) {
      try {
        const att = JSON.parse(m.attachment);
        if (att.base64 && isImage(att.mime, att.name)) {
          msg.images = [att.base64];
        } else if (att.textContent) {
          msg.content += `\n\n[Anexo: ${att.name}]\n${att.textContent.slice(0, 8000)}`;
        } else {
          msg.content += `\n\n[Anexo: ${att.name}]`;
        }
      } catch (_e) {}
    }
    messages.push(msg);
  }

  if (attachmentInfo) {
    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.role === "user") {
      if (attachmentInfo.base64 && isImage(attachmentInfo.mime, attachmentInfo.name)) {
        lastMsg.images = lastMsg.images || [];
        lastMsg.images.push(attachmentInfo.base64);
      } else if (attachmentInfo.textContent) {
        lastMsg.content += `\n\n[Anexo atual: ${attachmentInfo.name}]\n${attachmentInfo.textContent.slice(0, 8000)}`;
      } else {
        lastMsg.content += `\n\n[Anexo atual: ${attachmentInfo.name}]`;
      }
    }
  }
  return messages;
}

async function askAI(history, mode = "deep", attachmentInfo) {
  if (!OLLAMA_API_KEY) {
    return { content: "Erro: OLLAMA_API_KEY nao configurada.", model: "none" };
  }
  const model = mode === "quick" ? (process.env.OLLAMA_MODEL_QUICK || OLLAMA_MODEL) : mode === "summary" ? (process.env.OLLAMA_MODEL_SUMMARY || OLLAMA_MODEL) : OLLAMA_MODEL;
  const messages = buildMessages(history, mode, attachmentInfo);
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${OLLAMA_API_KEY}` },
      body: JSON.stringify({ model, messages, stream: false }),
    });
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errText}`);
    }
    const data = await response.json();
    return { content: data.message?.content || "(sem resposta)", model };
  } catch (e) {
    return { content: `Erro na API Ollama Cloud: ${e.message}`, model: "error" };
  }
}

// === HTTP Routes ===

app.post("/api/login", (req, res) => {
  const { username, password } = req.body || {};
  if (!username || !password) {
    return res.status(400).json({ ok: false, error: "usuario e senha obrigatorios" });
  }
  const user = findUser.get(username);
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    return res.status(401).json({ ok: false, error: "credenciais invalidas" });
  }
  const token = signToken(user.id, user.username);
  res.json({ ok: true, token, username: user.username });
});

app.post("/api/change-credentials", (req, res) => {
  const auth = req.headers.authorization;
  if (!auth?.startsWith("Bearer ")) {
    return res.status(401).json({ ok: false, error: "nao autenticado" });
  }
  const decoded = verifyToken(auth.slice(7));
  if (!decoded) {
    return res.status(401).json({ ok: false, error: "token invalido" });
  }

  const { newUsername, newPassword, currentPassword } = req.body || {};
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(decoded.id);
  if (!user || !bcrypt.compareSync(currentPassword, user.password_hash)) {
    return res.status(401).json({ ok: false, error: "senha atual incorreta" });
  }

  // Verificar se novo username ja existe (e nao e o proprio)
  if (newUsername && newUsername !== user.username) {
    const existing = findUser.get(newUsername);
    if (existing) {
      return res.status(409).json({ ok: false, error: "nome de usuario ja existe" });
    }
    updateUserName.run(newUsername, user.id);
  }

  if (newPassword) {
    const newHash = bcrypt.hashSync(newPassword, SALT_ROUNDS);
    updateUserPass.run(newHash, user.id);
  }

  const updatedUser = db.prepare("SELECT * FROM users WHERE id = ?").get(user.id);
  const token = signToken(updatedUser.id, updatedUser.username);
  res.json({ ok: true, token, username: updatedUser.username });
});

app.get("/api/test-ollama", async (_req, res) => {
  try {
    const response = await fetch(`${OLLAMA_BASE_URL}/v1/models`, {
      headers: { Authorization: `Bearer ${OLLAMA_API_KEY}` },
    });
    const data = await response.json();
    res.json({ ok: response.ok, status: response.status, models: data });
  } catch (e) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.post("/api/test-chat", async (_req, res) => {
  try {
    const result = await askAI([{ username: "teste", content: "Oi, responda em portugues.", type: "user", model: null, attachment: null }], "quick");
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.post("/api/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "nenhum arquivo enviado" });
  const { filename, originalname, mimetype, size, path: filePath } = req.file;
  let attachment = { name: originalname, mime: mimetype, size, filename };
  if (isImage(mimetype, originalname)) {
    attachment.base64 = fileToBase64(filePath);
  } else if (isTextDoc(originalname)) {
    try { attachment.textContent = readFileSync(filePath, "utf-8"); }
    catch (_e) { attachment.textContent = "(erro ao ler arquivo)"; }
  }
  res.json({ ok: true, attachment });
});

// === Socket.IO ===
const onlineUsers = new Map(); // socketId -> { username, roomId, joinedAt, userId }

io.use((socket, next) => {
  const token = socket.handshake.auth?.token;
  if (!token) return next(new Error("token nao fornecido"));
  const decoded = verifyToken(token);
  if (!decoded) return next(new Error("token invalido"));
  socket.userId = decoded.id;
  socket.username = decoded.username;
  next();
});

io.on("connection", (socket) => {
  const authUsername = socket.username;
  const authUserId = socket.userId;

  socket.on("join", ({ username, roomId = "default" }) => {
    // Forca o username do token
    const displayName = username || authUsername;
    socket.join(roomId);
    onlineUsers.set(socket.id, { username: displayName, roomId, joinedAt: new Date(), userId: authUserId });
    socket.to(roomId).emit("user_joined", { username: displayName, time: Date.now() });
    io.to(roomId).emit("users_online", Array.from(onlineUsers.values()).filter((u) => u.roomId === roomId));
    io.emit("users_global", Array.from(onlineUsers.values()).map((u) => ({ username: u.username, roomId: u.roomId, joinedAt: u.joinedAt })));
    const rows = selectHistory.all(roomId).reverse();
    socket.emit("history", rows);
  });

  socket.on("chat_message", ({ roomId, content, attachment }) => {
    const user = onlineUsers.get(socket.id);
    if (!user) return;
    const msg = {
      id: Date.now(),
      room_id: roomId,
      username: user.username,
      content,
      type: "user",
      model: null,
      attachment: attachment ? JSON.stringify(attachment) : null,
      created_at: new Date().toISOString(),
    };
    insertMsg.run(roomId, user.username, content, "user", null, msg.attachment);
    io.to(roomId).emit("chat_message", msg);
  });

  socket.on("think", async ({ roomId, mode, attachment }) => {
    const user = onlineUsers.get(socket.id);
    if (!user) return;
    io.to(roomId).emit("thinking", { username: user.username, mode });
    const rows = selectHistory.all(roomId).reverse();
    const result = await askAI(rows, mode, attachment);
    const iaMsg = {
      id: Date.now(),
      room_id: roomId,
      username: "IA",
      content: result.content,
      type: "ai",
      model: result.model,
      attachment: null,
      created_at: new Date().toISOString(),
    };
    insertMsg.run(roomId, "IA", result.content, "ai", result.model, null);
    io.to(roomId).emit("thinking_done");
    io.to(roomId).emit("chat_message", iaMsg);
  });

  socket.on("disconnect", () => {
    const user = onlineUsers.get(socket.id);
    if (user) {
      socket.to(user.roomId).emit("user_left", { username: user.username, time: Date.now() });
      onlineUsers.delete(socket.id);
      io.to(user.roomId).emit("users_online", Array.from(onlineUsers.values()).filter((u) => u.roomId === user.roomId));
      io.emit("users_global", Array.from(onlineUsers.values()).map((u) => ({ username: u.username, roomId: u.roomId, joinedAt: u.joinedAt })));
    }
  });
});

app.get("/api/health", (_req, res) => res.json({ ok: true, users: onlineUsers.size }));

const PORT = process.env.PORT || 3001;
server.listen(PORT, "127.0.0.1", () => {
  console.log(`Servidor ANO Workspace rodando em 127.0.0.1:${PORT}`);
  console.log(`SQLite: ${join(__dirname, "chat.db")}`);
  console.log(`Ollama Cloud: ${OLLAMA_BASE_URL}/api/chat`);
  console.log(`Modelo: ${OLLAMA_MODEL}`);
});
