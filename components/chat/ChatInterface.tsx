"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import ToolBar from "./ToolBar";
import BuscarLeyesModal from "./BuscarLeyesModal";
import SubirArchivosModal from "./SubirArchivosModal";
import ExpedientePanel from "./ExpedientePanel";
import HistorialPanel from "./HistorialPanel";
import AbogadoModal from "./AbogadoModal";
import type { Archivo, Mensaje, Conversacion } from "./types";

const SUGERENCIAS = [
  "¿Qué derechos tengo si me despiden sin causa?",
  "¿Cómo pongo una denuncia ante el MTSS?",
  "¿Qué dice el artículo 85 del Código de Trabajo?",
  "¿Cómo funciona la pensión alimentaria en CR?",
];

const LIMITE_GRATIS = 3;
const KEY_CONSULTAS = "crlexai-consultas-libres";

type ModalActivo = "buscar" | "subir" | "limite" | "abogado" | "plan_limit" | null;

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
  const [panelActivo, setPanelActivo] = useState<"expediente" | "historial" | null>(null);
  const [consultasLibres, setConsultasLibres] = useState(0);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const convIdRef = useRef(Date.now().toString());

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
      const actualizado = [conv, ...existente.filter((c) => c.id !== convIdRef.current)].slice(0, 20);
      localStorage.setItem("crlexai-historial", JSON.stringify(actualizado));
      setHistorial(actualizado);
    } catch { /* ignore */ }
  }, [mensajes]);

  const enviarMensaje = useCallback(
    async (textoForzado?: string) => {
      const contenido = textoForzado ?? inputTexto.trim();
      if (!contenido || cargando) return;

      // Check free limit for anonymous users
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
          // Plan limit reached
          setMensajes((prev) => prev.slice(0, -1)); // remove the user message
          setInputTexto(contenido); // restore input
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

  const cargarConversacion = (conv: Conversacion) => {
    convIdRef.current = conv.id;
    setMensajes(conv.mensajes);
    setPanelActivo(null);
  };

  const nuevaConversacion = () => {
    convIdRef.current = Date.now().toString();
    setMensajes([]);
    setInputTexto("");
  };

  const consultasRestantes = LIMITE_GRATIS - consultasLibres;

  return (
    <div className="flex flex-col h-[100dvh] min-h-[100svh] lexcr-chat-pattern">
      {/* Header */}
      <header className="lexcr-glass text-white px-4 sm:px-4 py-3 flex items-center gap-2 sm:gap-3 shadow-[0_10px_40px_rgba(0,0,0,0.55)] flex-shrink-0">
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="flex flex-col gap-[3px]">
            <span className="block w-4 h-0.5 rounded-sm bg-cr-blue/70 lexcr-glow-blue" />
            <span className="block w-4 h-0.5 rounded-sm bg-cr-red lexcr-glow-red" />
            <span className="block w-4 h-0.5 rounded-sm bg-cr-blue/70 lexcr-glow-blue" />
          </div>
          <span className="text-lg font-bold">Specter<span className="text-cr-red">laws</span></span>
        </Link>
        <div className="h-5 w-px bg-white/15 mx-1" />
        <span className="text-sm text-white/60 hidden sm:inline">Asistente Legal</span>

        <div className="ml-auto flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-xs text-white/60 hidden sm:inline">En línea</span>
          </div>

          {autenticado ? (
            <>
              {plan !== "gratis" && (
                <span className="text-xs bg-amber-400/20 text-amber-200 border border-amber-400/30 px-2 py-0.5 rounded-full hidden sm:inline capitalize">
                  {plan}
                </span>
              )}
              <Link href="/perfil" className="flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg border border-white/20 transition-colors">
                <span className="w-5 h-5 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-xs font-bold">
                  {session.user.name?.charAt(0).toUpperCase()}
                </span>
                <span className="hidden sm:inline max-w-[80px] truncate">{session.user.name?.split(" ")[0]}</span>
              </Link>
              <button onClick={() => signOut({ callbackUrl: "/" })} className="text-xs text-white/50 hover:text-white transition-colors hidden sm:inline">
                Salir
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-xs text-blue-200 hover:text-white transition-colors hidden sm:inline">
                Iniciar sesión
              </Link>
              <Link href="/registro" className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg border border-white/20 transition-colors lexcr-mobile-tap">
                Registrarse
              </Link>
            </>
          )}

          <button onClick={nuevaConversacion} className="text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-2 rounded-lg border border-white/20 transition-colors lexcr-mobile-tap">
            + Nueva
          </button>
        </div>
      </header>

      {/* Free-limit warning bar */}
      {!autenticado && consultasLibres > 0 && consultasLibres < LIMITE_GRATIS && (
        <div className="lexcr-glass border-b border-amber-500/20 px-4 py-2 flex items-center justify-between text-xs text-amber-100/90">
          <span>Te quedan <strong>{consultasRestantes}</strong> consulta{consultasRestantes !== 1 ? "s" : ""} gratis.</span>
          <Link href="/registro" className="font-semibold underline">Registrate para más →</Link>
        </div>
      )}

      {/* Body */}
      <div className="flex flex-1 overflow-hidden relative">
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          {/* Mensajes (arriba cuando hay conversación) */}
          {mensajes.length > 0 && (
            <div className="flex-1 overflow-y-auto px-4 sm:px-4 py-4 min-h-0">
              <div className="max-w-2xl mx-auto space-y-4">
                {mensajes.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-cr-blue/80 border border-white/10 flex items-center justify-center text-white text-sm font-bold mr-2 mt-1 flex-shrink-0">
                        ⚖
                      </div>
                    )}
                    <div
                      className={`max-w-[88%] sm:max-w-[85%] rounded-2xl px-4 py-3 text-base sm:text-sm leading-relaxed whitespace-pre-wrap break-words ${
                        msg.role === "user"
                          ? "bg-cr-blue text-white rounded-br-sm"
                          : "lexcr-card text-white/85 rounded-bl-sm"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}

                {mensajes[mensajes.length - 1]?.role === "assistant" && !cargando && (
                  <div className="flex justify-start ml-10">
                    <button
                      onClick={() => setModalActivo("abogado")}
                      className="text-xs text-white/80 border border-white/15 bg-white/5 hover:bg-white/10 rounded-full px-3 py-1.5 transition-colors flex items-center gap-1.5"
                    >
                      ⚖ Hablar con un abogado
                    </button>
                  </div>
                )}

                {cargando && (
                  <div className="flex justify-start">
                    <div className="w-8 h-8 rounded-full bg-cr-blue/80 border border-white/10 flex items-center justify-center text-white text-sm font-bold mr-2 flex-shrink-0">
                      ⚖
                    </div>
                    <div className="lexcr-card rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2">
                      <span className="text-xs text-white/50">Specterlaws está escribiendo</span>
                      <div className="flex gap-1 items-center">
                        <span className="lexcr-typing-dot w-1.5 h-1.5 rounded-full bg-cr-blue" />
                        <span className="lexcr-typing-dot w-1.5 h-1.5 rounded-full bg-cr-blue" />
                        <span className="lexcr-typing-dot w-1.5 h-1.5 rounded-full bg-cr-blue" />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            </div>
          )}

          {/* Centro: balanza + chat */}
          <div
            className={`flex flex-col items-center justify-center px-4 sm:px-4 py-4 sm:py-6 w-full ${
              mensajes.length === 0 ? "flex-1" : "flex-shrink-0 border-t border-white/10"
            }`}
          >
            <div className="w-full max-w-2xl flex flex-col items-center text-center">
              <div
                className={`flex items-center justify-center rounded-full bg-cr-blue/20 border border-cr-blue/30 mb-4 ${
                  mensajes.length === 0 ? "w-20 h-20 text-5xl" : "w-12 h-12 text-2xl mb-3"
                }`}
                aria-hidden="true"
              >
                ⚖️
              </div>

              {mensajes.length === 0 && (
                <>
                  <h2 className="text-xl sm:text-2xl font-serif font-semibold text-white mb-2">
                    {autenticado
                      ? `Hola, ${session.user.name?.split(" ")[0]}. ¿En qué te ayudo?`
                      : "¿En qué te puedo ayudar?"}
                  </h2>
                  <p className="text-white/60 max-w-md text-sm mb-6">
                    Soy Specterlaws, tu asistente legal especializado en las leyes de Costa Rica.
                  </p>
                </>
              )}

              <div className="w-full lexcr-card rounded-2xl p-3 sm:p-4 border border-white/15 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
                <div className="flex gap-2 mb-2">
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
                    placeholder="Describe tu situación legal... (Enter para enviar)"
                    className="flex-1 resize-none rounded-xl px-4 py-3 text-base sm:text-sm bg-white/5 border border-white/15 text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:border-transparent max-h-36 min-h-[56px]"
                    rows={2}
                  />
                  <button
                    onClick={() => enviarMensaje()}
                    disabled={!inputTexto.trim() || cargando}
                    className="lexcr-mobile-tap bg-cr-red hover:bg-cr-red-light disabled:bg-white/10 text-white rounded-xl px-4 py-3 transition-colors self-end flex-shrink-0"
                    aria-label="Enviar"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </button>
                </div>

                <ToolBar
                  onBuscarLeyes={() => {
                    setModalActivo("buscar");
                    setPanelActivo(null);
                  }}
                  onSubirArchivos={() => {
                    setModalActivo("subir");
                    setPanelActivo(null);
                  }}
                  onExpediente={() => setPanelActivo((p) => (p === "expediente" ? null : "expediente"))}
                  onHistorial={() => setPanelActivo((p) => (p === "historial" ? null : "historial"))}
                  onAbogado={() => setModalActivo("abogado")}
                  archivosCount={archivos.length}
                  historialCount={historial.length}
                  panelActivo={panelActivo}
                />
              </div>

              {mensajes.length === 0 && (
                <div className="lexcr-mobile-scroll flex sm:grid sm:grid-cols-2 gap-3 w-full mt-6 overflow-x-auto sm:overflow-visible pb-1">
                  {SUGERENCIAS.map((s, i) => (
                    <button
                      key={s}
                      onClick={() => enviarMensaje(s)}
                      className="lexcr-mobile-tap shrink-0 w-[84%] sm:w-auto text-left text-base sm:text-sm rounded-xl px-4 py-4 min-h-[56px] transition-all text-white/85 lexcr-card border border-white/10 hover:border-cr-blue/45 hover:bg-white/5 flex items-start gap-3"
                    >
                      <span className="text-xl shrink-0" aria-hidden="true">
                        {["⚖️", "📋", "📖", "👨‍👩‍👧"][i]}
                      </span>
                      <span className="leading-snug">{s}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {mensajes.length === 0 && <div ref={chatEndRef} className="sr-only" />}
        </div>

        {panelActivo === "expediente" && (
          <>
            <button
              type="button"
              className="md:hidden fixed inset-0 z-30 bg-black/50"
              aria-label="Cerrar expediente"
              onClick={() => setPanelActivo(null)}
            />
            <div className="fixed md:relative inset-y-0 right-0 z-40 md:z-auto w-full max-w-sm md:max-w-none md:w-72 lg:w-80">
              <ExpedientePanel
                archivos={archivos}
                onAgregarAlChat={(a) => { enviarMensaje(`Adjunté el archivo "${a.nombre}" para que lo analices.`); setPanelActivo(null); }}
                onCerrar={() => setPanelActivo(null)}
              />
            </div>
          </>
        )}
        {panelActivo === "historial" && (
          <>
            <button
              type="button"
              className="md:hidden fixed inset-0 z-30 bg-black/50"
              aria-label="Cerrar historial"
              onClick={() => setPanelActivo(null)}
            />
            <div className="fixed md:relative inset-y-0 right-0 z-40 md:z-auto w-full max-w-sm md:max-w-none md:w-72 lg:w-80">
              <HistorialPanel historial={historial} onCargar={cargarConversacion} onCerrar={() => setPanelActivo(null)} />
            </div>
          </>
        )}
      </div>

      {/* Modals */}
      {modalActivo === "buscar" && (
        <BuscarLeyesModal onCerrar={() => setModalActivo(null)} onEnviarAlChat={(t) => { enviarMensaje(t); setModalActivo(null); }} />
      )}
      {modalActivo === "subir" && (
        <SubirArchivosModal onCerrar={() => setModalActivo(null)} onArchivoSubido={(a) => setArchivos((p) => [...p, a])} />
      )}
      {modalActivo === "abogado" && (
        <AbogadoModal onCerrar={() => setModalActivo(null)} />
      )}

      {/* Free-limit modal (anonymous users) */}
      {modalActivo === "limite" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="rounded-2xl shadow-xl max-w-sm w-full p-8 text-center lexcr-card border border-white/10">
            <div className="text-5xl mb-4">⚖️</div>
            <h2 className="text-xl font-serif font-semibold text-white mb-2">Límite gratuito alcanzado</h2>
            <p className="text-sm text-white/60 mb-6">
              Usaste tus <strong>{LIMITE_GRATIS} consultas gratis</strong>.
              Registrate gratis para consultas ilimitadas o comprá una consulta individual por <strong>₡500</strong>.
            </p>
            <div className="space-y-3">
              <Link href="/registro" className="block w-full bg-cr-blue hover:bg-cr-blue-light text-white font-semibold rounded-xl py-3 text-sm transition-colors lexcr-glow-blue">
                Registrarme gratis
              </Link>
              <Link href="/precios" className="block w-full border border-white/15 hover:bg-white/5 text-white/80 font-medium rounded-xl py-3 text-sm transition-colors">
                Ver todos los planes
              </Link>
              <button onClick={() => setModalActivo(null)} className="text-xs text-white/40 hover:text-white/60">Cerrar</button>
            </div>
          </div>
        </div>
      )}

      {/* Plan limit modal (registered users who hit their monthly limit) */}
      {modalActivo === "plan_limit" && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="rounded-2xl shadow-xl max-w-sm w-full p-8 text-center lexcr-card border border-white/10">
            <div className="text-5xl mb-4">📊</div>
            <h2 className="text-xl font-serif font-semibold text-white mb-2">Límite mensual alcanzado</h2>
            <p className="text-sm text-white/60 mb-6">
              Alcanzaste las consultas incluidas en tu plan este mes.
              Actualizá tu plan para seguir consultando sin límites.
            </p>
            <div className="space-y-3">
              <Link href="/precios" className="block w-full bg-cr-blue hover:bg-cr-blue-light text-white font-semibold rounded-xl py-3 text-sm transition-colors lexcr-glow-blue">
                Ver planes desde ₡3,000/mes
              </Link>
              <button onClick={() => setModalActivo(null)} className="block w-full border border-white/15 hover:bg-white/5 text-white/80 font-medium rounded-xl py-3 text-sm transition-colors">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
