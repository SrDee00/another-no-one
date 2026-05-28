import { useState, useEffect } from "react";
import ChatRoom from "./components/ChatRoom.jsx";
import SettingsModal from "./components/SettingsModal.jsx";
import { ROOMS } from "./rooms.js";
import { Radio, ChevronRight, Settings, Lock, User, Eye, EyeOff } from "lucide-react";

function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState("geral");

  async function handleLogin() {
    if (!username.trim() || !password) {
      setError("Preencha usuario e senha");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password }),
      });
      const data = await res.json();
      if (data.ok) {
        localStorage.setItem("ano_token", data.token);
        localStorage.setItem("ano_username", data.username);
        onLogin(data.token, data.username, selected);
      } else {
        setError(data.error || "Login falhou");
      }
    } catch (e) {
      setError("Servidor offline");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-screen">
      <div className="login-card">
        <div className="login-brand">
          <Radio size={36} />
          <h1>Another No One</h1>
          <p>Workspace de Planejamento Colaborativo</p>
        </div>

        {error && <div className="login-error">{error}</div>}

        <div className="login-section">
          <label><User size={12} /> Usuario</label>
          <input
            type="text"
            placeholder="dude, magno, rene..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            maxLength={24}
            autoFocus
          />
        </div>

        <div className="login-section">
          <label><Lock size={12} /> Senha</label>
          <div className="password-wrap">
            <input
              type={showPass ? "text" : "password"}
              placeholder="sua senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <button className="toggle-pass" onClick={() => setShowPass(!showPass)} tabIndex={-1}>
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
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

        <button className="btn-enter" disabled={loading} onClick={handleLogin}>
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [auth, setAuth] = useState(() => {
    const token = typeof localStorage !== "undefined" ? localStorage.getItem("ano_token") : null;
    const username = typeof localStorage !== "undefined" ? localStorage.getItem("ano_username") : null;
    return token && username ? { token, username } : null;
  });
  const [session, setSession] = useState(null);
  const [showSettings, setShowSettings] = useState(false);

  function handleLogin(token, username, roomId) {
    setAuth({ token, username });
    setSession({ username, roomId });
  }

  function handleLeave() {
    setSession(null);
  }

  function handleLogout() {
    localStorage.removeItem("ano_token");
    localStorage.removeItem("ano_username");
    setAuth(null);
    setSession(null);
  }

  function handleCredentialsChanged(newToken, newUsername) {
    localStorage.setItem("ano_token", newToken);
    localStorage.setItem("ano_username", newUsername);
    setAuth({ token: newToken, username: newUsername });
    if (session) {
      setSession({ ...session, username: newUsername });
    }
  }

  if (!auth || !session) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <>
      <ChatRoom
        token={auth.token}
        username={session.username}
        roomId={session.roomId}
        onLeave={handleLeave}
        onOpenSettings={() => setShowSettings(true)}
        onLogout={handleLogout}
      />
      {showSettings && (
        <SettingsModal
          token={auth.token}
          username={session.username}
          onClose={() => setShowSettings(false)}
          onChanged={handleCredentialsChanged}
        />
      )}
    </>
  );
}
