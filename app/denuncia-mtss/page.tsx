import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import SeoPageLayout from "@/components/seo/SeoPageLayout";
import { LegalServiceSchema } from "@/components/seo/JsonLd";
import { buildCanonical } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Cómo Poner una Denuncia en el MTSS Costa Rica",
  description:
    "Guía paso a paso para presentar una denuncia laboral ante el Ministerio de Trabajo y Seguridad Social (MTSS) de Costa Rica. Salarios no pagados, condiciones insalubres, hostigamiento y más.",
  keywords: [
    "denuncia MTSS",
    "denuncia laboral Costa Rica",
    "Ministerio de Trabajo Costa Rica",
    "inspección de trabajo Costa Rica",
    "incumplimiento laboral Costa Rica",
    "cómo denunciar al patrono Costa Rica",
  ],
  alternates: {
    canonical: buildCanonical("/denuncia-mtss"),
    languages: { "es-CR": buildCanonical("/denuncia-mtss") },
  },
  openGraph: {
    title: "Denuncia en el MTSS Costa Rica – LexCR",
    description:
      "¿Tu patrono incumple la ley? Conocé cómo presentar una denuncia ante el MTSS: salarios no pagados, jornadas ilegales, hostigamiento sexual y condiciones insalubres.",
    url: buildCanonical("/denuncia-mtss"),
    type: "article",
  },
};

const FAQS = [
  {
    question: "¿Qué tipo de denuncias puede atender el MTSS?",
    answer:
      "El MTSS atiende: falta de pago de salario o prestaciones; no pago de aguinaldo, vacaciones o cesantía; jornadas ilegales o trabajo sin contrato; falta de póliza del INS; condiciones insalubres o inseguras; hostigamiento sexual laboral; trabajo infantil; y cualquier incumplimiento del Código de Trabajo.",
  },
  {
    question: "¿Cómo presento una denuncia ante el MTSS?",
    answer:
      "Podés hacerlo: en persona en la Inspección de Trabajo regional más cercana (con cédula y documentación del caso); por correo electrónico a la Inspección correspondiente; o en línea a través del portal del MTSS (mtss.go.cr). La denuncia es gratuita y confidencial.",
  },
  {
    question: "¿Necesito abogado para poner una denuncia en el MTSS?",
    answer:
      "No. La denuncia ante el MTSS/Inspección de Trabajo no requiere representación legal. Podés presentarla personalmente. Sin embargo, si el proceso escala a un juicio laboral, se recomienda contratar asesoría legal.",
  },
  {
    question: "¿Qué pasa después de que presento la denuncia?",
    answer:
      "La Inspección de Trabajo notifica al patrono y programa una visita de inspección. El inspector verifica el cumplimiento. Si se confirma la infracción, el patrono recibe un apercibimiento para corregirla en un plazo determinado. Si no cumple, se levanta un informe para proceso sancionatorio o se remite al Ministerio Público si hay delito.",
  },
  {
    question: "¿Cuánto tiempo tarda el proceso de inspección?",
    answer:
      "El plazo varía según la complejidad del caso y la carga de trabajo de la Inspección. Generalmente la primera visita ocurre dentro de las 2 a 4 semanas. Para casos urgentes (trabajo infantil, riesgo inminente a la salud) la respuesta es más rápida.",
  },
  {
    question: "¿Me pueden despedir por poner una denuncia en el MTSS?",
    answer:
      "El despido como represalia por interponer una denuncia se considera un acto discriminatorio y puede impugnarse. El Código de Trabajo protege al trabajador que ejerza sus derechos. Si te despiden después de denunciar, guardá evidencia de la relación entre la denuncia y el despido para sustentar una demanda.",
  },
];

export default function DenunciaMtssPage() {
  return (
    <>
      <LegalServiceSchema />
      <Navbar />
      <SeoPageLayout
        breadcrumb={{ name: "Denuncia MTSS", slug: "denuncia-mtss" }}
        hero={{
          badge: "Inspección Laboral · MTSS · Costa Rica",
          title: "Cómo Poner una Denuncia en el MTSS",
          subtitle:
            "Si tu patrono incumple la ley laboral, tenés el derecho y la vía para denunciarlo. Te explicamos el proceso completo ante el Ministerio de Trabajo de Costa Rica.",
        }}
        intro={
          <>
            <p className="mb-3">
              El <strong className="text-white">Ministerio de Trabajo y Seguridad Social (MTSS)</strong> de Costa Rica, a través de su <strong className="text-white">Inspección de Trabajo</strong>, supervisa el cumplimiento del Código de Trabajo y demás leyes laborales. Cualquier trabajador puede presentar una denuncia de forma gratuita y confidencial.
            </p>
            <p>
              La Inspección tiene competencia para ordenar al patrono corregir las infracciones, cobrar multas y, en casos graves, remitir el expediente al Ministerio Público para proceso penal.
            </p>
          </>
        }
        sections={[
          {
            title: "¿Cuándo es conveniente denunciar al MTSS?",
            content: (
              <>
                <p>Es conveniente cuando existe un incumplimiento laboral claro y documentable: salarios no pagados, jornadas excesivas, falta de seguro social, condiciones peligrosas de trabajo, hostigamiento sexual. También es útil para crear un registro oficial antes de iniciar un proceso judicial.</p>
                <p className="mt-2">Si la situación requiere acción judicial (cobro de prestaciones, reinstalación), la denuncia ante el MTSS es complementaria pero no reemplaza la demanda en los Juzgados de Trabajo.</p>
              </>
            ),
          },
          {
            title: "Documentos que deberías llevar",
            content: (
              <ul className="list-disc list-inside space-y-2">
                <li>Cédula de identidad.</li>
                <li>Contrato de trabajo o cualquier documento que acredite la relación laboral.</li>
                <li>Comprobantes de salario (colillas, transferencias bancarias, mensajes).</li>
                <li>Registros de horario si alegás jornadas ilegales.</li>
                <li>Comunicaciones con el patrono (correos, mensajes de WhatsApp).</li>
                <li>Testigos: podés indicar nombres de compañeros que puedan corroborar los hechos.</li>
              </ul>
            ),
          },
          {
            title: "Hostigamiento sexual laboral",
            content: (
              <p>Las denuncias por <strong className="text-white">hostigamiento sexual</strong> se tramitan bajo la Ley N.° 7476. El empleador tiene la obligación de investigar internamente y sancionar al acosador. Si no lo hace, podés denunciar ante el MTSS o ante el INAMU (Instituto Nacional de las Mujeres). El denunciante tiene protección especial contra represalias.</p>
            ),
          },
          {
            title: "Oficinas regionales de la Inspección de Trabajo",
            content: (
              <p>Hay oficinas de Inspección en todas las capitales de provincia: <strong className="text-white">San José, Alajuela, Cartago, Heredia, Liberia (Guanacaste), Puntarenas y Limón</strong>. Horario habitual: lunes a viernes de 8 a.m. a 4 p.m. Verificá en el sitio oficial del MTSS (mtss.go.cr) la dirección exacta y opciones de cita previa.</p>
            ),
          },
        ]}
        faqs={FAQS}
        relatedLinks={[
          { label: "Derechos laborales", href: "/derechos-laborales" },
          { label: "Despido injustificado", href: "/despido-injustificado" },
          { label: "Accidente de trabajo", href: "/accidente-de-trabajo" },
          { label: "Pensión alimentaria", href: "/pension-alimentaria" },
        ]}
      />
    </>
  );
}
