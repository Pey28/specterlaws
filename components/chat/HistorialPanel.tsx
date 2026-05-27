"use client";

import type { Conversacion } from "./types";

type Props = {
  historial: Conversacion[];
  onCargar: (conv: Conversacion) => void;
  onCerrar: () => void;
};

function formatFecha(iso: string) {
  return new Date(iso).toLocaleString("es-CR", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function HistorialPanel({
  historial,
  onCargar,
  onCerrar,
}: Props) {
  return (
    <div className="w-72 lg:w-80 lexcr-glass border-l border-white/10 flex flex-col shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
        <span className="text-lg">🗄️</span>
        <h3 className="font-bold text-white text-sm">Historial</h3>
        <span className="ml-1 text-xs bg-white/10 text-white px-2 py-0.5 rounded-full font-semibold border border-white/10">
          {historial.length}
        </span>
        <button
          onClick={onCerrar}
          className="ml-auto text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {historial.length === 0 ? (
          <div className="text-center py-12 text-white/45 text-sm">
            <p className="text-4xl mb-3">🗄️</p>
            <p className="font-medium text-white/60 mb-1">
              Sin conversaciones guardadas
            </p>
            <p className="text-xs">Tus consultas se guardan automáticamente</p>
          </div>
        ) : (
          historial.map((conv) => (
            <button
              key={conv.id}
              onClick={() => onCargar(conv)}
              className="w-full text-left border border-white/10 rounded-xl p-3 hover:border-cr-blue/45 hover:bg-white/5 transition-colors"
            >
              <p className="text-xs text-white/40 mb-1">
                {formatFecha(conv.fechaCreacion)}
              </p>
              <p className="text-sm font-medium text-white line-clamp-2 text-left">
                {conv.preview}
              </p>
              <p className="text-xs text-white/40 mt-1">
                {conv.mensajes.length} mensajes
              </p>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
