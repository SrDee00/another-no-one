import { User, Clock, MessageSquare } from "lucide-react";

const ROOM_LABELS = {
  geral: "Geral", visao: "Visão", mundo: "Mundo", faccoes: "Facções",
  inimigos: "Inimigos", jogador: "Jogador", servidor: "Arquitetura",
  economia: "Economia", simulacao: "Simulação", tempo: "Tempo",
  gameplay: "Gameplay", esfera: "Esfera",
};

const ROOM_COLORS = {
  geral: "#4a6741", visao: "#7a5a41", mundo: "#4a5a7a", faccoes: "#7a4a4a",
  inimigos: "#5a3a5a", jogador: "#4a6a5a", servidor: "#5a5a6a", economia: "#7a6a3a",
  simulacao: "#3a5a6a", tempo: "#5a4a6a", gameplay: "#6a5a4a", esfera: "#4a6a7a",
};

export default function UserList({ users, currentRoom }) {
  const here = users.filter((u) => u.roomId === currentRoom);
  const elsewhere = users.filter((u) => u.roomId !== currentRoom);

  return (
    <div className="user-list">
      <div className="user-section">
        <h3>
          <MessageSquare size={12} />
          Nesta Sala ({here.length})
        </h3>
        <ul>
          {here.map((u, i) => (
            <li key={i} className="user-here">
              <User size={14} />
              <span>{u.username}</span>
              <span className="user-time">
                <Clock size={10} /> {new Date(u.joinedAt).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {elsewhere.length > 0 && (
        <div className="user-section">
          <h3>
            <MessageSquare size={12} />
            Outras Salas ({elsewhere.length})
          </h3>
          <ul>
            {elsewhere.map((u, i) => (
              <li key={i} className="user-away">
                <User size={14} />
                <div className="user-away-info">
                  <span>{u.username}</span>
                  <span className="user-room-badge" style={{ color: ROOM_COLORS[u.roomId] || "#5a5a6a" }}>
                    {ROOM_LABELS[u.roomId] || u.roomId}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
