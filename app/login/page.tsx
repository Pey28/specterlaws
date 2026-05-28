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
    <div className="min-h-[100dvh] flex flex-col items-center justify-center px-4 py-8 sm:py-12 pb-[max(2rem,env(safe-area-inset-bottom))]">
      {/* Logo */}
      <Link href="/" className="flex items-center mb-8 hover:opacity-80 transition-opacity">
        <img src="/logo.png" alt="Specterlaws" className="h-12 w-auto object-contain" />
      </Link>

      {/* Card */}
      <div className="rounded-2xl w-full max-w-md p-6 sm:p-8 lexcr-card border border-white/10">
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
