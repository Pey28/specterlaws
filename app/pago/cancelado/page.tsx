import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Pago cancelado – Specterlaws" };

export default function PagoCanceladoPage() {
  return (
    <div className="min-h-screen bg-[#F0F4F8] flex flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="flex items-center gap-2 mb-8">
        
        <img src="/logo.png" alt="Specterlaws" className="h-7 w-auto object-contain" />
      </Link>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 max-w-sm w-full p-10 text-center">
        <div className="text-5xl mb-4">😕</div>
        <h1 className="text-xl font-bold text-[#1A3A6B] mb-2">Pago cancelado</h1>
        <p className="text-sm text-gray-500 mb-6">
          No se realizó ningún cobro. Podés intentar de nuevo cuando quieras.
        </p>
        <div className="space-y-3">
          <Link
            href="/precios"
            className="block w-full bg-[#1A3A6B] hover:bg-[#0f2548] text-white font-semibold rounded-xl py-3 text-sm transition-colors"
          >
            Ver planes
          </Link>
          <Link
            href="/chat"
            className="block w-full border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-xl py-3 text-sm transition-colors"
          >
            Continuar gratis
          </Link>
        </div>
      </div>
    </div>
  );
}
