import fs from "fs";
import path from "path";

type Chunk = {
  fuente: string;
  articulo: string;
  texto: string;
  score: number;
};

const LEYES_DIR = path.join(process.cwd(), "data", "leyes");

function cargarLeyes(): Chunk[] {
  const chunks: Chunk[] = [];

  if (!fs.existsSync(LEYES_DIR)) return chunks;

  const archivos = fs.readdirSync(LEYES_DIR).filter((f) => f.endsWith(".txt"));

  for (const archivo of archivos) {
    const contenido = fs.readFileSync(path.join(LEYES_DIR, archivo), "utf-8");
    const fuente = archivo.replace(".txt", "").replace(/-/g, " ").toUpperCase();

    // Split por artículos (líneas que empiezan con ARTÍCULO o ---)
    const secciones = contenido.split(/\n(?=ARTÍCULO|\-\-\-)/);

    for (const seccion of secciones) {
      const lineas = seccion.trim().split("\n");
      const encabezado = lineas[0].trim();
      const texto = seccion.trim();

      if (texto.length < 30) continue;

      chunks.push({
        fuente,
        articulo: encabezado,
        texto,
        score: 0,
      });
    }
  }

  return chunks;
}

function normalizar(texto: string): string {
  return texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^\w\s]/g, " ");
}

function calcularScore(chunk: Chunk, keywords: string[]): number {
  const textoNorm = normalizar(chunk.texto);
  let score = 0;

  for (const kw of keywords) {
    const kwNorm = normalizar(kw);
    if (kwNorm.length < 3) continue;

    // Coincidencia exacta pesa más
    const exactas = (textoNorm.match(new RegExp(`\\b${kwNorm}\\b`, "g")) || []).length;
    score += exactas * 3;

    // Coincidencia parcial
    if (textoNorm.includes(kwNorm)) score += 1;
  }

  return score;
}

// Palabras clave por tema para mejorar el contexto
const SINONIMOS: Record<string, string[]> = {
  despido: ["despedir", "despido", "terminacion", "cesantia", "liquidacion", "preaviso"],
  salario: ["salario", "sueldo", "pago", "remuneracion", "aguinaldo"],
  vacaciones: ["vacaciones", "descanso", "licencia"],
  jornada: ["jornada", "horas", "horario", "trabajo", "horas extra", "overtime"],
  contrato: ["contrato", "acuerdo", "relacion laboral"],
  consumidor: ["consumidor", "garantia", "devolucion", "producto", "compra", "meic"],
  arrendamiento: ["arrendamiento", "alquiler", "inquilino", "arrendatario", "desahucio"],
  herencia: ["herencia", "sucesion", "heredero", "fallecio", "muerto", "bienes"],
  pension: ["pension", "alimentos", "alimentaria", "hijos", "manutension"],
  violencia: ["violencia", "agresion", "golpe", "maltrato", "domestica"],
  robo: ["robo", "hurto", "robar", "stolen", "apropiacion"],
  estafa: ["estafa", "fraude", "engano", "timo"],
  detencion: ["detenido", "detencion", "preso", "arrestado", "capturado"],
};

function expandirKeywords(consulta: string): string[] {
  const palabras = normalizar(consulta).split(/\s+/).filter((p) => p.length > 3);
  const expandidas = new Set(palabras);

  for (const [tema, syns] of Object.entries(SINONIMOS)) {
    const coincide = palabras.some(
      (p) => syns.some((s) => s.includes(p) || p.includes(s)) || tema.includes(p)
    );
    if (coincide) {
      syns.forEach((s) => expandidas.add(s));
    }
  }

  return Array.from(expandidas);
}

export function buscarArticulos(consulta: string, topN = 5): string {
  const chunks = cargarLeyes();
  if (chunks.length === 0) return "";

  const keywords = expandirKeywords(consulta);

  const scored = chunks
    .map((chunk) => ({ ...chunk, score: calcularScore(chunk, keywords) }))
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);

  if (scored.length === 0) return "";

  return (
    "=== ARTÍCULOS RELEVANTES DE LA LEGISLACIÓN COSTARRICENSE ===\n\n" +
    scored
      .map((c) => `[${c.fuente}]\n${c.texto}`)
      .join("\n\n---\n\n")
  );
}
