import { useState } from "react";
import { X, User, Lock, Eye, EyeOff, Save, AlertCircle, CheckCircle } from "lucide-react";

export default function SettingsModal({ token, username, onClose, onChanged }) {
  const [newUsername, setNewUsername] = useState(username);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSave(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!newUsername.trim()) {
      setError("O nome de usuario nao pode ficar vazio.");
      return;
    }
    if (newPassword && newPassword !== confirmPassword) {
      setError("As senhas nao coincidem.");
      return;
    }

    const payload = {};
    if (newUsername.trim() !== username) payload.newUsername = newUsername.trim();
    if (newPassword) payload.newPassword = newPassword;

    if (Object.keys(payload).length === 0) {
      setError("Nenhuma alteracao foi feita.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:3001/api/users/me", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.ok) {
        setSuccess("Dados atualizados com sucesso.");
        onChanged(data.token, data.username);
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setError(data.error || "Erro ao atualizar.");
      }
    } catch (e) {
      setError("Falha na comunicacao com o servidor.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2><User size={18} /> Configuracoes da Conta</h2>
          <button className="modal-close" onClick={onClose}><X size={18} /></button>
        </div>

        {error && (
          <div className="modal-alert modal-alert-error">
            <AlertCircle size={14} /> {error}
          </div>
        )}
        {success && (
          <div className="modal-alert modal-alert-success">
            <CheckCircle size={14} /> {success}
          </div>
        )}

        <form onSubmit={handleSave} className="modal-form">
          <div className="login-section">
            <label><User size={12} /> Nome de usuario</label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              maxLength={24}
              autoFocus
            />
          </div>

          <div className="login-section">
            <label><Lock size={12} /> Nova senha</label>
            <div className="password-wrap">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Deixe em branco para nao alterar"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button type="button" className="toggle-pass" onClick={() => setShowPass(!showPass)} tabIndex={-1}>
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="login-section">
            <label><Lock size={12} /> Confirmar nova senha</label>
            <div className="password-wrap">
              <input
                type={showConfirm ? "text" : "password"}
                placeholder="Repita a nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button type="button" className="toggle-pass" onClick={() => setShowConfirm(!showConfirm)} tabIndex={-1}>
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-leave" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-enter" disabled={loading}>
              <Save size={16} /> {loading ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
