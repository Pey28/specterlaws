"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();
  const autenticado = !!session?.user;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navClass = scrolled
    ? "lexcr-glass border-b border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
    : "bg-transparent border-b border-transparent";

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navClass}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between gap-2 transition-all duration-300 ${scrolled ? "h-14" : "h-16"}`}>
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <div className="flex flex-col justify-center gap-[2px]">
                <span className="block w-5 sm:w-6 h-[3px] rounded-sm bg-[#0f4fa8] shadow-[0_0_10px_rgba(15,79,168,0.55)]" />
                <span className="block w-5 sm:w-6 h-[2px] rounded-sm bg-white/95" />
                <span className="block w-5 sm:w-6 h-[3px] rounded-sm bg-[#ce1126] shadow-[0_0_10px_rgba(206,17,38,0.45)]" />
                <span className="block w-5 sm:w-6 h-[2px] rounded-sm bg-white/95" />
                <span className="block w-5 sm:w-6 h-[3px] rounded-sm bg-[#0f4fa8] shadow-[0_0_10px_rgba(15,79,168,0.55)]" />
              </div>
              <span className="text-xl sm:text-[1.65rem] font-semibold text-white tracking-[-0.02em] drop-shadow-[0_0_16px_rgba(15,79,168,0.3)]">
                Specter<span className="text-[#ce1126]">laws</span>
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-5">
              <a href="#areas" className="text-sm text-white/65 hover:text-white transition-colors">
                Áreas Legales
              </a>
              <a href="#documentos" className="text-sm text-white/65 hover:text-white transition-colors">
                Documentos
              </a>
              <a href="#como-funciona" className="text-sm text-white/65 hover:text-white transition-colors">
                Cómo Funciona
              </a>
              <a href="#nosotros" className="text-sm text-white/65 hover:text-white transition-colors">
                Nosotros
              </a>
              <Link href="/precios" className="text-sm text-white/65 hover:text-white transition-colors">
                Precios
              </Link>

              {autenticado ? (
                <>
                  <Link
                    href="/perfil"
                    className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
                  >
                    <span className="w-7 h-7 rounded-full bg-cr-blue/80 flex items-center justify-center text-white text-xs font-bold border border-white/10">
                      {session.user.name?.charAt(0).toUpperCase()}
                    </span>
                    {session.user.name?.split(" ")[0]}
                  </Link>
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="text-sm text-white/50 hover:text-white/80 transition-colors"
                  >
                    Salir
                  </button>
                  <Link href="/chat" className="lexcr-btn-primary text-sm !min-h-[40px] !py-2 !px-5">
                    Consultar
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-sm text-white/65 hover:text-white transition-colors">
                    Iniciar sesión
                  </Link>
                  <Link
                    href="/registro"
                    className="text-sm font-medium text-white border border-white/20 hover:bg-white/5 px-4 py-2 rounded-full transition-colors"
                  >
                    Registrarse
                  </Link>
                  <Link href="/chat" className="lexcr-btn-primary lexcr-btn-future lexcr-pulse text-sm !min-h-[40px] !py-2 !px-5">
                    Consulta Gratis
                  </Link>
                </>
              )}
            </div>

            <div className="md:hidden flex items-center gap-2">
              <Link href="/chat" className="lexcr-btn-primary lexcr-btn-future text-sm !min-h-[44px] !py-2 !px-4 whitespace-nowrap">
                Consulta Gratis
              </Link>
              <button
                className="lexcr-mobile-tap p-2.5 rounded-lg text-white/80 hover:bg-white/10 transition-colors border border-white/15 bg-white/5"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Menú"
                aria-expanded={menuOpen}
              >
                <svg
                  className={`w-6 h-6 transition-transform duration-300 ${menuOpen ? "rotate-90" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {menuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            aria-label="Cerrar menú"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute top-16 left-0 right-0 lexcr-glass border-b border-white/10 px-5 pt-4 pb-6 flex flex-col gap-1 animate-[lexcr-fade-up_0.28s_ease-out]">
            <a href="#areas" onClick={() => setMenuOpen(false)} className="lexcr-mobile-tap text-base text-white/80 py-3 border-b border-white/5">
              Áreas Legales
            </a>
            <a href="#documentos" onClick={() => setMenuOpen(false)} className="lexcr-mobile-tap text-base text-white/80 py-3 border-b border-white/5">
              Documentos
            </a>
            <a href="#como-funciona" onClick={() => setMenuOpen(false)} className="lexcr-mobile-tap text-base text-white/80 py-3 border-b border-white/5">
              Cómo Funciona
            </a>
            <a href="#nosotros" onClick={() => setMenuOpen(false)} className="lexcr-mobile-tap text-base text-white/80 py-3 border-b border-white/5">
              Nosotros
            </a>
            <Link href="/precios" onClick={() => setMenuOpen(false)} className="lexcr-mobile-tap text-base text-white/80 py-3 border-b border-white/5">
              Precios
            </Link>

            {autenticado ? (
              <>
                <Link href="/perfil" onClick={() => setMenuOpen(false)} className="lexcr-mobile-tap text-base text-white py-3">
                  Mi perfil ({session.user.name?.split(" ")[0]})
                </Link>
                <button
                  onClick={() => { setMenuOpen(false); signOut({ callbackUrl: "/" }); }}
                  className="lexcr-mobile-tap text-base text-white/60 py-3 text-left"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMenuOpen(false)} className="lexcr-mobile-tap text-base text-white/80 py-3">
                  Iniciar sesión
                </Link>
                <Link
                  href="/registro"
                  onClick={() => setMenuOpen(false)}
                  className="lexcr-mobile-tap text-base font-semibold text-white border border-white/20 px-5 py-3 rounded-full text-center mt-2"
                >
                  Registrarse gratis
                </Link>
              </>
            )}
            {autenticado && (
              <Link
                href="/chat"
                onClick={() => setMenuOpen(false)}
                className="lexcr-btn-primary lexcr-btn-future lexcr-pulse text-center mt-4"
              >
                Consultar
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
