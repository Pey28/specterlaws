"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import type { Plan } from "@/lib/planes";
import { formatearPrecio } from "@/lib/planes";

export default function PagoModal({ plan }: { plan: Plan }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [abierto, setAbierto] = useState(false);
  const [metodo, setMetodo] = useState<"sinpe" | "tarjeta" | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const abrir = () => {
    if (!session?.user) {
      router.push(`/login?callbackUrl=/precios`);
      return;
    }
    setAbierto(true);
  };

  const pagar = async () => {
    if (!metodo) return;
    setCargando(true);
    setError("");

    try {
      if (metodo === "sinpe") {
        const res = await fetch("/api/pagos/sinpe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan: plan.id }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        router.push(`/pago/sinpe/${data.pagoId}`);
      } else {
        const res = await fetch("/api/pagos/stripe", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ plan: plan.id }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        window.location.href = data.url;
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al procesar el pago.");
      setCargando(false);
    }
  };

  return (
    <>
      <button
        onClick={abrir}
        className={`block w-full text-center font-semibold rounded-xl py-2.5 text-sm transition-colors ${
          plan.destacado
            ? "bg-[#1A3A6B] hover:bg-[#0f2548] text-white"
            : "bg-[#1A3A6B]/10 hover:bg-[#1A3A6B] hover:text-white text-[#1A3A6B]"
        }`}
      >
        {plan.periodo === "uso" ? "Comprar consulta" : "Suscribirse"}
      </button>

      {abierto && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-7">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-bold text-[#1A3A6B] text-lg">{plan.nombre}</h3>
                <p className="text-sm text-gray-500">
                  {formatearPrecio(plan.precio)}
                  {plan.periodo === "mes" ? "/mes" : plan.periodo === "uso" ? " por consulta" : ""}
                </p>
              </div>
              <button
                onClick={() => { setAbierto(false); setMetodo(null); setError(""); }}
                className="text-gray-400 hover:text-gray-600 text-xl leading-none"
              >
                ×
              </button>
            </div>

            <p className="text-sm text-gray-600 mb-5">Seleccioná tu método de pago:</p>

            <div className="space-y-3 mb-5">
              <button
                onClick={() => setMetodo("sinpe")}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-colors text-left ${
                  metodo === "sinpe"
                    ? "border-[#1A3A6B] bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="text-2xl">📱</span>
                <div>
                  <div className="font-semibold text-sm text-gray-800">SINPE Móvil</div>
                  <div className="text-xs text-gray-500">Confirmación en 24 horas hábiles</div>
                </div>
                {metodo === "sinpe" && (
                  <span className="ml-auto w-5 h-5 rounded-full bg-[#1A3A6B] flex items-center justify-center text-white text-xs">✓</span>
                )}
              </button>

              <button
                onClick={() => setMetodo("tarjeta")}
                className={`w-full flex items-center gap-3 p-4 rounded-xl border-2 transition-colors text-left ${
                  metodo === "tarjeta"
                    ? "border-[#1A3A6B] bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <span className="text-2xl">💳</span>
                <div>
                  <div className="font-semibold text-sm text-gray-800">Tarjeta Visa / Mastercard</div>
                  <div className="text-xs text-gray-500">Confirmación inmediata vía Stripe</div>
                </div>
                {metodo === "tarjeta" && (
                  <span className="ml-auto w-5 h-5 rounded-full bg-[#1A3A6B] flex items-center justify-center text-white text-xs">✓</span>
                )}
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg px-3 py-2 mb-4">
                {error}
              </div>
            )}

            <button
              onClick={pagar}
              disabled={!metodo || cargando}
              className="w-full bg-[#1A3A6B] hover:bg-[#0f2548] disabled:bg-gray-300 text-white font-semibold rounded-xl py-3 text-sm transition-colors"
            >
              {cargando ? "Procesando..." : `Pagar ${formatearPrecio(plan.precio)}`}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
