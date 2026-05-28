import { useState, useRef, useCallback, useEffect } from "react";
import { useSocket } from "../hooks/useSocket.js";
import MessageList from "./MessageList.jsx";
import MessageInput from "./MessageInput.jsx";
import UserList from "./UserList.jsx";
import DocPanel from "./DocPanel.jsx";
import {
  Zap, Brain, Radio, Activity, Users, BookOpen,
  LogOut
} from "lucide-react";

const ROOM_META = {
  geral:     { label: "Sala Geral",      color: "#4a6741" },
  visao:     { label: "Visão",           color: "#7a5a41" },
  mundo:     { label: "O Mundo",         color: "#4a5a7a" },
  faccoes:   { label: "Facções",         color: "#7a4a4a" },
  inimigos:  { label: "Inimigos",        color: "#5a3a5a" },
  jogador:   { label: "O Jogador",       color: "#4a6a5a" },
  servidor:  { label: "Arquitetura",     color: "#5a5a6a" },
  economia:  { label: "Economia",        color: "#7a6a3a" },
  simulacao: { label: "Simulação",       color: "#3a5a6a" },
  tempo:     { label: "Tempo",           color: "#5a4a6a" },
  gameplay:  { label: "Gameplay",        color: "#6a5a4a" },
  esfera:    { label: "Mapa Esférico",   color: "#4a6a7a" },
};

const MIN_PANEL = 200;
const MAX_PANEL = 600;
const DEFAULT_PANEL = 340;

export default function ChatRoom({ username, roomId, onLeave }) {
  const { connected, messages, users, usersGlobal, thinking, thinkMode, sendMessage, think } =
    useSocket(roomId, username);
  const [panel, setPanel] = useState(null);
  const [pendingAttachment, setPendingAttachment] = useState(null);

  // Resizable panel width
  const [panelWidth, setPanelWidth] = useState(() => {
    const saved = typeof localStorage !== "undefined" ? localStorage.getItem("panel_width") : null;
    return saved ? parseInt(saved, 10) : DEFAULT_PANEL;
  });
  const [isDragging, setIsDragging] = useState(false);
  const chatBodyRef = useRef(null);
  const startXRef = useRef(0);
  const startWidthRef = useRef(DEFAULT_PANEL);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("panel_width", String(panelWidth));
    }
  }, [panelWidth]);

  const handleMouseDown = useCallback((e) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    startWidthRef.current = panelWidth;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  }, [panelWidth]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging) return;
    const delta = startXRef.current - e.clientX; // growing left
    const newW = Math.max(MIN_PANEL, Math.min(MAX_PANEL, startWidthRef.current + delta));
    setPanelWidth(newW);
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const meta = ROOM_META[roomId] || { label: roomId, color: "#4a6741" };

  const handleSend = (content, attachment) => {
    setPendingAttachment(attachment);
    sendMessage(content, attachment);
  };

  const handleThink = (mode) => {
    think(mode, pendingAttachment);
  };

  const hasPanel = panel === "docs" || panel === "users";

  return (
    <div className="chat-room">
      <header className="chat-header" style={{ borderBottomColor: meta.color }}>
        <div className="header-left">
          <Radio size={20} className={connected ? "icon-online" : "icon-offline"} />
          <div>
            <h2 style={{ color: meta.color }}>{meta.label}</h2>
            <span className="status-text">
              {connected ? `${users.length} aqui · ${usersGlobal.length} no servidor` : "desconectado"}
            </span>
          </div>
        </div>
        <div className="header-actions">
          <button className="btn-quick" onClick={() => handleThink("quick")} disabled={thinking}>
            <Zap size={16} /> <span className="btn-label">Rápido</span>
          </button>
          <button className="btn-deep" onClick={() => handleThink("deep")} disabled={thinking}>
            <Brain size={16} /> <span className="btn-label">Pensar Fundo</span>
          </button>
          <button className="btn-summary" onClick={() => handleThink("summary")} disabled={thinking}>
            <Activity size={16} /> <span className="btn-label">Resumir</span>
          </button>
          <div className="header-divider" />
          <button className={`btn-panel ${panel === "docs" ? "panel-active" : ""}`} onClick={() => setPanel((p) => p === "docs" ? null : "docs")} title="Documentos">
            <BookOpen size={16} />
          </button>
          <button className={`btn-panel ${panel === "users" ? "panel-active" : ""}`} onClick={() => setPanel((p) => p === "users" ? null : "users")} title="Usuários">
            <Users size={16} />
          </button>
          <button className="btn-leave" onClick={onLeave} title="Sair">
            <LogOut size={16} />
          </button>
        </div>
      </header>

      <div className="chat-body" ref={chatBodyRef}>
        <div className="chat-main">
          {thinking && (
            <div className="thinking-bar">
              <Activity size={14} className="spin" />
              <span>IA processando em modo {thinkMode === "quick" ? "rápido" : thinkMode === "summary" ? "resumo" : "profundo"}...</span>
            </div>
          )}
          <MessageList messages={messages} username={username} />
          <MessageInput onSend={handleSend} disabled={!connected} />
        </div>

        {hasPanel && (
          <>
            <div
              className={`panel-resizer ${isDragging ? "resizer-active" : ""}`}
              onMouseDown={handleMouseDown}
              title="Arraste para redimensionar"
            >
              <div className="resizer-grip" />
            </div>
            <div className="panel-wrapper" style={{ width: panelWidth }}>
              <DocPanel open={panel === "docs"} onClose={() => setPanel(null)} roomId={roomId} />
              {panel === "users" && (
                <aside className="chat-panel">
                  <UserList users={usersGlobal} currentRoom={roomId} />
                </aside>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
