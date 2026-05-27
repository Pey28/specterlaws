"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import type { Archivo } from "./types";

type Props = {
  onCerrar: () => void;
  onArchivoSubido: (archivo: Archivo) => void;
};

const TIPOS_VALIDOS = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function iconoPorTipo(tipo: string) {
  if (tipo.includes("pdf")) return "📄";
  if (tipo.includes("image")) return "🖼️";
  if (tipo.includes("word") || tipo.includes("docx")) return "📝";
  return "📎";
}

export default function SubirArchivosModal({ onCerrar, onArchivoSubido }: Props) {
  const [archivo, setArchivo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [arrastrando, setArrastrando] = useState(false);
  const [errorTipo, setErrorTipo] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const procesarArchivo = (file: File) => {
    setErrorTipo("");
    if (!TIPOS_VALIDOS.includes(file.type)) {
      setErrorTipo("Tipo no soportado. Usa PDF, JPG, PNG o DOCX.");
      return;
    }
    setArchivo(file);
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setArrastrando(false);
    const file = e.dataTransfer.files[0];
    if (file) procesarArchivo(file);
  };

  const confirmar = () => {
    if (!archivo) return;

    const nuevoArchivo: Archivo = {
      id: Date.now().toString(),
      nombre: archivo.name,
      tipo: archivo.type,
      tamaño: archivo.size,
      preview: preview || undefined,
      contenido: "",
      fechaSubida: new Date().toISOString(),
    };

    if (archivo.type.startsWith("text/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        nuevoArchivo.contenido = e.target?.result as string;
        onArchivoSubido(nuevoArchivo);
        onCerrar();
      };
      reader.readAsText(archivo);
    } else {
      nuevoArchivo.contenido = `[${archivo.name}]`;
      onArchivoSubido(nuevoArchivo);
      onCerrar();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={(e) => e.target === e.currentTarget && onCerrar()}
    >
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex items-center gap-3 p-5 border-b border-gray-100">
          <span className="text-2xl">⬆️</span>
          <div>
            <h2 className="font-bold text-[#1A3A6B] text-lg">Subir Archivo</h2>
            <p className="text-xs text-gray-400">PDF · JPG · PNG · DOCX</p>
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

        <div className="p-5">
          {errorTipo && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3 mb-4">
              {errorTipo}
            </div>
          )}

          {!archivo ? (
            <div
              onDrop={onDrop}
              onDragOver={(e) => { e.preventDefault(); setArrastrando(true); }}
              onDragLeave={() => setArrastrando(false)}
              onClick={() => inputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors ${
                arrastrando
                  ? "border-[#1A3A6B] bg-blue-50"
                  : "border-gray-300 hover:border-[#1A3A6B] hover:bg-gray-50"
              }`}
            >
              <div className="text-5xl mb-4">📂</div>
              <p className="font-semibold text-[#1A3A6B] mb-1">
                Arrastra un archivo aquí
              </p>
              <p className="text-sm text-gray-400 mb-4">
                o haz clic para seleccionar
              </p>
              <span className="text-xs bg-gray-100 text-gray-500 px-3 py-1.5 rounded-full">
                PDF · JPG · PNG · DOCX
              </span>
              <input
                ref={inputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.docx"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && procesarArchivo(e.target.files[0])}
              />
            </div>
          ) : (
            <div>
              {/* Preview */}
              <div className="border border-gray-200 rounded-xl p-4 mb-4">
                {preview ? (
                  <Image
                    src={preview}
                    alt="preview"
                    width={800}
                    height={520}
                    unoptimized
                    className="w-full max-h-52 object-contain rounded-lg"
                  />
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">{iconoPorTipo(archivo.type)}</span>
                    <div>
                      <p className="font-semibold text-[#1A3A6B] text-sm break-all">
                        {archivo.name}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {(archivo.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => { setArchivo(null); setPreview(null); }}
                  className="flex-1 border border-gray-200 text-gray-600 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  Cambiar
                </button>
                <button
                  onClick={confirmar}
                  className="flex-1 bg-[#1A3A6B] hover:bg-[#0f2548] text-white py-3 rounded-xl text-sm font-semibold transition-colors"
                >
                  Agregar al expediente
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
