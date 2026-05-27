"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();
  const autenticado = !!session?.user;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 lexcr-glass shadow-[0_10px_40px_rgba(0,0,0,0.55)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex flex-col justify-center gap-[3px]">
              <span className="block w-6 h-1.5 rounded-sm bg-cr-blue lexcr-glow-blue" />
              <span className="block w-6 h-1.5 rounded-sm bg-cr-red lexcr-glow-red" />
              <span className="block w-6 h-1.5 rounded-sm bg-cr-blue lexcr-glow-blue" />
            </div>
            <span className="text-2xl font-bold text-white">
              Lex<span className="text-cr-red">CR</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#areas" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              Áreas Legales
            </a>
            <a href="#documentos" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              Documentos
            </a>
            <a href="#como-funciona" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              Cómo Funciona
            </a>
            <a href="#nosotros" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              Nosotros
            </a>
            <Link href="/precios" className="text-sm font-medium text-white/70 hover:text-white transition-colors">
              Precios
            </Link>

            {autenticado ? (
              <>
                <Link
                  href="/perfil"
                  className="flex items-center gap-2 text-sm font-medium text-white hover:text-white transition-colors"
                >
                  <span className="w-7 h-7 rounded-full bg-cr-blue/80 flex items-center justify-center text-white text-xs font-bold border border-white/10">
                    {session.user.name?.charAt(0).toUpperCase()}
                  </span>
                  {session.user.name?.split(" ")[0]}
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text-sm font-medium text-white/55 hover:text-white/80 transition-colors"
                >
                  Salir
                </button>
                <Link
                  href="/chat"
                  className="bg-cr-red hover:bg-cr-red-light text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors lexcr-glow-red"
                >
                  Consultar
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/registro"
                  className="text-sm font-semibold text-white border border-white/20 hover:bg-white/5 px-4 py-1.5 rounded-full transition-colors"
                >
                  Registrarse
                </Link>
                <Link
                  href="/chat"
                  className="bg-cr-red hover:bg-cr-red-light text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors lexcr-glow-red"
                >
                  Consulta Gratis
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-white/80 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-white/10 pt-2 flex flex-col gap-3">
            <a href="#areas" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-white/70 py-2 hover:text-white">
              Áreas Legales
            </a>
            <a href="#documentos" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-white/70 py-2 hover:text-white">
              Documentos
            </a>
            <a href="#como-funciona" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-white/70 py-2 hover:text-white">
              Cómo Funciona
            </a>
            <a href="#nosotros" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-white/70 py-2 hover:text-white">
              Nosotros
            </a>
            <Link href="/precios" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-white/70 py-2 hover:text-white">
              Precios
            </Link>

            {autenticado ? (
              <>
                <Link
                  href="/perfil"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-white py-2"
                >
                  Mi perfil ({session.user.name?.split(" ")[0]})
                </Link>
                <button
                  onClick={() => { setMenuOpen(false); signOut({ callbackUrl: "/" }); }}
                  className="text-sm font-medium text-white/60 py-2 text-left"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-medium text-white/70 py-2 hover:text-white"
                >
                  Iniciar sesión
                </Link>
                <Link
                  href="/registro"
                  onClick={() => setMenuOpen(false)}
                  className="text-sm font-semibold text-white border border-white/20 px-5 py-2 rounded-full text-center"
                >
                  Registrarse gratis
                </Link>
              </>
            )}
            <Link
              href="/chat"
              onClick={() => setMenuOpen(false)}
              className="bg-cr-red hover:bg-cr-red-light text-white text-sm font-semibold px-5 py-2 rounded-full text-center transition-colors lexcr-glow-red"
            >
              {autenticado ? "Consultar" : "Consulta Gratis"}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
