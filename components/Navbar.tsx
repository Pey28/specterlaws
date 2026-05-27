"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex flex-col justify-center gap-[3px]">
              <span className="block w-6 h-1.5 rounded-sm bg-[#003F87]" />
              <span className="block w-6 h-1.5 rounded-sm bg-[#CF142B]" />
              <span className="block w-6 h-1.5 rounded-sm bg-[#003F87]" />
            </div>
            <span className="text-2xl font-bold text-[#003F87]">
              Lex<span className="text-[#CF142B]">CR</span>
            </span>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#areas" className="text-sm font-medium text-gray-700 hover:text-[#003F87] transition-colors">
              Áreas Legales
            </a>
            <a href="#como-funciona" className="text-sm font-medium text-gray-700 hover:text-[#003F87] transition-colors">
              Cómo Funciona
            </a>
            <a href="#nosotros" className="text-sm font-medium text-gray-700 hover:text-[#003F87] transition-colors">
              Nosotros
            </a>
            <a
              href="#consultar"
              className="bg-[#CF142B] hover:bg-[#a81022] text-white text-sm font-semibold px-5 py-2 rounded-full transition-colors"
            >
              Consulta Gratis
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-[#003F87]"
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
          <div className="md:hidden pb-4 border-t border-gray-100 pt-2 flex flex-col gap-3">
            <a href="#areas" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700 py-2 hover:text-[#003F87]">
              Áreas Legales
            </a>
            <a href="#como-funciona" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700 py-2 hover:text-[#003F87]">
              Cómo Funciona
            </a>
            <a href="#nosotros" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700 py-2 hover:text-[#003F87]">
              Nosotros
            </a>
            <a
              href="#consultar"
              onClick={() => setMenuOpen(false)}
              className="bg-[#CF142B] text-white text-sm font-semibold px-5 py-2 rounded-full text-center"
            >
              Consulta Gratis
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
