"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { formatearPrecio } from "@/lib/planes";

export default function SinpePage() {
  const { id } = useParams<{ id: string }>();
  const [pago, setPago] = useState<{
    referencia: string;
    monto: number;
    planNombre: string;
    comprobante?: string;
  } | null>(null);
  const [comprobante, setComprobante] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    fetch(`/api/pagos/sinpe/info?id=${id}`)
      .then((r) => r.json())
      .then(setPago)
      .catch(() => setError("No se encontró el pago."));
  }, [id]);

  const enviarComprobante = async () => {
    if (!comprobante.trim()) return;
    setCargando(true);
    const res = await fetch("/api/pagos/sinpe/confirmar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pagoId: id, comprobante }),
    });
    const data = await res.json();
    if (res.ok) {
      setEnviado(true);
    } else {
      setError(data.error ?? "Error al enviar.");
    }
    setCargando(false);
  };

  const sinpeNumero = process.env.NEXT_PUBLIC_SINPE_NUMERO ?? "8888-8888";

  if (error) return (
    <div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-sm">
        <div className="text-4xl mb-3">❌</div>
        <p className="text-gray-700">{error}</p>
        <Link href="/precios" className="mt-4 inline-block text-[#1A3A6B] underline text-sm">Volver a precios</Link>
      </div>
    </div>
  );

  if (!pago) return (
    <div className="min-h-screen bg-[#F0F4F8] flex items-center justify-center">
      <div className="text-gray-500 text-sm">Cargando...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F0F4F8] flex flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="flex flex-col gap-[3px]">
          <span className="block w-4 h-0.5 rounded-sm bg-[#1A3A6B]/60" />
          <span className="block w-4 h-0.5 rounded-sm bg-[#C0392B]" />
          <span className="block w-4 h-0.5 rounded-sm bg-[#1A3A6B]/60" />
        </div>
        <img src="/logo.png" alt="Specterlaws" className="h-7 w-auto object-contain" />
      </Link>

      {enviado ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 max-w-md w-full p-8 text-center">
          <div className="text-5xl mb-4">✅</div>
          <h1 className="text-xl font-bold text-[#1A3A6B] mb-2">Comprobante recibido</h1>
          <p className="text-sm text-gray-500 mb-6">
            Verificaremos tu pago en las próximas <strong>24 horas hábiles</strong>.
            Una vez confirmado, tu plan se activará automáticamente.
          </p>
          <Link href="/chat" className="block w-full bg-[#1A3A6B] hover:bg-[#0f2548] text-white font-semibold rounded-xl py-3 text-sm transition-colors">
            Ir al chat
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 max-w-md w-full p-8">
          <h1 className="text-2xl font-bold text-[#1A3A6B] mb-1">Pago con SINPE Móvil</h1>
          <p className="text-sm text-gray-500 mb-6">Plan {pago.planNombre}</p>

          {/* Instructions */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-5 mb-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Monto a enviar:</span>
              <span className="text-xl font-bold text-[#1A3A6B]">{formatearPrecio(pago.monto)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Número SINPE:</span>
              <span className="text-lg font-bold text-gray-800 font-mono">{sinpeNumero}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Mensaje / referencia:</span>
              <code className="text-sm font-bold bg-white border border-blue-200 rounded px-2 py-1 text-[#1A3A6B]">
                {pago.referencia}
              </code>
            </div>
          </div>

          <ol className="text-sm text-gray-600 space-y-2 mb-6 list-decimal list-inside">
            <li>Abrí tu app bancaria y andá a SINPE Móvil.</li>
            <li>Enviá <strong>{formatearPrecio(pago.monto)}</strong> al número <strong>{sinpeNumero}</strong>.</li>
            <li>En el campo de mensaje escribí exactamente: <code className="bg-gray-100 px-1 rounded">{pago.referencia}</code></li>
            <li>Pegá el número de comprobante abajo.</li>
          </ol>

          {/* Comprobante input */}
          <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">
              Número de comprobante SINPE
            </label>
            <input
              type="text"
              value={comprobante}
              onChange={(e) => setComprobante(e.target.value)}
              placeholder="Ej: 202605271234"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1A3A6B] focus:border-transparent"
            />
            {error && (
              <p className="text-red-600 text-xs">{error}</p>
            )}
            <button
              onClick={enviarComprobante}
              disabled={!comprobante.trim() || cargando}
              className="w-full bg-[#1A3A6B] hover:bg-[#0f2548] disabled:bg-gray-300 text-white font-semibold rounded-xl py-3 text-sm transition-colors"
            >
              {cargando ? "Enviando..." : "Confirmar pago"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
