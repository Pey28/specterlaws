import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SeoPageLayout from "@/components/seo/SeoPageLayout";
import { LegalServiceSchema } from "@/components/seo/JsonLd";
import { buildCanonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Pensión Alimentaria en Costa Rica: Guía Completa",
  description:
    "Cómo pedir o reclamar pensión alimentaria en Costa Rica: quién tiene derecho, cómo se calcula el monto, dónde presentar la demanda y qué pasa si no la pagan.",
  keywords: [
    "pensión alimentaria Costa Rica",
    "alimentos hijos Costa Rica",
    "demanda pensión alimentaria",
    "Ley de Pensiones Alimentarias Costa Rica",
    "cuánto es la pensión alimentaria",
    "obligado alimentario Costa Rica",
  ],
  alternates: {
    canonical: buildCanonical("/pension-alimentaria"),
    languages: { "es-CR": buildCanonical("/pension-alimentaria") },
  },
  openGraph: {
    title: "Pensión Alimentaria en Costa Rica – LexCR",
    description:
      "Guía completa sobre pensión alimentaria: quién debe pagarla, cómo se calcula, dónde demandar y qué ocurre si el obligado no paga.",
    url: buildCanonical("/pension-alimentaria"),
    type: "article",
  },
};

const FAQS = [
  {
    question: "¿Quiénes tienen derecho a pensión alimentaria en Costa Rica?",
    answer:
      "Según la Ley de Pensiones Alimentarias (N.° 7654), tienen derecho los hijos menores de edad; hijos mayores de edad con discapacidad o que estudian (hasta los 25 años); el cónyuge o conviviente en unión de hecho; los ascendientes (padres, abuelos) que no puedan mantenerse por sí mismos.",
  },
  {
    question: "¿Cómo se calcula el monto de la pensión?",
    answer:
      "El juez determina el monto según los ingresos del obligado y las necesidades del beneficiario. Como referencia mínima se usa el 25% del salario neto del obligado para un hijo menor. Si hay varios hijos, el porcentaje se distribuye equitativamente. También pueden fijarse alimentos provisionales mientras dura el proceso.",
  },
  {
    question: "¿Dónde presento la demanda de pensión alimentaria?",
    answer:
      "Ante el Juzgado de Pensiones Alimentarias del cantón donde reside el beneficiario. En el Poder Judicial podés encontrar el juzgado correspondiente. No necesitás abogado para presentar la demanda inicial, aunque se recomienda asesoría. También podés hacer la gestión en el Sistema de Gestión en Línea del Poder Judicial.",
  },
  {
    question: "¿Qué pasa si el obligado no paga la pensión?",
    answer:
      "Si el obligado no paga, podés solicitar al juzgado el apercibimiento de apremio corporal (arresto). El juez puede ordenar su detención hasta por 1 mes si está en mora de 3 o más cuotas. También puede ordenarse el descuento directo del salario del obligado desde el patrono.",
  },
  {
    question: "¿Se puede modificar el monto de la pensión?",
    answer:
      "Sí. Cualquiera de las partes puede pedir la revisión cuando cambien las circunstancias económicas (aumento o disminución de ingresos) o las necesidades del beneficiario (enfermedad, estudios). El proceso se llama 'gestión de variación de pensión alimentaria'.",
  },
  {
    question: "¿La pensión aplica para hijos no reconocidos?",
    answer:
      "Sí. Si el padre/madre no reconoció al hijo, primero debe tramitarse la filiación ante el Registro Civil o mediante un proceso judicial. Una vez establecida la filiación, puede exigirse la pensión alimentaria. El proceso de reconocimiento puede tramitarse en paralelo.",
  },
];

export default function PensionAlimentariaPage() {
  return (
    <>
      <LegalServiceSchema />
      <Navbar />
      <SeoPageLayout
        breadcrumb={{ name: "Pensión Alimentaria", slug: "pension-alimentaria" }}
        hero={{
          badge: "Derecho de Familia · Alimentos · Costa Rica",
          title: "Pensión Alimentaria en Costa Rica",
          subtitle:
            "Conocé quién tiene derecho, cómo se calcula el monto y qué pasos seguir para cobrar o pagar una pensión alimentaria según la ley costarricense.",
        }}
        intro={
          <>
            <p className="mb-3">
              La <strong className="text-white">Ley de Pensiones Alimentarias N.° 7654</strong> de Costa Rica establece que toda persona que dependa económicamente de otra tiene derecho a recibir una contribución para su sustento, habitación, vestido, educación y salud.
            </p>
            <p>
              El proceso puede iniciarse sin abogado, aunque para casos complejos o en disputas sobre el monto se recomienda asesoría legal. LexCR puede orientarte sobre los pasos concretos para tu situación.
            </p>
          </>
        }
        sections={[
          {
            title: "¿Quién está obligado a pagar alimentos?",
            content: (
              <p>La obligación recae en el siguiente orden: <strong className="text-white">padres → hijos → hermanos → abuelos → bisabuelos</strong>. Si el obligado principal no puede cumplir, la obligación pasa al siguiente en la lista. Los padrastros y madrastras también pueden tener obligación si el menor dependía económicamente de ellos.</p>
            ),
          },
          {
            title: "Proceso judicial para establecer la pensión",
            content: (
              <ol className="list-decimal list-inside space-y-2">
                <li>Presentar la demanda en el Juzgado de Pensiones Alimentarias competente.</li>
                <li>El juzgado fija alimentos provisionales dentro de los 3 días hábiles.</li>
                <li>Se notifica al obligado y se le da plazo para contestar.</li>
                <li>Audiencia para presentar pruebas (recibos de salario, declaración de renta).</li>
                <li>Resolución del juez que fija la pensión definitiva.</li>
                <li>Si el obligado no paga → apercibimiento de apremio corporal.</li>
              </ol>
            ),
          },
          {
            title: "Descuento directo del salario",
            content: (
              <p>El juez puede ordenar al patrono del obligado que descuente la pensión directamente del salario y la deposite en la cuenta del beneficiario. El patrono que no cumpla la orden puede ser sancionado. Esta medida es muy efectiva cuando el obligado tiene empleo formal.</p>
            ),
          },
          {
            title: "Alimentos provisionales",
            content: (
              <p>Desde que presentás la demanda, el juzgado puede fijar <strong className="text-white">alimentos provisionales</strong> en un plazo muy corto. Esto garantiza que el beneficiario no quede desprotegido mientras dura el proceso. El monto provisional puede ajustarse en la resolución definitiva.</p>
            ),
          },
        ]}
        faqs={FAQS}
        relatedLinks={[
          { label: "Derechos laborales", href: "/derechos-laborales" },
          { label: "Despido injustificado", href: "/despido-injustificado" },
          { label: "Denuncia al MTSS", href: "/denuncia-mtss" },
        ]}
      />
    </>
  );
}
