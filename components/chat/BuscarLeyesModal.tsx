"use client";

import { useState } from "react";

type Props = {
  onCerrar: () => void;
  onEnviarAlChat: (texto: string) => void;
};

export default function BuscarLeyesModal({ onCerrar, onEnviarAlChat }: Props) {
  const [consulta, setConsulta] = useState("");
  const [resultado, setResultado] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const buscar = async () => {
    if (!consulta.trim() || cargando) return;
    setCargando(true);
    setResultado("");
    setError("");

    try {
      const res = await fetch("/api/buscar-ley", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ consulta }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setResultado(data.respuesta || "Sin resultados.");
    } catch {
      setError("Error al consultar. Verifica tu conexión e intenta de nuevo.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={(e) => e.target === e.currentTarget && onCerrar()}
    >
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 p-5 border-b border-gray-100">
          <span className="text-2xl">🌐</span>
          <div>
            <h2 className="font-bold text-[#1A3A6B] text-lg">Buscar Leyes</h2>
            <p className="text-xs text-gray-400">
              Legislación costarricense vigente 2026
            </p>
          </div>
          <button
            onClick={onCerrar}
            className="ml-auto text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search input */}
        <div className="p-5 border-b border-gray-100">
          <div className="flex gap-2">
            <input
              type="text"
              value={consulta}
              onChange={(e) => setConsulta(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && buscar()}
              placeholder="Ej: artículo 85 Código de Trabajo, preaviso laboral, riesgos del trabajo..."
              className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A6B] focus:border-transparent"
              autoFocus
            />
            <button
              onClick={buscar}
              disabled={!consulta.trim() || cargando}
              className="bg-[#1A3A6B] hover:bg-[#0f2548] disabled:bg-gray-300 text-white px-5 py-3 rounded-xl text-sm font-semibold transition-colors whitespace-nowrap"
            >
              {cargando ? "..." : "Buscar"}
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto p-5">
          {cargando && (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <div className="w-8 h-8 border-2 border-[#1A3A6B] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-gray-500">Consultando legislación...</p>
            </div>
          )}

          {error && !cargando && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm">
              {error}
            </div>
          )}

          {resultado && !cargando && (
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
                {resultado}
              </div>
              <button
                onClick={() => {
                  onEnviarAlChat(`Sobre "${consulta}":\n\n${resultado}`);
                  onCerrar();
                }}
                className="w-full bg-[#C0392B] hover:bg-[#a93226] text-white py-3 rounded-xl text-sm font-semibold transition-colors"
              >
                Enviar al chat para seguir consultando →
              </button>
            </div>
          )}

          {!resultado && !cargando && !error && (
            <div className="text-center py-10 text-gray-400 text-sm">
              <p className="text-4xl mb-3">📖</p>
              <p className="font-medium text-gray-500 mb-1">
                Busca en la legislación costarricense
              </p>
              <p>
                Código de Trabajo · Constitución · Ley 6727 · Sala Segunda
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
