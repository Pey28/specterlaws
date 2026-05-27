import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Olvidé mi contraseña – Specterlaws",
};

export default function OlvideContrasenaPage() {
  return (
    <div className="min-h-screen bg-[#F0F4F8] flex flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
        <div className="flex flex-col gap-[3px]">
          <span className="block w-5 h-0.5 rounded-sm bg-[#1A3A6B]/60" />
          <span className="block w-5 h-0.5 rounded-sm bg-[#C0392B]" />
          <span className="block w-5 h-0.5 rounded-sm bg-[#1A3A6B]/60" />
        </div>
        <span className="text-2xl font-bold text-[#1A3A6B]">
          Specter<span className="text-[#C0392B]">laws</span>
        </span>
      </Link>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full max-w-md p-8 text-center">
        <div className="w-14 h-14 bg-[#F0F4F8] rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-[#1A3A6B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold text-[#1A3A6B] mb-2">Recuperación de contraseña</h1>
        <p className="text-sm text-gray-500 mb-6">
          La recuperación automática de contraseña estará disponible próximamente.
          Por ahora, podés crear una cuenta nueva o contactarnos.
        </p>
        <div className="space-y-3">
          <Link
            href="/registro"
            className="block w-full bg-[#1A3A6B] hover:bg-[#0f2548] text-white font-semibold rounded-xl py-3 text-sm transition-colors"
          >
            Crear cuenta nueva
          </Link>
          <Link
            href="/login"
            className="block w-full border border-gray-200 hover:bg-gray-50 text-gray-700 font-medium rounded-xl py-3 text-sm transition-colors"
          >
            Volver al inicio de sesión
          </Link>
        </div>
      </div>
    </div>
  );
}
