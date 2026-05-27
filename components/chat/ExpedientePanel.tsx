"use client";

import Image from "next/image";
import type { Archivo } from "./types";

type Props = {
  archivos: Archivo[];
  onAgregarAlChat: (archivo: Archivo) => void;
  onCerrar: () => void;
};

function iconoPorTipo(tipo: string) {
  if (tipo.includes("pdf")) return "📄";
  if (tipo.includes("image")) return "🖼️";
  if (tipo.includes("word") || tipo.includes("docx")) return "📝";
  return "📎";
}

function formatFecha(iso: string) {
  return new Date(iso).toLocaleString("es-CR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}

export default function ExpedientePanel({
  archivos,
  onAgregarAlChat,
  onCerrar,
}: Props) {
  return (
    <div className="w-full h-full lexcr-glass border-l border-white/10 flex flex-col shadow-xl">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-white/5">
        <span className="text-lg">📁</span>
        <h3 className="font-bold text-white text-sm">Expediente</h3>
        <span className="ml-1 text-xs bg-white/10 text-white px-2 py-0.5 rounded-full font-semibold border border-white/10">
          {archivos.length}
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
        {archivos.length === 0 ? (
          <div className="text-center py-12 text-white/45 text-sm">
            <p className="text-4xl mb-3">📂</p>
            <p className="font-medium text-white/60 mb-1">
              Expediente vacío
            </p>
            <p className="text-xs">Sube archivos con el botón ⬆️</p>
          </div>
        ) : (
          archivos.map((a) => (
            <div
              key={a.id}
              className="border border-white/10 rounded-xl p-3 hover:border-cr-blue/45 hover:bg-white/5 transition-colors"
            >
              <div className="flex items-start gap-2 mb-2">
                {a.preview ? (
                  <Image
                    src={a.preview}
                    alt={a.nombre}
                    width={40}
                    height={40}
                    unoptimized
                    className="w-10 h-10 object-cover rounded-lg flex-shrink-0"
                  />
                ) : (
                  <span className="text-2xl flex-shrink-0 leading-none">
                    {iconoPorTipo(a.tipo)}
                  </span>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white text-xs truncate">
                    {a.nombre}
                  </p>
                  <p className="text-xs text-white/45">
                    {(a.tamaño / 1024).toFixed(1)} KB
                  </p>
                  <p className="text-xs text-white/45">
                    {formatFecha(a.fechaSubida)}
                  </p>
                </div>
              </div>
              <button
                onClick={() => onAgregarAlChat(a)}
                className="w-full text-xs font-semibold text-white bg-cr-blue/80 hover:bg-cr-blue hover:text-white py-1.5 rounded-lg transition-colors lexcr-glow-blue"
              >
                Usar en chat →
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
