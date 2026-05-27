export default function Footer() {
  return (
    <footer className="mt-auto text-white/55">
      {/* Top stripe */}
      <div className="h-px bg-gradient-to-r from-transparent via-cr-blue/70 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex flex-col justify-center gap-[3px]">
                <span className="block w-5 h-1 rounded-sm bg-cr-blue lexcr-glow-blue" />
                <span className="block w-5 h-1 rounded-sm bg-cr-red lexcr-glow-red" />
                <span className="block w-5 h-1 rounded-sm bg-cr-blue lexcr-glow-blue" />
              </div>
              <span className="text-xl font-bold text-white">
                Lex<span className="text-cr-red">CR</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Tu asistente legal inteligente, especializado en la legislación de Costa Rica.
            </p>
          </div>

          {/* Áreas */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Áreas Legales</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#areas" className="hover:text-white transition-colors">Derecho Laboral</a></li>
              <li><a href="#areas" className="hover:text-white transition-colors">Derecho Civil</a></li>
              <li><a href="#areas" className="hover:text-white transition-colors">Derecho Penal</a></li>
              <li><a href="#areas" className="hover:text-white transition-colors">Derecho del Consumidor</a></li>
            </ul>
          </div>

          {/* Instituciones */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Instituciones CR</h4>
            <ul className="space-y-2 text-sm">
              <li>Ministerio de Trabajo (MTSS)</li>
              <li>MEIC – Consumidor</li>
              <li>Poder Judicial</li>
              <li>Defensoría de los Habitantes</li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contacto</h4>
            <ul className="space-y-2 text-sm">
              <li>📍 San José, Costa Rica</li>
              <li>📧 hola@lexcr.cr</li>
              <li className="pt-2">
                <a
                  href="#consultar"
                  className="inline-block bg-cr-red hover:bg-cr-red-light text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors lexcr-glow-red"
                >
                  Consulta Gratis
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} LexCR. Todos los derechos reservados.</p>
          <p className="text-center text-white/40">
            LexCR brinda información orientativa y no constituye asesoría legal formal. Para casos complejos, consulte un abogado colegiado.
          </p>
        </div>
      </div>
    </footer>
  );
}
