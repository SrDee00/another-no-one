import { useState, useRef } from "react";
import { Send, Paperclip, X, FileText, Image } from "lucide-react";

export default function MessageInput({ onSend, disabled, onThink }) {
  const [text, setText] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    setUploading(true);
    const form = new FormData();
    form.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: form });
      const data = await res.json();
      if (data.ok) setAttachment(data.attachment);
    } catch (e) {
      console.error(e);
    } finally {
      setUploading(false);
    }
  };

  const handleSend = () => {
    if (!text.trim() && !attachment) return;
    onSend(text.trim() || "", attachment || null);
    setText("");
    setAttachment(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const isImage = attachment?.mime?.startsWith("image/");

  return (
    <div className="message-input">
      {attachment && (
        <div className="attachment-preview">
          {isImage ? (
            <img src={attachment.base64 || "#"} alt={attachment.name} className="att-thumb" />
          ) : (
            <div className="att-doc">
              <FileText size={16} />
              <span>{attachment.name}</span>
            </div>
          )}
          <button className="att-remove" onClick={() => { setAttachment(null); if (fileRef.current) fileRef.current.value = ""; }}>
            <X size={14} />
          </button>
        </div>
      )}
      <div className="input-row">
        <input
          ref={fileRef}
          type="file"
          className="file-input"
          onChange={(e) => handleFile(e.target.files?.[0])}
          accept="image/*,.txt,.md,.json,.csv,.pdf,.docx,.log"
        />
        <button
          className="btn-attach"
          onClick={() => fileRef.current?.click()}
          disabled={disabled || uploading}
          title="Anexar imagem ou documento"
        >
          {uploading ? <span className="spin">...</span> : isImage ? <Image size={18} /> : <Paperclip size={18} />}
        </button>
        <input
          type="text"
          placeholder={disabled ? "Desconectado..." : attachment ? "Adicione texto opcional..." : "Digite sua mensagem..."}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={disabled}
        />
        <button onClick={handleSend} disabled={disabled || (!text.trim() && !attachment)}>
          <Send size={18} />
        </button>
      </div>
    </div>
  );
}
