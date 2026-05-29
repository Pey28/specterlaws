"use client";

import { useState } from "react";

type Props = {
  titulo: string;
  contenido: string;
  onCerrar: () => void;
};

export default function ArtifactPanel({ titulo, contenido, onCerrar }: Props) {
  const [copiado, setCopiado] = useState(false);

  function copiar() {
    navigator.clipboard.writeText(contenido).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    });
  }

  function descargarTxt() {
    const blob = new Blob([contenido], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${titulo.replace(/\s+/g, "_")}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function descargarWord() {
    const html = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:w="urn:schemas-microsoft-com:office:word"
            xmlns="http://www.w3.org/TR/REC-html40">
      <head><meta charset="utf-8"><title>${titulo}</title>
      <style>body{font-family:Arial,sans-serif;font-size:12pt;margin:2.5cm;}
      p{margin:0 0 12pt;}h1{font-size:14pt;font-weight:bold;}</style>
      </head><body>
      <h1>${titulo}</h1>
      ${contenido.split("\n").map(l => l.trim() ? `<p>${l}</p>` : "<p>&nbsp;</p>").join("")}
      </body></html>`;
    const blob = new Blob([html], { type: "application/msword" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${titulo.replace(/\s+/g, "_")}.doc`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function imprimirPDF() {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`
      <!DOCTYPE html><html><head><meta charset="utf-8">
      <title>${titulo}</title>
      <style>
        body{font-family:Arial,sans-serif;font-size:12pt;margin:2.5cm;color:#000;}
        h1{font-size:16pt;font-weight:bold;margin-bottom:24pt;}
        p{margin:0 0 10pt;line-height:1.5;}
        @media print{body{margin:2cm;}}
      </style></head><body>
      <h1>${titulo}</h1>
      ${contenido.split("\n").map(l => l.trim() ? `<p>${l}</p>` : "<p>&nbsp;</p>").join("")}
      </body></html>`);
    w.document.close();
    setTimeout(() => { w.print(); }, 400);
  }

  return (
    <div className="flex flex-col h-full bg-[#1a1a1a] border-l border-[#2a2a2a]">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 border-b border-[#2a2a2a] shrink-0">
        <div className="flex-1 min-w-0">
          <p className="text-[11px] text-white/35 uppercase tracking-wider mb-0.5">Documento</p>
          <p className="text-sm font-medium text-white truncate">{titulo}</p>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {/* Copy */}
          <button
            onClick={copiar}
            title="Copiar texto"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-white/50 hover:text-white hover:bg-white/8 transition-colors"
          >
            {copiado ? (
              <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            )}
            <span className="hidden sm:inline">{copiado ? "Copiado" : "Copiar"}</span>
          </button>

          {/* Word */}
          <button
            onClick={descargarWord}
            title="Descargar Word"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-white/50 hover:text-white hover:bg-white/8 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="hidden sm:inline">Word</span>
          </button>

          {/* PDF */}
          <button
            onClick={imprimirPDF}
            title="Guardar PDF"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-white/50 hover:text-white hover:bg-white/8 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span className="hidden sm:inline">PDF</span>
          </button>

          {/* Cerrar */}
          <button
            onClick={onCerrar}
            title="Cerrar"
            className="p-1.5 rounded-lg text-white/35 hover:text-white hover:bg-white/8 transition-colors ml-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 sm:p-6">
        <pre className="text-sm text-white/80 whitespace-pre-wrap font-sans leading-relaxed">
          {contenido}
        </pre>
      </div>
    </div>
  );
}
