import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SeoPageLayout from "@/components/seo/SeoPageLayout";
import { LegalServiceSchema } from "@/components/seo/JsonLd";
import { buildCanonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Accidente de Trabajo en Costa Rica: Qué Hacer",
  description:
    "Si sufriste un accidente de trabajo en Costa Rica, conocé tus derechos: póliza del INS, incapacidades, indemnizaciones y cómo reportar el siniestro. Asesoría legal gratuita.",
  keywords: [
    "accidente de trabajo Costa Rica",
    "póliza INS Costa Rica",
    "riesgos del trabajo Costa Rica",
    "incapacidad laboral Costa Rica",
    "indemnización accidente laboral",
    "INS seguro trabajo",
  ],
  alternates: {
    canonical: buildCanonical("/accidente-de-trabajo"),
    languages: { "es-CR": buildCanonical("/accidente-de-trabajo") },
  },
  openGraph: {
    title: "Accidente de Trabajo en Costa Rica – Specterlaws",
    description:
      "¿Sufriste un accidente en el trabajo? Conocé el proceso con el INS, tus derechos a incapacidad e indemnización según la Ley de Riesgos del Trabajo.",
    url: buildCanonical("/accidente-de-trabajo"),
    type: "article",
  },
};

const FAQS = [
  {
    question: "¿Qué debo hacer inmediatamente después de un accidente de trabajo?",
    answer:
      "Notificá al patrono de inmediato (idealmente por escrito). El patrono está obligado a reportar el accidente al INS dentro de las 8 horas siguientes. Buscá atención médica en las clínicas del INS o del seguro de salud. Guardá todos los documentos médicos y partes de la policía si aplica.",
  },
  {
    question: "¿Cuánto tiempo tengo para reportar un accidente de trabajo al INS?",
    answer:
      "El trabajador puede reportarlo directamente al INS dentro de los 3 meses siguientes al accidente si el patrono no lo hizo. Sin embargo, se recomienda reportarlo el mismo día o al día siguiente para evitar problemas con la cobertura.",
  },
  {
    question: "¿Qué cubre la póliza de riesgos del trabajo del INS?",
    answer:
      "La póliza RT (Riesgos del Trabajo) cubre: atención médica completa, medicamentos, rehabilitación, subsidio por incapacidad temporal (60% del salario promedio), indemnización por incapacidad permanente parcial o total, y gastos de funeral en caso de muerte.",
  },
  {
    question: "¿Qué pasa si mi patrono no tenía póliza del INS?",
    answer:
      "El INS está obligado por ley a cubrir al trabajador accidentado aunque el patrono no haya pagado la póliza. Luego el INS cobra al patrono las prestaciones otorgadas más los recargos de ley. El trabajador nunca pierde sus derechos por omisión del empleador.",
  },
  {
    question: "¿Puedo ser despedido si estoy incapacitado por accidente de trabajo?",
    answer:
      "No. El artículo 79 del Código de Trabajo prohíbe despedir a un trabajador que esté gozando de incapacidad por riesgo del trabajo, a menos que exista una causa justa debidamente probada. Si te despiden en esas circunstancias, podés presentar una demanda por despido nulo.",
  },
  {
    question: "¿Cuánto es la indemnización por incapacidad permanente?",
    answer:
      "Se calcula según el porcentaje de incapacidad determinado por el INS y el salario promedio. Para incapacidad total permanente equivale a 7 años de salario. Para incapacidades parciales, el monto es proporcional al grado de limitación físico-funcional.",
  },
];

export default function AccidenteDeTrabajoPage() {
  return (
    <>
      <LegalServiceSchema />
      <Navbar />
      <SeoPageLayout
        breadcrumb={{ name: "Accidente de Trabajo", slug: "accidente-de-trabajo" }}
        hero={{
          badge: "Riesgos del Trabajo · INS · Costa Rica",
          title: "Accidente de Trabajo en Costa Rica",
          subtitle:
            "Conocé tus derechos ante un accidente laboral: póliza del INS, incapacidades, indemnizaciones y los pasos para proteger tu salud y tu futuro.",
        }}
        intro={
          <>
            <p className="mb-3">
              En Costa Rica, la <strong className="text-white">Ley de Riesgos del Trabajo (N.° 6727)</strong> obliga a todo patrono a asegurar a sus trabajadores con el <strong className="text-white">Instituto Nacional de Seguros (INS)</strong> mediante la póliza de Riesgos del Trabajo (RT).
            </p>
            <p>
              Si sufriste un accidente en tu lugar de trabajo o una enfermedad derivada de él, tenés derecho a cobertura médica completa, subsidio económico y posible indemnización — sin costo alguno para vos.
            </p>
          </>
        }
        sections={[
          {
            title: "¿Qué se considera accidente de trabajo?",
            content: (
              <>
                <p>Es todo evento súbito y violento que ocurra <strong className="text-white">por causa u ocasión del trabajo</strong>, o en el trayecto entre el domicilio y el trabajo (accidente in itinere). También se incluyen las <strong className="text-white">enfermedades profesionales</strong>: condiciones de salud causadas por la exposición prolongada a factores del ambiente laboral (químicos, ruido, postura, etc.).</p>
              </>
            ),
          },
          {
            title: "Proceso de reporte y atención",
            content: (
              <ol className="list-decimal list-inside space-y-2">
                <li>Notificá al patrono inmediatamente (conservá el comprobante).</li>
                <li>El patrono reporta al INS en un plazo de 8 horas.</li>
                <li>Acudí a la clínica del INS más cercana con tu cédula y el Aviso de Accidente.</li>
                <li>El INS abre un expediente y asigna médico tratante.</li>
                <li>Recibís el subsidio económico (60% del salario promedio) durante la incapacidad.</li>
                <li>Al cierre médico, el INS evalúa si existe incapacidad permanente.</li>
              </ol>
            ),
          },
          {
            title: "Subsidio e incapacidades",
            content: (
              <p>Desde el <strong className="text-white">primer día de incapacidad</strong> el INS paga el 60% del salario promedio de los últimos 6 meses. Si la incapacidad supera los 30 días, el porcentaje puede aumentar hasta el 100% según la gravedad del caso. El subsidio se deposita quincenalmente.</p>
            ),
          },
          {
            title: "Si el patrono se niega a reportar",
            content: (
              <p>El trabajador puede reportar directamente al INS. También puede acudir al <strong className="text-white">Ministerio de Trabajo y Seguridad Social (MTSS)</strong> o a la <strong className="text-white">Inspección de Trabajo</strong> para obligar al patrono a cumplir. Tenés hasta 3 meses para reclamar desde el accidente.</p>
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
