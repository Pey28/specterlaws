import type { Metadata } from "next";
import Link from "next/link";
import RegistroForm from "@/components/auth/RegistroForm";

export const metadata: Metadata = {
  title: "Crear cuenta gratis",
  description:
    "Registrate en Specterlaws y accedé a consultas legales ilimitadas con IA. Sin costo inicial, sin tarjeta de crédito.",
  alternates: { canonical: "https://specterlaws.cr/registro" },
  robots: { index: false, follow: true },
};

export default function RegistroPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
        <div className="flex flex-col gap-[3px]">
          <span className="block w-5 h-0.5 rounded-sm bg-cr-blue/70 lexcr-glow-blue" />
          <span className="block w-5 h-0.5 rounded-sm bg-cr-red lexcr-glow-red" />
          <span className="block w-5 h-0.5 rounded-sm bg-cr-blue/70 lexcr-glow-blue" />
        </div>
        <span className="text-2xl font-bold text-white">
          Specter<span className="text-cr-red">laws</span>
        </span>
      </Link>

      {/* Card */}
      <div className="rounded-2xl w-full max-w-md p-8 lexcr-card border border-white/10">
        <div className="mb-6">
          <h1 className="text-2xl font-serif font-semibold text-white mb-1">Crear cuenta gratis</h1>
          <p className="text-sm text-white/60">
            Accedé a consultas ilimitadas y guardá tu historial legal.
          </p>
        </div>

        {/* Beneficios */}
        <div className="lexcr-glass rounded-xl p-4 mb-6 space-y-2 border border-cr-blue/20">
          {[
            "Consultas ilimitadas con la IA",
            "Historial completo de consultas",
            "Acceso a todas las leyes de Costa Rica",
          ].map((b) => (
            <div key={b} className="flex items-center gap-2 text-sm text-white/80">
              <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              {b}
            </div>
          ))}
        </div>

        <RegistroForm />
      </div>

      <p className="mt-6 text-xs text-white/40 text-center max-w-sm">
        Al registrarte aceptás los{" "}
        <span className="underline cursor-default">Términos de Servicio</span> y la{" "}
        <span className="underline cursor-default">Política de Privacidad</span> de Specterlaws.
      </p>
    </div>
  );
}
