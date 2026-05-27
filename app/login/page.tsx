import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  description: "Accedé a tu cuenta de Specterlaws para ver tu historial de consultas legales.",
  alternates: { canonical: "https://specterlaws.cr/login" },
  robots: { index: false, follow: true },
};

export default function LoginPage() {
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
          <h1 className="text-2xl font-serif font-semibold text-white mb-1">Bienvenido de vuelta</h1>
          <p className="text-sm text-white/60">Iniciá sesión para continuar con tu asistente legal.</p>
        </div>

        <Suspense>
          <LoginForm />
        </Suspense>
      </div>

      <p className="mt-6 text-xs text-white/40 text-center max-w-sm">
        Al iniciar sesión aceptás los{" "}
        <span className="underline cursor-default">Términos de Servicio</span> y la{" "}
        <span className="underline cursor-default">Política de Privacidad</span> de Specterlaws.
      </p>
    </div>
  );
}
