import { useEffect, useRef } from "react";
import { Zap, Brain, Activity, User, Bot, Image, FileText } from "lucide-react";

function formatTime(iso) {
  const d = new Date(iso);
  return d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function AttachmentPreview({ attRaw }) {
  if (!attRaw) return null;
  let att;
  try { att = JSON.parse(attRaw); } catch (_e) { return null; }
  const isImg = att.mime?.startsWith("image/");
  return (
    <div className="msg-attachment">
      {isImg && att.base64 ? (
        <img src={att.base64} alt={att.name} className="att-img" />
      ) : (
        <div className="att-file">
          <FileText size={14} />
          <span>{att.name}</span>
          <span className="att-size">{att.textContent ? "(texto extraído)" : `${(att.size / 1024).toFixed(1)} KB`}</span>
        </div>
      )}
    </div>
  );
}

function MessageBubble({ msg, isMe }) {
  const isSystem = msg.type === "system";
  const isAI = msg.type === "ai";

  if (isSystem) {
    return (
      <div className="msg-system">
        <span>{msg.content}</span>
        <time>{formatTime(msg.created_at)}</time>
      </div>
    );
  }

  return (
    <div className={`msg-row ${isMe ? "msg-me" : ""} ${isAI ? "msg-ai" : ""}`}>
      <div className="msg-avatar">
        {isAI ? <Bot size={16} /> : <User size={16} />}
      </div>
      <div className="msg-content">
        <div className="msg-meta">
          <span className="msg-author">{msg.username}</span>
          {isAI && (
            <span className="msg-badge">
              {msg.model?.includes("kimi") && <Zap size={12} />}
              {msg.model === "error" && <Activity size={12} />}
            </span>
          )}
          <time>{formatTime(msg.created_at)}</time>
        </div>
        {msg.content && <div className="msg-text">{msg.content}</div>}
        <AttachmentPreview attRaw={msg.attachment} />
      </div>
    </div>
  );
}

export default function MessageList({ messages, username }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="message-list">
      {messages.length === 0 && (
        <div className="empty-state">
          <p>Nenhuma mensagem ainda.</p>
          <p>Seja o primeiro a planejar.</p>
        </div>
      )}
      {messages.map((msg) => (
        <MessageBubble key={msg.id} msg={msg} isMe={msg.username === username} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
