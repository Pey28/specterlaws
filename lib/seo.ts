export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lexcr.cr";

export const SITE_NAME = "LexCR";

export const DEFAULT_DESCRIPTION =
  "Consulta legal gratuita con inteligencia artificial especializada en leyes de Costa Rica. Derechos laborales, despidos, pensiones alimentarias, accidentes de trabajo y más.";

export const DEFAULT_KEYWORDS = [
  "consulta legal Costa Rica",
  "abogado en línea Costa Rica",
  "derechos laborales Costa Rica",
  "ley laboral Costa Rica",
  "despido injustificado Costa Rica",
  "pensión alimentaria Costa Rica",
  "accidente de trabajo Costa Rica",
  "denuncia MTSS",
  "asistente legal IA Costa Rica",
];

export const OG_IMAGE_URL = `${SITE_URL}/opengraph-image`;

export function buildCanonical(path: string): string {
  return `${SITE_URL}${path}`;
}
