import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SeoPageLayout from "@/components/seo/SeoPageLayout";
import { LegalServiceSchema } from "@/components/seo/JsonLd";
import { buildCanonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Derechos Laborales en Costa Rica",
  description:
    "Conocé tus derechos laborales en Costa Rica: salario mínimo, aguinaldo, vacaciones, horas extras, licencias y protección contra el despido injustificado según el Código de Trabajo.",
  keywords: [
    "derechos laborales Costa Rica",
    "Código de Trabajo Costa Rica",
    "salario mínimo Costa Rica",
    "aguinaldo Costa Rica",
    "vacaciones laborales Costa Rica",
    "horas extras Costa Rica",
  ],
  alternates: {
    canonical: buildCanonical("/derechos-laborales"),
    languages: { "es-CR": buildCanonical("/derechos-laborales") },
  },
  openGraph: {
    title: "Derechos Laborales en Costa Rica – LexCR",
    description:
      "Guía completa sobre tus derechos como trabajador: salario, vacaciones, aguinaldo, despido y más. Basado en el Código de Trabajo de Costa Rica.",
    url: buildCanonical("/derechos-laborales"),
    type: "article",
  },
};

const FAQS = [
  {
    question: "¿Cuántos días de vacaciones me corresponden por ley en Costa Rica?",
    answer:
      "Por cada 50 semanas de trabajo continuo con el mismo patrono, tenés derecho a un mínimo de 2 semanas de vacaciones pagadas (artículo 153 del Código de Trabajo). En la práctica, la mayoría de empresas otorgan entre 10 y 15 días hábiles por año.",
  },
  {
    question: "¿Cómo se calcula el aguinaldo en Costa Rica?",
    answer:
      "El aguinaldo equivale a un doceavo del total de salarios ordinarios y extraordinarios devengados entre el 1 de diciembre del año anterior y el 30 de noviembre del año en curso. Se paga en la primera quincena de diciembre (artículo 1 de la Ley N.° 2412).",
  },
  {
    question: "¿Qué son las horas extras y cómo se pagan?",
    answer:
      "Las horas extras son las trabajadas fuera de la jornada ordinaria legal (8 horas diarias o 48 semanales para jornada diurna). Se pagan con un recargo del 50% sobre el salario ordinario. No pueden exceder 12 horas diarias salvo causa de fuerza mayor.",
  },
  {
    question: "¿Qué es el preaviso en Costa Rica?",
    answer:
      "El preaviso es el aviso anticipado que debe darse al terminar una relación laboral. Su duración depende del tiempo trabajado: hasta 3 meses → 1 semana; entre 3 y 6 meses → 2 semanas; entre 6 y 12 meses → 1 mes; más de 1 año → 1 mes (artículo 28 del Código de Trabajo).",
  },
  {
    question: "¿Puedo ser despedido sin justa causa en Costa Rica?",
    answer:
      "Sí, el patrono puede despedir sin justa causa, pero debe pagar el preaviso (o su equivalente en dinero) y la cesantía correspondiente a los años trabajados. Si existiera motivo justificado (artículo 81 del Código de Trabajo), puede despedir sin pago de esas prestaciones.",
  },
  {
    question: "¿Qué es la cesantía y cuánto me corresponde?",
    answer:
      "La cesantía (auxilio de cesantía) es una indemnización que se calcula según los últimos salarios y los años de servicio. Para períodos hasta 1 año la base es 7 días de salario; aumenta hasta un máximo de 8 meses para más de 20 años. Se paga solo en despido sin justa causa o renuncia justificada.",
  },
];

export default function DerechosLaboralesPage() {
  return (
    <>
      <LegalServiceSchema />
      <Navbar />
      <SeoPageLayout
        breadcrumb={{ name: "Derechos Laborales", slug: "derechos-laborales" }}
        hero={{
          badge: "Derecho Laboral · Costa Rica",
          title: "Tus Derechos Laborales en Costa Rica",
          subtitle:
            "Todo lo que necesitás saber sobre el Código de Trabajo: salario, vacaciones, aguinaldo, horas extras y mucho más.",
        }}
        intro={
          <>
            <p className="mb-3">
              El <strong className="text-white">Código de Trabajo de Costa Rica</strong> (Ley N.° 2) protege a todos los trabajadores del sector privado. Conocer tus derechos es el primer paso para defenderlos.
            </p>
            <p>
              En LexCR podés consultar gratuitamente cualquier duda sobre tu relación laboral: contratos, salarios, jornadas, despidos, licencias, y más — con respuestas basadas en la legislación vigente.
            </p>
          </>
        }
        sections={[
          {
            title: "Jornada de trabajo y salario",
            content: (
              <>
                <p>La jornada ordinaria diurna es de <strong className="text-white">8 horas diarias y 48 semanales</strong>. La jornada nocturna (de 10 p.m. a 6 a.m.) no puede exceder 6 horas. La jornada mixta tiene un máximo de 7 horas.</p>
                <p>El <strong className="text-white">salario mínimo</strong> lo fija el Consejo Nacional de Salarios dos veces al año y varía según la categoría de trabajo. Ningún patrono puede pagar menos del mínimo legal correspondiente.</p>
              </>
            ),
          },
          {
            title: "Vacaciones y días feriados",
            content: (
              <>
                <p>Tenés derecho a <strong className="text-white">2 semanas de vacaciones pagadas</strong> por cada 50 semanas laboradas. Las vacaciones no se pueden compensar en dinero salvo al terminar la relación laboral.</p>
                <p>Costa Rica reconoce <strong className="text-white">9 feriados obligatorios</strong> al año (1 enero, Jueves y Viernes Santo, 11 abril, 1 mayo, 25 julio, 2 agosto, 15 setiembre, 25 diciembre). Los feriados trabajados se pagan doble.</p>
              </>
            ),
          },
          {
            title: "Aguinaldo (decimotercer salario)",
            content: (
              <p>El aguinaldo es <strong className="text-white">obligatorio</strong> para todo trabajador que haya laborado al menos 1 mes en el período de cálculo (diciembre a noviembre). Se calcula sumando todos los salarios ordinarios y extraordinarios del año y dividiéndolos entre 12. Se paga antes del 20 de diciembre.</p>
            ),
          },
          {
            title: "Licencias y permisos",
            content: (
              <>
                <p><strong className="text-white">Licencia de maternidad:</strong> 4 meses pagados (1 prenatal + 3 postnatal), cubiertos por la CCSS.</p>
                <p><strong className="text-white">Licencia de paternidad:</strong> 8 días hábiles remunerados al padre tras el nacimiento o adopción.</p>
                <p><strong className="text-white">Enfermedad:</strong> Con incapacidad de la CCSS, el patrono paga el 50% del salario los primeros 3 días; la CCSS asume el 60% a partir del cuarto día.</p>
              </>
            ),
          },
        ]}
        faqs={FAQS}
        relatedLinks={[
          { label: "Despido injustificado", href: "/despido-injustificado" },
          { label: "Accidente de trabajo", href: "/accidente-de-trabajo" },
          { label: "Denuncia al MTSS", href: "/denuncia-mtss" },
        ]}
      />
    </>
  );
}
