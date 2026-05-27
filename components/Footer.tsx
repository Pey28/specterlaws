export default function Footer() {
  return (
    <footer className="bg-[#1a1a2e] text-gray-400">
      {/* Top stripe */}
      <div className="h-1 bg-gradient-to-r from-[#003F87] via-[#CF142B] to-[#003F87]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex flex-col justify-center gap-[3px]">
                <span className="block w-5 h-1 rounded-sm bg-[#003F87]" />
                <span className="block w-5 h-1 rounded-sm bg-[#CF142B]" />
                <span className="block w-5 h-1 rounded-sm bg-[#003F87]" />
              </div>
              <span className="text-xl font-bold text-white">
                Lex<span className="text-[#CF142B]">CR</span>
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
                  className="inline-block bg-[#CF142B] hover:bg-[#a81022] text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
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
          <p className="text-center text-gray-500">
            LexCR brinda información orientativa y no constituye asesoría legal formal. Para casos complejos, consulte un abogado colegiado.
          </p>
        </div>
      </div>
    </footer>
  );
}
