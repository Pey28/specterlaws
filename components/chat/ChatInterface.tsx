"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import ToolBar from "./ToolBar";
import BuscarLeyesModal from "./BuscarLeyesModal";
import SubirArchivosModal from "./SubirArchivosModal";
import ExpedientePanel from "./ExpedientePanel";
import AbogadoModal from "./AbogadoModal";
import type { Archivo, Mensaje, Conversacion } from "./types";

const LIMITE_GRATIS = 3;
const KEY_CONSULTAS = "crlexai-consultas-libres";

type ModalActivo = "buscar" | "subir" | "expediente" | "limite" | "abogado" | "plan_limit" | null;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function agruparPorFecha(convs: Conversacion[]) {
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  const ayer = new Date(hoy); ayer.setDate(hoy.getDate() - 1);
  const semana = new Date(hoy); semana.setDate(hoy.getDate() - 7);

  const grupos: { label: string; items: Conversacion[] }[] = [
    { label: "Hoy", items: [] },
    { label: "Ayer", items: [] },
    { label: "Últimos 7 días", items: [] },
    { label: "Anteriores", items: [] },
  ];

  for (const c of convs) {
    const d = new Date(c.fechaCreacion);
    d.setHours(0, 0, 0, 0);
    if (d >= hoy) grupos[0].items.push(c);
    else if (d >= ayer) grupos[1].items.push(c);
    else if (d >= semana) grupos[2].items.push(c);
    else grupos[3].items.push(c);
  }

  return grupos.filter((g) => g.items.length > 0);
}

function titleFromConv(conv: Conversacion) {
  return conv.preview.length > 45 ? conv.preview.slice(0, 42) + "…" : conv.preview;
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────

function Sidebar({
  historial,
  convActualId,
  onNuevo,
  onCargar,
  onCerrar,
  open,
}: {
  historial: Conversacion[];
  convActualId: string;
  onNuevo: () => void;
  onCargar: (c: Conversacion) => void;
  onCerrar: () => void;
  open: boolean;
}) {
  const { data: session } = useSession();
  const grupos = useMemo(() => agruparPorFecha(historial), [historial]);

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <button
          type="button"
          className="md:hidden fixed inset-0 z-30 bg-black/60"
          aria-label="Cerrar sidebar"
          onClick={onCerrar}
        />
      )}

      <aside
        className={`
          fixed md:relative inset-y-0 left-0 z-40 md:z-auto
          flex flex-col bg-[#0f0f0f] border-r border-white/[0.08]
          transition-transform duration-300 md:translate-x-0
          w-64 shrink-0
          ${open ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {/* Top */}
        <div className="flex items-center justify-between px-3 py-3 shrink-0">
          <Link href="/" className="flex items-center gap-2 px-1 hover:opacity-80 transition-opacity">
            <img src="/logo-unificado.jpg" alt="Specterlaws" className="h-7 w-auto object-contain" />
          </Link>
          <button
            onClick={onCerrar}
            className="md:hidden p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/8 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* New chat */}
        <div className="px-3 pb-2 shrink-0">
          <button
            onClick={onNuevo}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-white/70 hover:text-white hover:bg-white/8 transition-colors border border-white/10 hover:border-white/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
            </svg>
            Nueva consulta
          </button>
        </div>

        {/* History */}
        <div className="flex-1 overflow-y-auto px-2 py-1 space-y-4">
          {grupos.length === 0 ? (
            <p className="text-xs text-white/25 px-3 py-4 text-center">Sin conversaciones</p>
          ) : (
            grupos.map((grupo) => (
              <div key={grupo.label}>
                <p className="text-[11px] font-semibold text-white/25 uppercase tracking-wider px-3 mb-1">
                  {grupo.label}
                </p>
                <div className="space-y-0.5">
                  {grupo.items.map((conv) => (
                    <button
                      key={conv.id}
                      onClick={() => { onCargar(conv); onCerrar(); }}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors truncate ${
                        conv.id === convActualId
                          ? "bg-white/10 text-white"
                          : "text-white/55 hover:text-white hover:bg-white/6"
                      }`}
                    >
                      {titleFromConv(conv)}
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* User */}
        <div className="border-t border-white/[0.08] px-3 py-3 shrink-0">
          {session?.user ? (
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-xs font-bold text-white shrink-0">
                {session.user.name?.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-white truncate">{session.user.name?.split(" ")[0]}</p>
                <p className="text-[11px] text-white/35 capitalize truncate">{session.user.plan ?? "gratis"}</p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-white/30 hover:text-white/70 transition-colors p-1"
                title="Salir"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link href="/login" className="flex-1 text-center text-xs py-2 rounded-lg border border-white/15 text-white/60 hover:text-white hover:border-white/30 transition-colors">
                Iniciar sesión
              </Link>
              <Link href="/registro" className="flex-1 text-center text-xs py-2 rounded-lg bg-white text-black font-semibold hover:bg-white/90 transition-colors">
                Registrarse
              </Link>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

// ─── Message bubble ───────────────────────────────────────────────────────────

function MessageBubble({ msg, onAbogado }: { msg: Mensaje; onAbogado: () => void }) {
  const isUser = msg.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[75%] sm:max-w-[65%] bg-[#2a2a2a] rounded-2xl rounded-br-sm px-4 py-3 text-sm text-white/90 leading-relaxed whitespace-pre-wrap break-words">
          {msg.content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-3">
      {/* Avatar */}
      <div className="w-8 h-8 rounded-full bg-[#1a1a2e] border border-white/10 flex items-center justify-center text-base flex-shrink-0 mt-1" aria-hidden="true">
        ⚖
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-white/30 font-medium mb-2">Specterlaws</p>
        <div className="text-sm text-white/85 leading-relaxed whitespace-pre-wrap break-words">
          {msg.content}
        </div>
        <button
          onClick={onAbogado}
          className="mt-3 inline-flex items-center gap-1.5 text-xs text-white/35 hover:text-white/70 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
          Hablar con un abogado
        </button>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function ChatInterface() {
  const { data: session } = useSession();
  const autenticado = !!session?.user;
  const plan = session?.user?.plan ?? "gratis";

  const [mensajes, setMensajes] = useState<Mensaje[]>([]);
  const [inputTexto, setInputTexto] = useState("");
  const [cargando, setCargando] = useState(false);
  const [archivos, setArchivos] = useState<Archivo[]>([]);
  const [historial, setHistorial] = useState<Conversacion[]>([]);
  const [modalActivo, setModalActivo] = useState<ModalActivo>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [consultasLibres, setConsultasLibres] = useState(0);

  const convIdRef = useRef(Date.now().toString());
  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!autenticado) {
      try {
        const stored = localStorage.getItem(KEY_CONSULTAS);
        setConsultasLibres(stored ? parseInt(stored, 10) : 0);
      } catch { /* ignore */ }
    }
  }, [autenticado]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("crlexai-historial");
      if (stored) setHistorial(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [mensajes, cargando]);

  useEffect(() => {
    if (mensajes.length === 0) return;
    try {
      const conv: Conversacion = {
        id: convIdRef.current,
        mensajes,
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
    ta.style.height = Math.min(ta.scrollHeight, 200) + "px";
  }, [inputTexto]);

  const enviarMensaje = useCallback(
    async (textoForzado?: string) => {
      const contenido = textoForzado ?? inputTexto.trim();
      if (!contenido || cargando) return;

      if (!autenticado) {
        const count = (() => {
          try { return parseInt(localStorage.getItem(KEY_CONSULTAS) ?? "0", 10); }
          catch { return 0; }
        })();
        if (count >= LIMITE_GRATIS) { setModalActivo("limite"); return; }
      }

      const nuevoMensaje: Mensaje = {
        id: Date.now().toString(),
        role: "user",
        content: contenido,
        timestamp: new Date().toISOString(),
      };

      setMensajes((prev) => [...prev, nuevoMensaje]);
      setInputTexto("");
      setCargando(true);

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
          setModalActivo("plan_limit");
          return;
        }

        if (res.status === 429) throw new Error(data.error ?? "Demasiadas consultas. Esperá un momento.");
        if (data.error) throw new Error(data.error);

        setMensajes((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: data.respuesta,
            timestamp: new Date().toISOString(),
          },
        ]);

        if (!autenticado) {
          try {
            const newCount = consultasLibres + 1;
            localStorage.setItem(KEY_CONSULTAS, String(newCount));
            setConsultasLibres(newCount);
          } catch { /* ignore */ }
        }
      } catch (err) {
        setMensajes((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: err instanceof Error ? err.message : "Hubo un error al procesar tu consulta.",
            timestamp: new Date().toISOString(),
          },
        ]);
      } finally {
        setCargando(false);
        textareaRef.current?.focus();
      }
    },
    [inputTexto, mensajes, archivos, cargando, autenticado, consultasLibres]
  );

  const nuevaConversacion = useCallback(() => {
    convIdRef.current = Date.now().toString();
    setMensajes([]);
    setInputTexto("");
    setSidebarOpen(false);
  }, []);

  const cargarConversacion = useCallback((conv: Conversacion) => {
    convIdRef.current = conv.id;
    setMensajes(conv.mensajes);
    setSidebarOpen(false);
  }, []);

  const consultasRestantes = useMemo(() => LIMITE_GRATIS - consultasLibres, [consultasLibres]);

  const tituloActual = useMemo(() => {
    if (mensajes.length === 0) return null;
    const preview = mensajes[0].content;
    return preview.length > 50 ? preview.slice(0, 47) + "…" : preview;
  }, [mensajes]);

  return (
    <div className="flex h-[100dvh] bg-[#141414] text-white overflow-hidden">

      {/* Sidebar */}
      <Sidebar
        historial={historial}
        convActualId={convIdRef.current}
        onNuevo={nuevaConversacion}
        onCargar={cargarConversacion}
        onCerrar={() => setSidebarOpen(false)}
        open={sidebarOpen}
      />

      {/* Main */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">

        {/* Header */}
        <header className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] shrink-0">
          {/* Hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/8 transition-colors md:hidden"
            aria-label="Abrir menú"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          {/* Desktop: new chat icon */}
          <button
            onClick={nuevaConversacion}
            className="hidden md:flex p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/8 transition-colors"
            aria-label="Nueva consulta"
            title="Nueva consulta"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
            </svg>
          </button>

          {/* Title */}
          <span className="flex-1 text-sm text-white/50 truncate min-w-0">
            {tituloActual ?? "Nueva consulta"}
          </span>

          {/* Right */}
          <div className="flex items-center gap-2 shrink-0">
            {!autenticado && (
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-white/35">
                  {consultasRestantes > 0 ? `${consultasRestantes} gratis` : "Sin consultas"}
                </span>
              </div>
            )}
            {autenticado && plan !== "gratis" && (
              <span className="text-xs text-amber-300/70 border border-amber-400/20 px-2 py-0.5 rounded-full capitalize hidden sm:inline">
                {plan}
              </span>
            )}
            {autenticado ? (
              <Link href="/perfil" className="w-7 h-7 rounded-full bg-white/10 border border-white/15 flex items-center justify-center text-xs font-bold hover:bg-white/20 transition-colors">
                {session.user.name?.charAt(0).toUpperCase()}
              </Link>
            ) : (
              <Link href="/login" className="text-xs text-white/50 hover:text-white transition-colors">
                Iniciar sesión
              </Link>
            )}
          </div>
        </header>

        {/* Free limit bar */}
        {!autenticado && consultasLibres > 0 && consultasLibres < LIMITE_GRATIS && (
          <div className="px-4 py-2 border-b border-amber-500/15 bg-amber-500/5 flex items-center justify-between shrink-0">
            <span className="text-xs text-amber-200/70">
              Te quedan <strong>{consultasRestantes}</strong> consulta{consultasRestantes !== 1 ? "s" : ""} gratis
            </span>
            <Link href="/registro" className="text-xs text-amber-300/80 hover:text-amber-200 underline">
              Registrate →
            </Link>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          {mensajes.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center h-full px-4 pb-32">
              <div className="w-14 h-14 rounded-2xl bg-[#1a1a2e] border border-white/10 flex items-center justify-center text-3xl mb-5" aria-hidden="true">
                ⚖️
              </div>
              <h1 className="text-2xl font-semibold text-white mb-2 text-center">
                {autenticado
                  ? `Hola, ${session.user.name?.split(" ")[0]}`
                  : "¿En qué te puedo ayudar?"}
              </h1>
              <p className="text-sm text-white/40 text-center max-w-xs">
                Soy Specterlaws, tu asistente especializado en leyes costarricenses.
              </p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 pb-6">
              {mensajes.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  msg={msg}
                  onAbogado={() => setModalActivo("abogado")}
                />
              ))}
              {cargando && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#1a1a2e] border border-white/10 flex items-center justify-center text-base flex-shrink-0 mt-1">⚖</div>
                  <div className="flex items-center gap-1.5 pt-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}
        </div>

        {/* Input area */}
        <div className="shrink-0 px-4 pb-4 pt-2">
          <div className="max-w-3xl mx-auto">
            <div className="bg-[#1e1e1e] border border-white/[0.1] rounded-2xl overflow-hidden focus-within:border-white/20 transition-colors">
              <textarea
                ref={textareaRef}
                value={inputTexto}
                onChange={(e) => setInputTexto(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    enviarMensaje();
                  }
                }}
                placeholder="Describe tu situación legal…"
                rows={1}
                className="w-full bg-transparent px-4 pt-3.5 pb-1 text-sm text-white placeholder:text-white/25 resize-none focus:outline-none leading-relaxed"
                style={{ maxHeight: "200px" }}
              />
              <div className="flex items-center justify-between px-3 pb-3 pt-1 gap-2">
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
                  className="shrink-0 w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center disabled:opacity-20 hover:bg-white/90 transition-all"
                  aria-label="Enviar"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            <p className="text-center text-[11px] text-white/20 mt-2">
              Enter para enviar · Shift+Enter nueva línea · Basado en leyes de Costa Rica
            </p>
          </div>
        </div>
      </div>

      {/* Modals */}
      {modalActivo === "buscar" && (
        <BuscarLeyesModal
          onCerrar={() => setModalActivo(null)}
          onEnviarAlChat={(t) => { enviarMensaje(t); setModalActivo(null); }}
        />
      )}
      {modalActivo === "subir" && (
        <SubirArchivosModal
          onCerrar={() => setModalActivo(null)}
          onArchivoSubido={(a) => setArchivos((p) => [...p, a])}
        />
      )}
      {modalActivo === "expediente" && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setModalActivo(null)}
            aria-label="Cerrar expediente"
          />
          <div className="fixed inset-y-0 right-0 z-50 w-full max-w-sm">
            <ExpedientePanel
              archivos={archivos}
              onAgregarAlChat={(a) => { enviarMensaje(`Adjunté el archivo "${a.nombre}" para que lo analices.`); setModalActivo(null); }}
              onCerrar={() => setModalActivo(null)}
            />
          </div>
        </>
      )}
      {modalActivo === "abogado" && (
        <AbogadoModal onCerrar={() => setModalActivo(null)} />
      )}

      {/* Free limit modal */}
      {modalActivo === "limite" && (
        <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50 p-4">
          <div className="bg-[#1e1e1e] border border-white/10 rounded-2xl max-w-sm w-full p-7 text-center">
            <div className="text-4xl mb-4">⚖️</div>
            <h2 className="text-lg font-semibold text-white mb-2">Límite gratuito alcanzado</h2>
            <p className="text-sm text-white/50 mb-6">
              Usaste tus <strong className="text-white">{LIMITE_GRATIS} consultas gratis</strong>.
              Registrate para continuar sin límites.
            </p>
            <div className="space-y-2.5">
              <Link href="/registro" className="block w-full bg-white text-black font-semibold rounded-xl py-2.5 text-sm hover:bg-white/90 transition-colors">
                Registrarme gratis
              </Link>
              <Link href="/precios" className="block w-full border border-white/15 text-white/70 rounded-xl py-2.5 text-sm hover:border-white/30 hover:text-white transition-colors">
                Ver planes
              </Link>
              <button onClick={() => setModalActivo(null)} className="text-xs text-white/30 hover:text-white/60 transition-colors pt-1">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Plan limit modal */}
      {modalActivo === "plan_limit" && (
        <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50 p-4">
          <div className="bg-[#1e1e1e] border border-white/10 rounded-2xl max-w-sm w-full p-7 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h2 className="text-lg font-semibold text-white mb-2">Límite mensual alcanzado</h2>
            <p className="text-sm text-white/50 mb-6">
              Alcanzaste las consultas de tu plan este mes.
            </p>
            <div className="space-y-2.5">
              <Link href="/precios" className="block w-full bg-white text-black font-semibold rounded-xl py-2.5 text-sm hover:bg-white/90 transition-colors">
                Ver planes
              </Link>
              <button onClick={() => setModalActivo(null)} className="block w-full border border-white/15 text-white/70 rounded-xl py-2.5 text-sm hover:border-white/30 hover:text-white transition-colors">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
