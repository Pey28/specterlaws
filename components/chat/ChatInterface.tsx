"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import ToolBar from "./ToolBar";
import BuscarLeyesModal from "./BuscarLeyesModal";
import SubirArchivosModal from "./SubirArchivosModal";
import ExpedientePanel from "./ExpedientePanel";
import AbogadoModal from "./AbogadoModal";
import MarkdownRenderer from "./MarkdownRenderer";
import ArtifactPanel from "./ArtifactPanel";
import ThinkingIndicator from "./ThinkingIndicator";
import type { Archivo, Mensaje, Conversacion } from "./types";

const LIMITE_GRATIS = 3;
const KEY_CONSULTAS = "crlexai-consultas-libres";

type ModalActivo = "buscar" | "subir" | "expediente" | "limite" | "abogado" | "plan_limit" | null;

type Artifact = { titulo: string; contenido: string };

// ─── Detect artifact (legal document in response) ─────────────────────────────
const DOC_PATTERNS = [
  /\b(CARTA DE RENUNCIA|CONTRATO DE|DENUNCIA (ANTE|POR)|QUEJA (ANTE|FORMAL)|SOLICITUD DE|PODER (ESPECIAL|GENERAL))\b/i,
  /\bESTIMADO[S]?\s+(SEÑOR|SEÑORA|SR\.|SRA\.)/i,
  /\bYO,\s+[A-ZÁÉÍÓÚÑ\s]+,\s+(mayor de edad|portador|vecino)/i,
  /\b(Fecha:|Lugar y Fecha:|San José,|Ciudad:|A quien corresponda)/i,
];

function detectarArtefacto(contenido: string): Artifact | null {
  if (contenido.length < 300) return null;
  const match = DOC_PATTERNS.some((r) => r.test(contenido));
  if (!match) return null;
  // Extract title from first meaningful line
  const lines = contenido.split("\n").map((l) => l.trim()).filter(Boolean);
  const titulo = lines.find((l) => l.length > 5 && l.length < 80 && l === l.toUpperCase())
    ?? lines[0]?.slice(0, 60)
    ?? "Documento Legal";
  return { titulo, contenido };
}

// ─── Group history by date ────────────────────────────────────────────────────
function agruparPorFecha(convs: Conversacion[]) {
  const hoy = new Date(); hoy.setHours(0, 0, 0, 0);
  const ayer = new Date(hoy); ayer.setDate(hoy.getDate() - 1);
  const semana = new Date(hoy); semana.setDate(hoy.getDate() - 7);
  const grupos = [
    { label: "Hoy", items: [] as Conversacion[] },
    { label: "Ayer", items: [] as Conversacion[] },
    { label: "Últimos 7 días", items: [] as Conversacion[] },
    { label: "Anteriores", items: [] as Conversacion[] },
  ];
  for (const c of convs) {
    const d = new Date(c.fechaCreacion); d.setHours(0, 0, 0, 0);
    if (d >= hoy) grupos[0].items.push(c);
    else if (d >= ayer) grupos[1].items.push(c);
    else if (d >= semana) grupos[2].items.push(c);
    else grupos[3].items.push(c);
  }
  return grupos.filter((g) => g.items.length > 0);
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({
  historial, convActualId, onNuevo, onCargar, onCerrar, open, session,
}: {
  historial: Conversacion[];
  convActualId: string;
  onNuevo: () => void;
  onCargar: (c: Conversacion) => void;
  onCerrar: () => void;
  open: boolean;
  session: ReturnType<typeof useSession>["data"];
}) {
  const grupos = useMemo(() => agruparPorFecha(historial), [historial]);

  return (
    <>
      {open && (
        <button type="button" className="md:hidden fixed inset-0 z-30 bg-black/70"
          aria-label="Cerrar" onClick={onCerrar} />
      )}
      <aside className={`
        fixed md:relative inset-y-0 left-0 z-40 md:z-auto
        flex flex-col w-60 shrink-0
        bg-[#111111] border-r border-[#252525]
        transition-transform duration-300 md:translate-x-0
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Logo + close */}
        <div className="flex items-center justify-between px-3 pt-3 pb-2 shrink-0">
          <Link href="/" className="hover:opacity-75 transition-opacity">
            <img src="/logo-unificado.jpg" alt="Specterlaws" className="h-7 w-auto object-contain" />
          </Link>
          <button onClick={onCerrar}
            className="md:hidden p-1.5 rounded-lg text-white/30 hover:text-white hover:bg-white/8 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* New chat */}
        <div className="px-2 pb-2 shrink-0">
          <button onClick={onNuevo}
            className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/8 transition-colors border border-[#2a2a2a] hover:border-[#383838]">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Nueva consulta
          </button>
        </div>

        {/* History */}
        <div className="flex-1 overflow-y-auto px-2 py-1">
          {grupos.length === 0 ? (
            <p className="text-[11px] text-white/20 text-center py-6 px-3">Sin conversaciones guardadas</p>
          ) : grupos.map((g) => (
            <div key={g.label} className="mb-3">
              <p className="text-[10px] font-semibold text-white/20 uppercase tracking-widest px-2 mb-1">{g.label}</p>
              {g.items.map((conv) => (
                <button key={conv.id} onClick={() => { onCargar(conv); onCerrar(); }}
                  className={`w-full text-left px-2 py-1.5 rounded-lg text-[13px] truncate transition-colors ${
                    conv.id === convActualId
                      ? "bg-[#2a2a2a] text-white"
                      : "text-white/45 hover:text-white/80 hover:bg-white/5"
                  }`}>
                  {conv.preview.length > 42 ? conv.preview.slice(0, 39) + "…" : conv.preview}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* User */}
        <div className="border-t border-[#252525] px-3 py-3 shrink-0">
          {session?.user ? (
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-[#2a2a2a] border border-[#383838] flex items-center justify-center text-[11px] font-bold text-white/70 shrink-0">
                {session.user.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[12px] font-medium text-white/70 truncate">{session.user.name?.split(" ")[0]}</p>
                <p className="text-[10px] text-white/30 capitalize">{(session.user as { plan?: string }).plan ?? "gratis"}</p>
              </div>
              <button onClick={() => signOut({ callbackUrl: "/" })} title="Salir"
                className="text-white/25 hover:text-white/60 transition-colors p-1">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/login" className="flex-1 text-center text-[12px] py-1.5 rounded-lg border border-[#2a2a2a] text-white/50 hover:text-white hover:border-[#383838] transition-colors">Iniciar sesión</Link>
              <Link href="/registro" className="flex-1 text-center text-[12px] py-1.5 rounded-lg bg-white text-black font-medium hover:bg-white/90 transition-colors">Registrarse</Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ChatInterface() {
  const { data: session } = useSession();
  const autenticado = !!session?.user;
  const plan = (session?.user as { plan?: string })?.plan ?? "gratis";

  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [inputTexto, setInputTexto] = useState("");
  const [cargando, setCargando] = useState(false);
  const [archivos, setArchivos] = useState<Archivo[]>([]);
  const [historial, setHistorial] = useState<Conversacion[]>([]);
  const [modalActivo, setModalActivo] = useState<ModalActivo>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [consultasLibres, setConsultasLibres] = useState(0);
  const [artifact, setArtifact] = useState<Artifact | null>(null);

  const convIdRef = useRef(Date.now().toString());
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!autenticado) {
      try { setConsultasLibres(parseInt(localStorage.getItem(KEY_CONSULTAS) ?? "0", 10)); }
      catch { /* ignore */ }
    }
  }, [autenticado]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("crlexai-historial");
      if (stored) setHistorial(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  // Auto-scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, cargando]);

  // Save history
  useEffect(() => {
    if (!mensajes.length) return;
    try {
      const conv: Conversacion = {
        id: convIdRef.current, mensajes,
        fechaCreacion: mensajes[0].timestamp,
        preview: mensajes[0].content.slice(0, 100),
      };
      const stored = localStorage.getItem("crlexai-historial");
      const existente: Conversacion[] = stored ? JSON.parse(stored) : [];
      const actualizado = [conv, ...existente.filter((c) => c.id !== convIdRef.current)].slice(0, 30);
      localStorage.setItem("crlexai-historial", JSON.stringify(actualizado));
      setHistorial(actualizado);
    } catch { /* ignore */ }
  }, [mensajes]);

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = "auto";
    ta.style.height = Math.min(ta.scrollHeight, 180) + "px";
  }, [inputTexto]);

  const enviarMensaje = useCallback(async (textoForzado?: string) => {
    const contenido = textoForzado ?? inputTexto.trim();
    if (!contenido || cargando) return;

    if (!autenticado) {
      const count = (() => { try { return parseInt(localStorage.getItem(KEY_CONSULTAS) ?? "0", 10); } catch { return 0; } })();
      if (count >= LIMITE_GRATIS) { setModalActivo("limite"); return; }
    }

    const nuevoMensaje: Mensaje = { id: Date.now().toString(), role: "user", content: contenido, timestamp: new Date().toISOString() };
    setMensajes((prev) => [...prev, nuevoMensaje]);
    setInputTexto("");
    setCargando(true);
    setArtifact(null);

    try {
      const historialAPI = [...mensajes, nuevoMensaje].map((m) => ({ role: m.role, content: m.content }));
      const contextoArchivos = archivos.length > 0
        ? archivos.map((a) => `Archivo: ${a.nombre} (${a.tipo})${a.contenido ? `\n${a.contenido.slice(0, 500)}` : ""}`).join("\n\n")
        : "";

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensajes: historialAPI, contextoArchivos }),
      });

      const data = await res.json();

      if (res.status === 402) {
        setMensajes((prev) => prev.slice(0, -1));
        setInputTexto(contenido);
        setModalActivo(data.code === "sin_creditos" ? "plan_limit" : "plan_limit");
        return;
      }
      if (res.status === 429) throw new Error(data.error ?? "Demasiadas consultas. Esperá un momento.");
      if (data.error) throw new Error(data.error);

      const respuesta = data.respuesta as string;
      setMensajes((prev) => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: respuesta, timestamp: new Date().toISOString() }]);

      // Detect artifact
      const art = detectarArtefacto(respuesta);
      if (art) setArtifact(art);

      if (!autenticado) {
        try {
          const newCount = consultasLibres + 1;
          localStorage.setItem(KEY_CONSULTAS, String(newCount));
          setConsultasLibres(newCount);
        } catch { /* ignore */ }
      }
    } catch (err) {
      setMensajes((prev) => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", content: err instanceof Error ? err.message : "Error al procesar la consulta.", timestamp: new Date().toISOString() }]);
    } finally {
      setCargando(false);
      textareaRef.current?.focus();
    }
  }, [inputTexto, mensajes, archivos, cargando, autenticado, consultasLibres]);

  const nuevaConversacion = useCallback(() => {
    convIdRef.current = Date.now().toString();
    setMensajes([]); setInputTexto(""); setArtifact(null); setSidebarOpen(false);
  }, []);

  const cargarConversacion = useCallback((conv: Conversacion) => {
    convIdRef.current = conv.id;
    setMensajes(conv.mensajes); setArtifact(null); setSidebarOpen(false);
  }, []);

  const consultasRestantes = useMemo(() => LIMITE_GRATIS - consultasLibres, [consultasLibres]);
  const tituloChat = useMemo(() => {
    if (!mensajes.length) return "Nueva consulta";
    const t = mensajes[0].content;
    return t.length > 52 ? t.slice(0, 49) + "…" : t;
  }, [mensajes]);

  const hasArtifact = !!artifact;

  return (
    <div className="flex h-[100dvh] bg-[#1a1a1a] text-white overflow-hidden">

      {/* Sidebar */}
      <Sidebar
        historial={historial} convActualId={convIdRef.current}
        onNuevo={nuevaConversacion} onCargar={cargarConversacion}
        onCerrar={() => setSidebarOpen(false)} open={sidebarOpen} session={session}
      />

      {/* Chat area */}
      <div className={`flex flex-col min-w-0 overflow-hidden transition-all duration-300 ${hasArtifact ? "w-[55%]" : "flex-1"}`}>

        {/* Header */}
        <header className="flex items-center gap-3 px-4 py-2.5 border-b border-[#252525] shrink-0 bg-[#1a1a1a]">
          <button onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-lg text-white/35 hover:text-white hover:bg-white/8 transition-colors md:hidden">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <button onClick={nuevaConversacion} title="Nueva consulta"
            className="hidden md:flex p-1.5 rounded-lg text-white/35 hover:text-white hover:bg-white/8 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <span className="flex-1 text-[13px] text-white/40 truncate">{tituloChat}</span>
          <div className="flex items-center gap-2 shrink-0">
            {!autenticado && consultasRestantes > 0 && (
              <span className="text-[11px] text-white/30">{consultasRestantes} consultas gratis</span>
            )}
            {autenticado && plan !== "gratis" && (
              <span className="text-[11px] text-white/40 border border-white/15 rounded-full px-2 py-0.5 capitalize">{plan}</span>
            )}
            {autenticado ? (
              <Link href="/perfil" className="w-6 h-6 rounded-full bg-[#2a2a2a] border border-[#383838] flex items-center justify-center text-[11px] font-bold hover:bg-[#333] transition-colors">
                {session?.user?.name?.charAt(0).toUpperCase()}
              </Link>
            ) : (
              <Link href="/login" className="text-[12px] text-white/40 hover:text-white transition-colors">Iniciar sesión</Link>
            )}
          </div>
        </header>

        {/* Free limit bar */}
        {!autenticado && consultasLibres > 0 && consultasLibres < LIMITE_GRATIS && (
          <div className="px-4 py-2 border-b border-[#252525] bg-[#1e1a14] flex items-center justify-between shrink-0">
            <span className="text-[12px] text-amber-200/60">
              Te quedan <strong className="text-amber-200/80">{consultasRestantes}</strong> consulta{consultasRestantes !== 1 ? "s" : ""} gratis
            </span>
            <Link href="/registro" className="text-[12px] text-amber-300/70 hover:text-amber-200 underline">Registrate →</Link>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {mensajes.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full pb-32 px-4">
              <div className="w-12 h-12 rounded-xl bg-[#252525] border border-[#333] flex items-center justify-center text-2xl mb-4">⚖️</div>
              <h2 className="text-xl font-semibold text-white mb-1.5">
                {autenticado ? `Hola, ${session?.user?.name?.split(" ")[0]}` : "¿En qué te ayudo?"}
              </h2>
              <p className="text-sm text-white/35 text-center max-w-xs">
                Asistente especializado en leyes de Costa Rica
              </p>
            </div>
          ) : (
            <div className="max-w-[800px] mx-auto px-4 py-6 space-y-6">
              {mensajes.map((msg) =>
                msg.role === "user" ? (
                  // User bubble — right
                  <div key={msg.id} className="flex justify-end">
                    <div className="max-w-[72%] bg-[#2d2d2d] rounded-2xl rounded-br-sm px-4 py-2.5 text-[14px] text-white/90 leading-relaxed whitespace-pre-wrap break-words">
                      {msg.content}
                    </div>
                  </div>
                ) : (
                  // Assistant — left, plain text with markdown
                  <div key={msg.id} className="flex gap-3">
                    <div className="w-7 h-7 rounded-full bg-[#252525] border border-[#333] flex items-center justify-center text-sm shrink-0 mt-0.5">⚖</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] text-white/25 font-medium mb-1.5">Specterlaws</p>
                      <div className="text-[14px] text-white/80 leading-relaxed">
                        <MarkdownRenderer content={msg.content} />
                      </div>
                      {/* Abogado hint */}
                      <button onClick={() => setModalActivo("abogado")}
                        className="mt-3 inline-flex items-center gap-1.5 text-[12px] text-white/25 hover:text-white/55 transition-colors">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Hablar con un abogado
                      </button>
                    </div>
                  </div>
                )
              )}

              {/* Thinking indicator */}
              {cargando && <ThinkingIndicator />}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="shrink-0 px-4 pb-4 pt-2 bg-[#1a1a1a]">
          <div className="max-w-[800px] mx-auto">
            <div className="bg-[#252525] border border-[#333] rounded-2xl overflow-hidden focus-within:border-[#444] transition-colors shadow-lg">
              <textarea
                ref={textareaRef}
                value={inputTexto}
                onChange={(e) => setInputTexto(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); enviarMensaje(); }
                }}
                placeholder="Describe tu situación legal…"
                rows={1}
                className="w-full bg-transparent px-4 pt-3.5 pb-2 text-[14px] text-white/90 placeholder:text-white/25 resize-none focus:outline-none leading-relaxed"
                style={{ maxHeight: "180px" }}
              />
              <div className="flex items-center justify-between px-3 pb-3 pt-1">
                <ToolBar
                  onBuscarLeyes={() => setModalActivo("buscar")}
                  onSubirArchivos={() => setModalActivo("subir")}
                  onExpediente={() => setModalActivo("expediente")}
                  onHistorial={() => setSidebarOpen(true)}
                  onAbogado={() => setModalActivo("abogado")}
                  archivosCount={archivos.length}
                  historialCount={historial.length}
                  panelActivo={null}
                />
                <button
                  onClick={() => enviarMensaje()}
                  disabled={!inputTexto.trim() || cargando}
                  className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center disabled:opacity-20 hover:bg-white/90 active:scale-95 transition-all shrink-0"
                  aria-label="Enviar"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            <p className="text-center text-[11px] text-white/18 mt-2">
              Enter para enviar · Shift+Enter nueva línea
            </p>
          </div>
        </div>
      </div>

      {/* Artifact Panel — desktop 45% right */}
      {hasArtifact && (
        <>
          {/* Mobile: full screen modal */}
          <div className="md:hidden fixed inset-0 z-50 bg-[#1a1a1a] flex flex-col">
            <ArtifactPanel titulo={artifact!.titulo} contenido={artifact!.contenido} onCerrar={() => setArtifact(null)} />
          </div>
          {/* Desktop: right panel */}
          <div className="hidden md:flex flex-col w-[45%] shrink-0 min-h-0 overflow-hidden">
            <ArtifactPanel titulo={artifact!.titulo} contenido={artifact!.contenido} onCerrar={() => setArtifact(null)} />
          </div>
        </>
      )}

      {/* Modals */}
      {modalActivo === "buscar" && (
        <BuscarLeyesModal onCerrar={() => setModalActivo(null)}
          onEnviarAlChat={(t) => { enviarMensaje(t); setModalActivo(null); }} />
      )}
      {modalActivo === "subir" && (
        <SubirArchivosModal onCerrar={() => setModalActivo(null)}
          onArchivoSubido={(a) => setArchivos((p) => [...p, a])} />
      )}
      {modalActivo === "expediente" && (
        <>
          <button type="button" className="fixed inset-0 z-40 bg-black/60" onClick={() => setModalActivo(null)} />
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm">
            <ExpedientePanel archivos={archivos}
              onAgregarAlChat={(a) => { enviarMensaje(`Adjunté el archivo "${a.nombre}" para que lo analices.`); setModalActivo(null); }}
              onCerrar={() => setModalActivo(null)} />
          </div>
        </>
      )}
      {modalActivo === "abogado" && <AbogadoModal onCerrar={() => setModalActivo(null)} />}

      {/* Free limit modal */}
      {modalActivo === "limite" && (
        <div className="fixed inset-0 bg-black/70 flex items-end sm:items-center justify-center z-50 p-4">
          <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl max-w-sm w-full p-7 text-center">
            <div className="text-4xl mb-4">⚖️</div>
            <h2 className="text-lg font-semibold text-white mb-2">Límite gratuito alcanzado</h2>
            <p className="text-sm text-white/45 mb-6">Usaste tus <strong className="text-white">{LIMITE_GRATIS} consultas gratis</strong>. Registrate para continuar.</p>
            <div className="space-y-2.5">
              <Link href="/registro" className="block w-full bg-white text-black font-semibold rounded-xl py-2.5 text-sm hover:bg-white/90 transition-colors">Registrarme gratis</Link>
              <Link href="/precios" className="block w-full border border-[#2a2a2a] text-white/60 rounded-xl py-2.5 text-sm hover:border-[#383838] hover:text-white transition-colors">Ver planes</Link>
              <button onClick={() => setModalActivo(null)} className="text-[12px] text-white/25 hover:text-white/50 pt-1">Cerrar</button>
            </div>
          </div>
        </div>
      )}

      {/* Plan limit modal */}
      {modalActivo === "plan_limit" && (
        <div className="fixed inset-0 bg-black/70 flex items-end sm:items-center justify-center z-50 p-4">
          <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl max-w-sm w-full p-7 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h2 className="text-lg font-semibold text-white mb-2">Límite mensual alcanzado</h2>
            <p className="text-sm text-white/45 mb-6">Alcanzaste las consultas de tu plan este mes.</p>
            <div className="space-y-2.5">
              <Link href="/precios" className="block w-full bg-white text-black font-semibold rounded-xl py-2.5 text-sm hover:bg-white/90 transition-colors">Ver planes</Link>
              <button onClick={() => setModalActivo(null)} className="block w-full border border-[#2a2a2a] text-white/60 rounded-xl py-2.5 text-sm hover:border-[#383838] hover:text-white transition-colors">Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
