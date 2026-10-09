/**
 * CLI PDF export for flowing paper documents (rendered by PaperViewer).
 * Usage: node scripts/export-paper.js [doc-key] [output-path]
 *   e.g. node scripts/export-paper.js stigmergic-project-delivery
 *
 * Starts a Vite dev server, opens /?doc=<key> in headless Chromium, and uses
 * Puppeteer's native page.pdf() to generate a real PDF with selectable,
 * searchable text and clickable links, using the paper's own @page/A4 print CSS.
 *
 * Default output: ./<doc-key>.pdf
 */

import puppeteer from 'puppeteer';
import { createServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PORT = 5198;

/** Prefer a working system Chromium (Chrome/Edge) over Puppeteer's bundled build,
 *  which can fail to start on machines missing the matching VC++ runtime. */
function resolveBrowser() {
  const candidates = [
    process.env.PUPPETEER_EXECUTABLE_PATH,
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  ].filter(Boolean);
  return candidates.find((p) => fs.existsSync(p)); // undefined => use Puppeteer's own
}

async function main() {
  const docKey = process.argv[2] ?? 'stigmergic-project-delivery';
  const outputArg = process.argv[3];
  const outputPath = outputArg
    ? path.resolve(process.cwd(), outputArg)
    : path.resolve(ROOT, `${docKey}.pdf`);

  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

  console.log('Starting Vite dev server...');
  const server = await createServer({
    root: ROOT,
    server: { port: PORT },
    logLevel: 'silent',
  });
  await server.listen();
  console.log(`Dev server running at http://localhost:${PORT}`);

  let browser;
  try {
    const executablePath = resolveBrowser();
    console.log(executablePath ? `Using browser: ${executablePath}` : 'Using Puppeteer bundled Chromium');
    browser = await puppeteer.launch({
      headless: true,
      executablePath,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    console.log(`Opening /?doc=${docKey} ...`);
    await page.goto(`http://localhost:${PORT}/?doc=${docKey}`, {
      waitUntil: 'networkidle0',
      timeout: 60000,
    });

    // Wait for web fonts and a settled layout before capture.
    await page.evaluate(async () => {
      if (document.fonts && document.fonts.ready) await document.fonts.ready;
    });
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log('Generating PDF (vector text)...');
    const pdfBuffer = await page.pdf({
      printBackground: true,
      preferCSSPageSize: true, // honour the paper's @page { size: A4; margin: ... }
    });

    fs.writeFileSync(outputPath, pdfBuffer);
    console.log(`PDF saved to: ${outputPath} (${(pdfBuffer.length / 1024).toFixed(0)} KB)`);
  } finally {
    if (browser) await browser.close();
    await server.close();
  }
}

main().catch((err) => {
  console.error('Export failed:', err.message);
  process.exit(1);
});
