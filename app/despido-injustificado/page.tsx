import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SeoPageLayout from "@/components/seo/SeoPageLayout";
import { LegalServiceSchema } from "@/components/seo/JsonLd";
import { buildCanonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Despido Injustificado en Costa Rica: Derechos y Prestaciones",
  description:
    "Si te despidieron sin justa causa en Costa Rica, conocé cuánto te deben pagar: preaviso, cesantía y vacaciones proporcionales. Calculá tus prestaciones con la ley vigente.",
  keywords: [
    "despido injustificado Costa Rica",
    "cesantía Costa Rica",
    "preaviso Costa Rica",
    "prestaciones laborales Costa Rica",
    "liquidación laboral Costa Rica",
    "Código de Trabajo despido",
  ],
  alternates: {
    canonical: buildCanonical("/despido-injustificado"),
    languages: { "es-CR": buildCanonical("/despido-injustificado") },
  },
  openGraph: {
    title: "Despido Injustificado en Costa Rica – Specterlaws",
    description:
      "¿Te despidieron sin justificación? Conocé tus derechos a preaviso, cesantía y vacaciones proporcionales según el Código de Trabajo costarricense.",
    url: buildCanonical("/despido-injustificado"),
    type: "article",
  },
};

const FAQS = [
  {
    question: "¿Qué es el despido injustificado en Costa Rica?",
    answer:
      "Es la terminación de la relación laboral por decisión del patrono sin que exista alguna de las causas justificadas listadas en el artículo 81 del Código de Trabajo (faltas graves, delitos, engaño al patrono, etc.). En ese caso, el trabajador tiene derecho a preaviso, cesantía y vacaciones proporcionales.",
  },
  {
    question: "¿Cuánto es el preaviso que me deben pagar?",
    answer:
      "Según el artículo 28 del Código de Trabajo: menos de 3 meses trabajados → 1 semana; 3 a 6 meses → 2 semanas; 6 meses a 1 año → 1 mes; más de 1 año → 1 mes. Si el patrono no da el preaviso, debe pagar en dinero el equivalente al salario de ese período.",
  },
  {
    question: "¿Cómo se calcula la cesantía en Costa Rica?",
    answer:
      "La cesantía se calcula usando el promedio del salario de los últimos 6 meses y los años trabajados: hasta 1 año → 7 días; de 1 a 2 años → 14 días; de 2 a 3 años → 19.5 días; de 3 a 4 años → 20 días; de 4 a 5 años → 20.5 días; hasta llegar a un máximo de 8 meses de salario a partir de los 20 años.",
  },
  {
    question: "¿Me pagan las vacaciones aunque me despidan?",
    answer:
      "Sí. Al terminar la relación laboral, el patrono debe pagar las vacaciones proporcionales al tiempo laborado en el período en curso, así como cualquier período de vacaciones completo no disfrutado. No importa si el despido es con o sin justa causa.",
  },
  {
    question: "¿Puedo demandar si me despidieron y no me pagaron las prestaciones?",
    answer:
      "Sí. Tenés un plazo de prescripción de 1 año desde el despido para presentar una demanda laboral ante los Juzgados de Trabajo. También podés interponer una denuncia ante la Inspección del MTSS para que citen al patrono y lo obliguen a pagar.",
  },
  {
    question: "¿Qué diferencia hay entre despido con causa y sin causa?",
    answer:
      "En el despido con justa causa (artículo 81 del Código de Trabajo), el patrono no paga preaviso ni cesantía si prueba la falta grave. En el despido sin justa causa debe pagar ambas prestaciones. En ambos casos debe pagar vacaciones proporcionales y aguinaldo proporcional.",
  },
];

export default function DespidoInjustificadoPage() {
  return (
    <>
      <LegalServiceSchema />
      <Navbar />
      <SeoPageLayout
        breadcrumb={{ name: "Despido Injustificado", slug: "despido-injustificado" }}
        hero={{
          badge: "Derecho Laboral · Prestaciones · Costa Rica",
          title: "Despido Injustificado en Costa Rica",
          subtitle:
            "Si te despidieron sin justa causa, la ley te protege. Conocé cuánto te deben pagar en preaviso, cesantía y vacaciones proporcionales.",
        }}
        intro={
          <>
            <p className="mb-3">
              El <strong className="text-white">Código de Trabajo de Costa Rica</strong> garantiza que ningún trabajador puede ser despedido sin que el patrono asuma las consecuencias económicas del cese. Si no existe una causa justa y probada, el patrono debe pagar todas las prestaciones laborales correspondientes.
            </p>
            <p>
              Calculá lo que te deben, conocé tus plazos para reclamar y entendé cuándo vale la pena acudir a los Tribunales de Trabajo o a la Inspección del MTSS.
            </p>
          </>
        }
        sections={[
          {
            title: "Causas justificadas de despido (artículo 81)",
            content: (
              <>
                <p>El patrono puede despedir <strong className="text-white">sin pago de preaviso ni cesantía</strong> solo si el trabajador incurre en: falta grave a los deberes del contrato, actos de violencia contra el patrono o compañeros, revelación de secretos, ausencias injustificadas por más de 3 días consecutivos, condena por delito que implique pérdida de libertad, entre otros.</p>
                <p className="mt-2">Cualquier causa no contemplada en el artículo 81 convierte el despido en injustificado.</p>
              </>
            ),
          },
          {
            title: "Prestaciones que te corresponden",
            content: (
              <ul className="list-disc list-inside space-y-2">
                <li><strong className="text-white">Preaviso:</strong> salario por el período establecido en el artículo 28 o equivalente en efectivo.</li>
                <li><strong className="text-white">Cesantía (auxilio de cesantía):</strong> indemnización proporcional a los años trabajados (artículos 29-31).</li>
                <li><strong className="text-white">Vacaciones proporcionales:</strong> días de vacaciones generados en el período en curso.</li>
                <li><strong className="text-white">Aguinaldo proporcional:</strong> parte del decimotercer salario desde diciembre anterior.</li>
                <li><strong className="text-white">Días no pagados:</strong> cualquier salario pendiente hasta la fecha de cese.</li>
              </ul>
            ),
          },
          {
            title: "Plazos para reclamar",
            content: (
              <p>Tenés <strong className="text-white">1 año desde el despido</strong> para presentar una demanda laboral (artículo 607 del Código de Trabajo). No esperés. Si el plazo vence, perdés el derecho a reclamar judicialmente. La Inspección del MTSS puede actuar antes, pero también tiene plazos.</p>
            ),
          },
          {
            title: "Despido de trabajadora embarazada o en lactancia",
            content: (
              <p>Es <strong className="text-white">nulo</strong> el despido de una trabajadora durante el embarazo o los 3 meses posteriores al parto, salvo que exista causa justa probada ante el MTSS. Si ocurrió, la trabajadora puede reclamar reinstalación inmediata y pago de salarios caídos.</p>
            ),
          },
        ]}
        faqs={FAQS}
        relatedLinks={[
          { label: "Derechos laborales", href: "/derechos-laborales" },
          { label: "Denuncia al MTSS", href: "/denuncia-mtss" },
          { label: "Accidente de trabajo", href: "/accidente-de-trabajo" },
        ]}
      />
    </>
  );
}
