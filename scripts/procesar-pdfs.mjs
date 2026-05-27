/**
 * Procesa PDFs de leyes descargados de SCIJ y los convierte a texto.
 *
 * USO:
 *   1. Descarga los PDFs de SCIJ y ponlos en /data/pdfs/
 *   2. Ejecuta: node scripts/procesar-pdfs.mjs
 *   3. Los archivos de texto se guardan en /data/leyes/
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const PDF_DIR = path.join(ROOT, "data", "pdfs");
const LEYES_DIR = path.join(ROOT, "data", "leyes");

async function procesarPDF(rutaPDF) {
  const { default: pdfParse } = await import("pdf-parse/lib/pdf-parse.js");
  const buffer = fs.readFileSync(rutaPDF);
  const data = await pdfParse(buffer);
  return data.text;
}

function limpiarTexto(texto) {
  return texto
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[^\S\n]+/g, " ")
    .trim();
}

async function main() {
  if (!fs.existsSync(PDF_DIR)) {
    console.log(`Creando directorio ${PDF_DIR}`);
    fs.mkdirSync(PDF_DIR, { recursive: true });
  }

  if (!fs.existsSync(LEYES_DIR)) {
    fs.mkdirSync(LEYES_DIR, { recursive: true });
  }

  const pdfs = fs.readdirSync(PDF_DIR).filter((f) => f.endsWith(".pdf"));

  if (pdfs.length === 0) {
    console.log("No hay PDFs en /data/pdfs/");
    console.log("Descarga las leyes de SCIJ (http://www.pgrweb.go.cr/scij/)");
    console.log("y ponlas en la carpeta /data/pdfs/ con nombres como:");
    console.log("  codigo-trabajo.pdf");
    console.log("  codigo-civil.pdf");
    console.log("  ley-7472-consumidor.pdf");
    console.log("  codigo-penal.pdf");
    console.log("  constitucion-politica.pdf");
    return;
  }

  console.log(`Procesando ${pdfs.length} PDF(s)...`);

  for (const pdf of pdfs) {
    const rutaPDF = path.join(PDF_DIR, pdf);
    const nombreSalida = pdf.replace(".pdf", ".txt");
    const rutaSalida = path.join(LEYES_DIR, nombreSalida);

    try {
      console.log(`Procesando: ${pdf}`);
      const texto = await procesarPDF(rutaPDF);
      const textoLimpio = limpiarTexto(texto);
      fs.writeFileSync(rutaSalida, textoLimpio, "utf-8");
      console.log(`✓ Guardado: ${nombreSalida} (${(textoLimpio.length / 1024).toFixed(1)} KB)`);
    } catch (err) {
      console.error(`✗ Error procesando ${pdf}:`, err.message);
    }
  }

  console.log("\n✓ Proceso completado. Reinicia el servidor para que tome efecto.");
}

main();
