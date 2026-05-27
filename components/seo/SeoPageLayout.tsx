import Link from "next/link";
import { BreadcrumbSchema, FaqSchema } from "./JsonLd";
import { SITE_URL } from "@/lib/seo";

type FaqItem = { question: string; answer: string };

type Props = {
  breadcrumb: { name: string; slug: string };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
  };
  intro: React.ReactNode;
  sections: {
    title: string;
    content: React.ReactNode;
  }[];
  faqs: FaqItem[];
  relatedLinks: { label: string; href: string }[];
};

export default function SeoPageLayout({
  breadcrumb,
  hero,
  intro,
  sections,
  faqs,
  relatedLinks,
}: Props) {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: "Inicio", url: SITE_URL },
          { name: breadcrumb.name, url: `${SITE_URL}/${breadcrumb.slug}` },
        ]}
      />
      <FaqSchema faqs={faqs} />

      <div className="min-h-screen">
        {/* Hero */}
        <section className="pt-28 pb-14 px-4 text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-cr-blue border border-cr-blue/30 rounded-full px-3 py-1 mb-4 lexcr-glass">
            {hero.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-semibold text-white max-w-3xl mx-auto leading-tight mb-4">
            {hero.title}
          </h1>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
            {hero.subtitle}
          </p>
          <Link
            href="/chat"
            className="inline-block bg-cr-blue hover:bg-cr-blue-light text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-colors lexcr-glow-blue"
          >
            Consultá gratis ahora →
          </Link>
        </section>

        {/* Content */}
        <div className="max-w-3xl mx-auto px-4 pb-16 space-y-10">
          {/* Intro */}
          <div className="lexcr-card rounded-2xl p-7 border border-white/10 text-white/75 leading-relaxed text-sm">
            {intro}
          </div>

          {/* Sections */}
          {sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-xl font-serif font-semibold text-white mb-3">{s.title}</h2>
              <div className="text-white/70 text-sm leading-relaxed space-y-2">{s.content}</div>
            </section>
          ))}

          {/* FAQ */}
          <section>
            <h2 className="text-xl font-serif font-semibold text-white mb-5">
              Preguntas frecuentes
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="lexcr-glass rounded-xl border border-white/10 group"
                >
                  <summary className="px-5 py-4 text-sm font-medium text-white cursor-pointer list-none flex items-center justify-between gap-3">
                    <span>{faq.question}</span>
                    <svg
                      className="w-4 h-4 text-white/40 flex-shrink-0 group-open:rotate-180 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="px-5 pb-4 text-sm text-white/60 leading-relaxed">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="lexcr-glass rounded-2xl p-7 border border-cr-blue/20 text-center">
            <h2 className="text-lg font-serif font-semibold text-white mb-2">
              ¿Tenés más preguntas?
            </h2>
            <p className="text-sm text-white/60 mb-5">
              Nuestro asistente legal con IA está disponible 24/7 para resolver tus dudas
              sobre las leyes de Costa Rica, sin costo.
            </p>
            <Link
              href="/chat"
              className="inline-block bg-cr-red hover:bg-cr-red-light text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors lexcr-glow-red"
            >
              Hacer una consulta gratis
            </Link>
          </section>

          {/* Related links */}
          {relatedLinks.length > 0 && (
            <nav aria-label="Temas relacionados">
              <h3 className="text-sm font-semibold text-white/50 uppercase tracking-widest mb-3">
                Temas relacionados
              </h3>
              <div className="flex flex-wrap gap-2">
                {relatedLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-xs text-cr-blue border border-cr-blue/30 rounded-full px-3 py-1.5 hover:bg-cr-blue/10 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </nav>
          )}
        </div>
      </div>
    </>
  );
}
