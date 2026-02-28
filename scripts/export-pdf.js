/**
 * CLI PDF export script.
 * Usage: node scripts/export-pdf.js [output-path]
 *
 * Starts a Vite dev server, opens /?export in a headless browser, and uses
 * Puppeteer's native page.pdf() to generate a real PDF with selectable text
 * and clickable links.
 *
 * Default output: ./Merit-OI-Presentation.pdf
 */

import puppeteer from 'puppeteer';
import { createServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const PORT = 5199;

async function main() {
  const deckArg = process.argv[2] ?? 'merit-oi';
  const outputArg = process.argv[3];
  const outputPath = outputArg
    ? path.resolve(process.cwd(), outputArg)
    : path.resolve(ROOT, `${deckArg}.pdf`);

  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

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
    browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    console.log('Opening export layout...');
    await page.goto(`http://localhost:${PORT}/?deck=${deckArg}&export`, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Allow fonts and images to finish rendering
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Generating PDF...');
    const pdfBuffer = await page.pdf({
      width: '1920px',
      height: '1080px',
      printBackground: true,
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' },
    });

    fs.writeFileSync(outputPath, pdfBuffer);
    console.log(`PDF saved to: ${outputPath}`);
  } finally {
    if (browser) await browser.close();
    await server.close();
  }
}

main().catch((err) => {
  console.error('Export failed:', err.message);
  process.exit(1);
});
