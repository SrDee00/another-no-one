import { useState } from "react";
import ChatRoom from "./components/ChatRoom.jsx";
import { ROOMS } from "./rooms.js";
import { Radio, ChevronRight } from "lucide-react";

function LoginScreen({ onJoin }) {
  const [name, setName] = useState("");
  const [selected, setSelected] = useState("geral");

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-brand">
          <Radio size={36} />
          <h1>Another No One</h1>
          <p>Workspace de Planejamento Colaborativo</p>
        </div>

        <div className="login-section">
          <label>Seu Callsign</label>
          <input
            type="text"
            placeholder="Ex: Operador-7, Desenvolvedor..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && name.trim() && onJoin(name.trim(), selected)}
            maxLength={24}
            autoFocus
          />
        </div>

        <div className="login-section">
          <label>Escolha uma Sala</label>
          <div className="room-grid">
            {ROOMS.map((room) => {
              const Icon = room.icon;
              const active = selected === room.id;
              return (
                <button
                  key={room.id}
                  className={`room-tile ${active ? "room-active" : ""}`}
                  onClick={() => setSelected(room.id)}
                  style={{ "--room-color": room.color }}
                >
                  <Icon size={20} className="room-icon" />
                  <div className="room-info">
                    <span className="room-label">{room.label}</span>
                    <span className="room-desc">{room.desc}</span>
                  </div>
                  {active && <ChevronRight size={14} className="room-arrow" />}
                </button>
              );
            })}
          </div>
        </div>

        <button
          className="btn-enter"
          disabled={!name.trim()}
          onClick={() => onJoin(name.trim(), selected)}
        >
          Entrar na Sala
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [session, setSession] = useState(null);

  if (!session) {
    return <LoginScreen onJoin={(username, roomId) => setSession({ username, roomId })} />;
  }

  return <ChatRoom username={session.username} roomId={session.roomId} onLeave={() => setSession(null)} />;
}
