import {
  MessageSquare, Eye, Globe, Shield, Bug, User, Server, Coins,
  Layers, Clock, Gamepad2, CircleDot,
} from "lucide-react";

export const ROOMS = [
  { id: "geral",     label: "Sala Geral",           desc: "Discussões livres",                  icon: MessageSquare, color: "#4a6741" },
  { id: "visao",     label: "Visão",                desc: "Pilares, premissa, tom",             icon: Eye,          color: "#7a5a41" },
  { id: "mundo",     label: "O Mundo",              desc: "V1C5A302-H, biomas, clima",          icon: Globe,        color: "#4a5a7a" },
  { id: "faccoes",   label: "Facções",              desc: "AES, hierarquia, diplomacia",        icon: Shield,       color: "#7a4a4a" },
  { id: "inimigos",  label: "Inimigos",             desc: "Mycelion, castas, hive",             icon: Bug,          color: "#5a3a5a" },
  { id: "jogador",   label: "O Jogador",            desc: "Reprint, Chassis, atributos",        icon: User,         color: "#4a6a5a" },
  { id: "servidor",  label: "Arquitetura",          desc: "Ticks, servidores, protocolos",       icon: Server,       color: "#5a5a6a" },
  { id: "economia",  label: "Economia",             desc: "Simulação viva, comércio",           icon: Coins,        color: "#7a6a3a" },
  { id: "simulacao", label: "Simulação",            desc: "Camadas, persistência, chunks",      icon: Layers,       color: "#3a5a6a" },
  { id: "tempo",     label: "Tempo",                desc: "Limites diários, automação",         icon: Clock,        color: "#5a4a6a" },
  { id: "gameplay",  label: "Gameplay",             desc: "Ferimentos, prática, fome",          icon: Gamepad2,     color: "#6a5a4a" },
  { id: "esfera",    label: "Mapa Esférico",        desc: "Esfera real, geodésicas",            icon: CircleDot,    color: "#4a6a7a" },
];
