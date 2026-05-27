/**
 * Scraper de SCIJ usando los campos reales del formulario de búsqueda.
 * USO: node scripts/scraper-scij.mjs
 */

import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LEYES_DIR = path.join(__dirname, "..", "data", "leyes");

const LEYES_OBJETIVO = [
  { nombre: "codigo-trabajo",        numero: "2",    titulo: "Código de Trabajo" },
  { nombre: "codigo-civil",          numero: "63",   titulo: "Código Civil" },
  { nombre: "codigo-penal",          numero: "4573", titulo: "Código Penal" },
  { nombre: "ley-7472-consumidor",   numero: "7472", titulo: "Ley de Protección al Consumidor" },
  { nombre: "ley-6727-riesgos",      numero: "6727", titulo: "Ley de Riesgos del Trabajo" },
  { nombre: "ley-7527-arrendamiento",numero: "7527", titulo: "Ley de Arrendamientos Urbanos" },
  { nombre: "constitucion-politica", numero: "1",    titulo: "Constitución Política" },
];

const HOME_URL   = "https://www.pgrweb.go.cr/scij/";
const SEARCH_URL = "https://www.pgrweb.go.cr/scij/Busqueda/Normativa/Normas/nrm_busqueda.aspx";

const BROWSER_CTX = {
  userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  viewport: { width: 1280, height: 900 },
  locale: "es-CR",
};

function limpiar(texto) {
  return texto
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/^\s+|\s+$/gm, "")
    .trim();
}

async function extraerTextoCompleto(page) {
  // Buscar el botón/link "Texto Completo" y hacer click
  const linkTexto = page.locator('a:has-text("Texto completo"), a:has-text("Texto Completo")').first();
  if (await linkTexto.isVisible({ timeout: 3000 }).catch(() => false)) {
    await linkTexto.click();
    await page.waitForTimeout(3000);
  }

  // Extraer texto del contenedor principal
  return await page.evaluate(() => {
    ["script", "style", "nav", "header", "footer", ".menu"].forEach((s) => {
      document.querySelectorAll(s).forEach((el) => el.remove());
    });

    for (const sel of [
      "#divTexto", ".contenidoTexto", ".textoNorma",
      "#TextoCompleto", "#contenido", "main", "body",
    ]) {
      const el = document.querySelector(sel);
      if (el?.innerText?.trim().length > 1000) return el.innerText;
    }
    return document.body.innerText;
  });
}

async function descargarLey(page, ley) {
  // 1. Ir al home para establecer sesión
  await page.goto(HOME_URL, { waitUntil: "networkidle", timeout: 20000 });
  await page.waitForTimeout(1500);

  // 2. Ir al formulario de búsqueda
  await page.goto(SEARCH_URL, { waitUntil: "networkidle", timeout: 20000 });
  await page.waitForTimeout(2000);

  // 3. Llenar el campo "Consulta" con el número de ley y buscar solo en ficha
  const campo = page.locator('[name="_ctl0:_ctl0:ContentPlaceHolder1:txtConsulta"]');
  await campo.fill(ley.numero);

  // Seleccionar criterio "Ficha del documento"
  const radioFicha = page.locator('[name="_ctl0:_ctl0:ContentPlaceHolder1:Criterio"]').first();
  await radioFicha.check().catch(() => {});

  // 4. Hacer click en Buscar
  await page.locator('[name="_ctl0:_ctl0:ContentPlaceHolder1:btnBuscar"]').click();
  await page.waitForTimeout(3000);

  // 5. Buscar el resultado que coincida con el número de ley exacto
  const filas = page.locator("table tr, .resultadoBusqueda, .resultado");
  const count = await filas.count().catch(() => 0);
  console.log(`  Resultados encontrados: ${count}`);

  // Buscar link que contenga el título o número de ley
  const linkResultado = page.locator(`a:has-text("${ley.titulo}"), a:has-text("N° ${ley.numero}"), a:has-text("Ley ${ley.numero}")`).first();

  if (await linkResultado.isVisible({ timeout: 3000 }).catch(() => false)) {
    await linkResultado.click();
  } else {
    // Tomar el primer link de resultado de la tabla
    const primerLink = page.locator("table td a, .resultados a").first();
    if (await primerLink.isVisible({ timeout: 2000 }).catch(() => false)) {
      const texto = await primerLink.innerText();
      console.log(`  Primer resultado: "${texto.trim().slice(0, 60)}"`);
      await primerLink.click();
    } else {
      throw new Error("No se encontraron resultados");
    }
  }

  await page.waitForTimeout(2000);
  return await extraerTextoCompleto(page);
}

async function main() {
  if (!fs.existsSync(LEYES_DIR)) fs.mkdirSync(LEYES_DIR, { recursive: true });

  console.log("🚀 Iniciando scraper SCIJ (versión corregida)\n");

  const browser = await chromium.launch({ headless: true });
  const ctx = await browser.newContext(BROWSER_CTX);
  const page = await ctx.newPage();

  let ok = 0, fail = 0;

  for (const ley of LEYES_OBJETIVO) {
    const salida = path.join(LEYES_DIR, `${ley.nombre}.txt`);
    console.log(`📖 ${ley.titulo} (Ley N°${ley.numero})`);

    if (fs.existsSync(salida) && fs.statSync(salida).size > 50000) {
      console.log(`  ✓ Ya existe (${(fs.statSync(salida).size / 1024).toFixed(0)} KB)\n`);
      ok++; continue;
    }

    try {
      const texto = await descargarLey(page, ley);
      const limpio = limpiar(texto);

      if (limpio.length < 5000) {
        console.log(`  ⚠️  Texto insuficiente (${limpio.length} chars)\n`);
        fail++; continue;
      }

      const header = `=== ${ley.titulo.toUpperCase()} ===\nFuente: SCIJ - pgrweb.go.cr/scij\nDescargado: ${new Date().toLocaleDateString("es-CR")}\n\n`;
      fs.writeFileSync(salida, header + limpio, "utf-8");
      console.log(`  ✓ ${ley.nombre}.txt — ${(limpio.length / 1024).toFixed(0)} KB\n`);
      ok++;
      await page.waitForTimeout(2500);
    } catch (err) {
      console.error(`  ✗ ${err.message}\n`);
      fail++;
    }
  }

  await browser.close();
  console.log("─".repeat(45));
  console.log(`✅ ${ok} exitosas  |  ❌ ${fail} fallidas`);
  if (ok > 0) console.log("\nReiniciá el servidor: npm run dev");
}

main().catch(console.error);
