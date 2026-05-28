import { useEffect, useRef, useState, useCallback } from "react";
import { io } from "socket.io-client";

export function useSocket(roomId, username) {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [usersGlobal, setUsersGlobal] = useState([]);
  const [thinking, setThinking] = useState(false);
  const [thinkMode, setThinkMode] = useState(null);

  useEffect(() => {
    const socket = io("http://localhost:3001");
    socketRef.current = socket;

    socket.on("connect", () => {
      setConnected(true);
      socket.emit("join", { username, roomId });
    });

    socket.on("disconnect", () => setConnected(false));

    socket.on("history", (rows) => setMessages(rows));

    socket.on("chat_message", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("users_online", (list) => {
      setUsers(list);
    });

    socket.on("users_global", (list) => {
      setUsersGlobal(list);
    });

    socket.on("thinking", ({ mode }) => {
      setThinking(true);
      setThinkMode(mode);
    });

    socket.on("thinking_done", () => {
      setThinking(false);
      setThinkMode(null);
    });

    socket.on("user_joined", ({ username }) => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), username: "Sistema", content: `${username} entrou na sala.`, type: "system", created_at: new Date().toISOString() },
      ]);
    });

    socket.on("user_left", ({ username }) => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), username: "Sistema", content: `${username} saiu da sala.`, type: "system", created_at: new Date().toISOString() },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId, username]);

  const sendMessage = useCallback((content, attachment = null) => {
    if (socketRef.current) {
      socketRef.current.emit("chat_message", { roomId, content, attachment });
    }
  }, [roomId]);

  const think = useCallback((mode, attachment = null) => {
    if (socketRef.current) {
      socketRef.current.emit("think", { roomId, mode, attachment });
    }
  }, [roomId]);

  return { connected, messages, users, usersGlobal, thinking, thinkMode, sendMessage, think };
}
