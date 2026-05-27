import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Pago exitoso – Specterlaws" };

export default function PagoExitosoPage() {
  return (
    <div className="min-h-screen bg-[#F0F4F8] flex flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="flex flex-col gap-[3px]">
          <span className="block w-4 h-0.5 rounded-sm bg-[#1A3A6B]/60" />
          <span className="block w-4 h-0.5 rounded-sm bg-[#C0392B]" />
          <span className="block w-4 h-0.5 rounded-sm bg-[#1A3A6B]/60" />
        </div>
        <span className="text-xl font-bold text-[#1A3A6B]">Specter<span className="text-[#C0392B]">laws</span></span>
      </Link>
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 max-w-sm w-full p-10 text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h1 className="text-2xl font-bold text-[#1A3A6B] mb-2">¡Pago exitoso!</h1>
        <p className="text-sm text-gray-500 mb-6">
          Tu plan ha sido activado. Ya podés usar todas las funciones de Specterlaws.
        </p>
        <div className="space-y-3">
          <Link
            href="/chat"
            className="block w-full bg-[#1A3A6B] hover:bg-[#0f2548] text-white font-semibold rounded-xl py-3 text-sm transition-colors"
          >
            Ir al chat
          </Link>
          <Link
            href="/perfil"
            className="block w-full border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-xl py-3 text-sm transition-colors"
          >
            Ver mi perfil
          </Link>
        </div>
      </div>
    </div>
  );
}
