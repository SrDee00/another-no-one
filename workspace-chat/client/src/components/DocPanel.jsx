import { useState, useEffect } from "react";
import { BookOpen, ChevronRight, X } from "lucide-react";

const DOCS = [
  { id: "01", file: "01-vision.md",            label: "Visão Central",           desc: "Pilares de design, premissa filosófica" },
  { id: "02", file: "02-world.md",             label: "O Mundo",                 desc: "V1C5A302-H, colônia FNA-01, timeline" },
  { id: "03", file: "03-factions.md",          label: "Facções",                 desc: "AES, hierarquia, outras facções" },
  { id: "04", file: "04-enemies.md",           label: "Inimigos",                desc: "Mycelion, castas, biologia" },
  { id: "05", file: "05-player.md",            label: "O Jogador",               desc: "Reprint vs Chassis, backup neural" },
  { id: "06", file: "06-render.md",            label: "Renderização",            desc: "2D top-down, camada gráfica indiferente" },
  { id: "07", file: "07-server-architecture.md", label: "Arquitetura de Servidor", desc: "3 servidores, ticks, protocolos" },
  { id: "08", file: "08-economy.md",           label: "Economia",                desc: "Simulação viva, escravidão, rotinas" },
  { id: "09", file: "09-simulation-layers.md", label: "Camadas de Simulação",    desc: "5 níveis, promoção/demosião" },
  { id: "10", file: "10-lazy-simulation.md",   label: "Persistência Preguiçosa", desc: "Simulação sob demanda, seeds" },
  { id: "11", file: "11-time-system.md",       label: "Sistema de Tempo",        desc: "Limite 8h, automação offline" },
  { id: "12", file: "12-themes.md",            label: "Temas & Experiência",     desc: "Perguntas filosóficas, arco emocional" },
  { id: "13", file: "13-references.md",        label: "Referências",             desc: "Inspirações e contexto de design" },
  { id: "14", file: "14-gameplay-systems.md",  label: "Sistemas de Gameplay",    desc: "Ferimentos, prática, fome, desmembramento" },
  { id: "15", file: "15-spherical-world.md",   label: "Mapa Planetário Esférico", desc: "Esfera real, geodésicas, chunks" },
];

function mdToHtml(md) {
  let html = md;

  // Escape HTML entities
  html = html.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  // Headers
  html = html.replace(/^###### (.*)$/gm, "<h6>$1</h6>");
  html = html.replace(/^##### (.*)$/gm, "<h5>$1</h5>");
  html = html.replace(/^#### (.*)$/gm, "<h4>$1</h4>");
  html = html.replace(/^### (.*)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.*)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.*)$/gm, "<h1>$1</h1>");

  // Bold & italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, "<em><strong>$1</strong></em>");
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");
  html = html.replace(/__(.+?)__/g, "<strong>$1</strong>");
  html = html.replace(/_(.+?)_/g, "<em>$1</em>");

  // Blockquotes
  html = html.replace(/^\> (.*)$/gm, "<blockquote>$1</blockquote>");

  // Code blocks
  html = html.replace(/```([\s\S]*?)```/g, "<pre><code>$1</code></pre>");
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');

  // Horizontal rules
  html = html.replace(/^---$/gm, "<hr />");

  // Unordered lists
  const lines = html.split("\n");
  let inList = false;
  let result = [];
  for (const line of lines) {
    const match = line.match(/^\s*[-*] (.*)$/);
    if (match) {
      if (!inList) {
        result.push("<ul>");
        inList = true;
      }
      result.push(`<li>${match[1]}</li>`);
    } else {
      if (inList) {
        result.push("</ul>");
        inList = false;
      }
      result.push(line);
    }
  }
  if (inList) result.push("</ul>");
  html = result.join("\n");

  // Tables (simple pipe-delimited)
  const tableRows = [];
  let inTable = false;
  const tblLines = html.split("\n");
  const tblResult = [];
  for (const line of tblLines) {
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      if (!inTable) { inTable = true; }
      const cells = line.split("|").slice(1, -1).map((c) => c.trim());
      if (cells.every((c) => c.replace(/[-: ]/g, "") === "")) {
        continue; // separator row
      }
      const tag = inTable && tableRows.length === 0 ? "th" : "td";
      const row = `<tr>${cells.map((c) => `<${tag}>${c}</${tag}>`).join("")}</tr>`;
      tableRows.push(row);
    } else {
      if (inTable && tableRows.length > 0) {
        tblResult.push(`<table><thead>${tableRows[0]}</thead><tbody>${tableRows.slice(1).join("")}</tbody></table>`);
        tableRows.length = 0;
        inTable = false;
      }
      tblResult.push(line);
    }
  }
  if (inTable && tableRows.length > 0) {
    tblResult.push(`<table><thead>${tableRows[0]}</thead><tbody>${tableRows.slice(1).join("")}</tbody></table>`);
  }
  html = tblResult.join("\n");

  // Paragraphs: wrap non-tag lines
  const final = [];
  for (const line of html.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.match(/^\s*\u003c(\/|h\d|ul|li|blockquote|pre|code|hr|table|tr|th|td)/)) {
      final.push(line);
    } else {
      final.push(`<p>${trimmed}</p>`);
    }
  }
  html = final.join("\n");

  return html;
}

export default function DocPanel({ open, onClose, roomId }) {
  const [activeDoc, setActiveDoc] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setActiveDoc(null);
    setContent("");
  }, [roomId]);

  async function loadDoc(doc) {
    setActiveDoc(doc);
    setLoading(true);
    try {
      const res = await fetch(`/docs/${doc.file}`);
      if (!res.ok) throw new Error("não encontrado");
      const text = await res.text();
      setContent(mdToHtml(text));
    } catch {
      setContent(`<h2>${doc.label}</h2><p>Documento não disponível no servidor de desenvolvimento. Em produção, os arquivos .md seriam servidos como assets estáticos.</p>`);
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  return (
    <aside className="doc-panel">
      <div className="doc-panel-header">
        <BookOpen size={16} />
        <span>Documentos de Design</span>
        <button className="doc-close" onClick={onClose}>
          <X size={14} />
        </button>
      </div>

      <div className="doc-panel-body">
        {!activeDoc ? (
          <ul className="doc-list">
            {DOCS.map((doc) => (
              <li key={doc.id}>
                <button className="doc-item" onClick={() => loadDoc(doc)}>
                  <span className="doc-num">{doc.id}</span>
                  <div className="doc-info">
                    <span className="doc-title">{doc.label}</span>
                    <span className="doc-desc">{doc.desc}</span>
                  </div>
                  <ChevronRight size={14} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="doc-reader">
            <button className="doc-back" onClick={() => { setActiveDoc(null); setContent(""); }}>
              <ChevronRight size={14} style={{ transform: "rotate(180deg)" }} />
              <span>Voltar à lista</span>
            </button>
            <h3>{activeDoc.label}</h3>
            {loading ? (
              <div className="doc-loading">Carregando...</div>
            ) : (
              <div className="doc-content" dangerouslySetInnerHTML={{ __html: content }} />
            )}
          </div>
        )}
      </div>
    </aside>
  );
}
