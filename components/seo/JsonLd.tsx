import { SITE_URL, SITE_NAME } from "@/lib/seo";

type JsonLdProps = {
  data: Record<string, unknown> | Record<string, unknown>[];
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LegalServiceSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "LegalService",
        name: SITE_NAME,
        url: SITE_URL,
        description:
          "Plataforma de inteligencia artificial especializada en derecho costarricense. Consultas legales gratuitas sobre derechos laborales, familia, penal y más.",
        areaServed: {
          "@type": "Country",
          name: "Costa Rica",
        },
        serviceType: [
          "Consulta legal en línea",
          "Asesoría laboral",
          "Derecho de familia",
          "Derecho penal",
        ],
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "CRC",
          description: "3 consultas gratuitas por mes",
        },
        potentialAction: {
          "@type": "UseAction",
          target: `${SITE_URL}/chat`,
          name: "Consultar gratis",
        },
      }}
    />
  );
}

export function OrganizationSchema() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/icon.png`,
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer support",
          availableLanguage: "Spanish",
          areaServed: "CR",
        },
        sameAs: [],
      }}
    />
  );
}

type BreadcrumbItem = { name: string; url: string };

export function BreadcrumbSchema({ items }: { items: BreadcrumbItem[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: item.url,
        })),
      }}
    />
  );
}

type FaqItem = { question: string; answer: string };

export function FaqSchema({ faqs }: { faqs: FaqItem[] }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      }}
    />
  );
}
