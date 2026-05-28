"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const NAV_LINKS: { href: string; label: string; isRoute?: boolean }[] = [
  { href: "#documentos", label: "Documentos" },
  { href: "#como-funciona", label: "Cómo Funciona" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "/precios", label: "Precios", isRoute: true },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: session } = useSession();
  const autenticado = !!session?.user;

  useEffect(() => {
    let rafId = 0;
    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => setScrolled(window.scrollY > 8));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navClass = scrolled
    ? "bg-black shadow-[0_12px_40px_rgba(0,0,0,0.65)]"
    : "bg-black";

  const logoImg = (
    <img
      src="/logo-unificado.jpg?v=2"
      alt="Specterlaws"
      width={280}
      height={153}
      className="h-9 w-auto max-w-[130px] sm:max-w-none sm:h-14 md:h-16 object-contain"
    />
  );

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 lexcr-safe-top ${navClass}`}
      >
        {/* Desktop */}
        <div className="hidden md:block max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between gap-4 transition-all duration-300 ${scrolled ? "h-14" : "h-16 lg:h-20"}`}
          >
            <Link href="/" className="flex items-center shrink-0 px-2 sm:px-3">
              {logoImg}
            </Link>

            <div className="flex flex-1 items-center justify-between gap-4 min-w-0 pl-2">
              <div className="flex items-center gap-4 lg:gap-5 min-w-0 overflow-x-auto lexcr-mobile-scroll">
                {NAV_LINKS.map((link) =>
                  link.isRoute ? (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors whitespace-nowrap"
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors whitespace-nowrap"
                    >
                      {link.label}
                    </a>
                  )
                )}

                {autenticado ? (
                  <>
                    <Link
                      href="/perfil"
                      className="flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors whitespace-nowrap"
                    >
                      <span className="w-7 h-7 rounded-full bg-cr-blue/80 flex items-center justify-center text-white text-xs font-bold border border-white/10">
                        {session.user.name?.charAt(0).toUpperCase()}
                      </span>
                      {session.user.name?.split(" ")[0]}
                    </Link>
                    <button
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="text-sm text-white/50 hover:text-white/80 transition-colors whitespace-nowrap"
                    >
                      Salir
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="text-sm text-white/70 hover:text-white transition-colors whitespace-nowrap"
                    >
                      Iniciar sesión
                    </Link>
                    <Link
                      href="/registro"
                      className="text-sm font-medium text-white border border-white/20 hover:bg-white/10 px-4 py-2 rounded-full transition-colors whitespace-nowrap"
                    >
                      Registrarse
                    </Link>
                  </>
                )}
              </div>

              <div className="flex items-center shrink-0 pl-2">
                <Link
                  href="/chat"
                  className={`lexcr-btn-primary lexcr-btn-future ${!autenticado ? "lexcr-pulse" : ""} text-sm !min-h-[40px] !py-2 !px-5 !w-auto`}
                >
                  {autenticado ? "Consultar" : "Consulta Gratis"}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div className="md:hidden max-w-7xl mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between gap-2 h-14">
            <Link href="/" className="flex items-center shrink-0 min-w-0">
              {logoImg}
            </Link>

            <div className="flex items-center gap-1.5 shrink-0">
              <Link
                href="/chat"
                className="lexcr-btn-primary lexcr-btn-future text-xs sm:text-sm !min-h-[44px] !py-2 !px-3 sm:!px-4 !w-auto whitespace-nowrap"
              >
                <span className="hidden min-[400px]:inline">Consulta </span>Gratis
              </Link>
              <button
                type="button"
                className="lexcr-mobile-tap p-2.5 rounded-lg text-white/80 hover:bg-white/10 transition-colors border border-white/15 bg-white/5"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={menuOpen}
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
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            aria-label="Cerrar menú"
            onClick={() => setMenuOpen(false)}
          />
          <div
            className="absolute left-0 right-0 bottom-0 bg-black border-t border-white/10 overflow-y-auto overscroll-contain px-4 py-3 pb-[max(1.25rem,env(safe-area-inset-bottom))] flex flex-col gap-1"
            style={{ top: "calc(3.5rem + env(safe-area-inset-top, 0px))" }}
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) =>
                link.isRoute ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="lexcr-mobile-tap text-base text-white/85 py-3.5 border-b border-white/5"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="lexcr-mobile-tap text-base text-white/85 py-3.5 border-b border-white/5"
                  >
                    {link.label}
                  </a>
                )
              )}

              {autenticado ? (
                <>
                  <Link
                    href="/perfil"
                    onClick={() => setMenuOpen(false)}
                    className="lexcr-mobile-tap text-base text-white py-3.5 border-b border-white/5"
                  >
                    Mi perfil ({session.user.name?.split(" ")[0]})
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      signOut({ callbackUrl: "/" });
                    }}
                    className="lexcr-mobile-tap text-base text-white/60 py-3.5 text-left border-b border-white/5"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="lexcr-mobile-tap text-base text-white/85 py-3.5 border-b border-white/5"
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    href="/registro"
                    onClick={() => setMenuOpen(false)}
                    className="lexcr-mobile-tap text-base font-semibold text-white border border-white/20 px-5 py-3.5 rounded-full text-center mt-3"
                  >
                    Registrarse gratis
                  </Link>
                </>
              )}

              <Link
                href="/chat"
                onClick={() => setMenuOpen(false)}
                className="lexcr-btn-primary lexcr-btn-future lexcr-pulse text-center mt-4 !w-full"
              >
                {autenticado ? "Consultar ahora" : "Consulta Gratis"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
