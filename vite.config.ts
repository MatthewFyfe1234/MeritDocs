import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import fs from 'fs';

/**
 * Resolves `figma:asset/<hash>.<ext>` imports to local files in src/assets/.
 *
 * To add the real logo:
 *   1. Export the image from Figma
 *   2. Place it at src/assets/ac235a7dd12946ff81fef7e143fb133418592215.png
 *      (or any name — just update the import in CoverSlide.tsx to match)
 *
 * Until the file exists, a transparent 1×1 PNG is returned so the app still loads.
 */
function figmaAssetPlugin() {
  const ASSETS_DIR = path.resolve(__dirname, 'src/assets');

  // 1×1 transparent PNG as a base64 data URL fallback
  const TRANSPARENT_PNG =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

  return {
    name: 'figma-asset',
    resolveId(id: string) {
      if (id.startsWith('figma:asset/')) {
        return '\0figma-asset:' + id.slice('figma:asset/'.length);
      }
    },
    load(id: string) {
      if (!id.startsWith('\0figma-asset:')) return;
      const filename = id.slice('\0figma-asset:'.length);
      const localPath = path.join(ASSETS_DIR, filename);

      if (fs.existsSync(localPath)) {
        // Delegate to Vite's normal asset handling
        return `import asset from ${JSON.stringify(localPath)}; export default asset;`;
      }

      console.warn(
        `[figma-asset] "${filename}" not found in src/assets/ — using transparent placeholder.\n` +
        `  To use the real image, export it from Figma and place it at:\n` +
        `  src/assets/${filename}`
      );
      return `export default ${JSON.stringify(TRANSPARENT_PNG)};`;
    },
  };
}

/**
 * Dev-only endpoint for the in-viewer editor. POST /__edit { find, replace }
 * finds the (prose) selection in the source .tsx under src/app/documents and
 * patches it in place. Matching normalises whitespace and HTML entities so a
 * rendered selection maps back to the hand-authored JSX; selections that cross a
 * tag or an equation won't match and are rejected.
 */
function editSourcePlugin() {
  const SEARCH_DIR = path.resolve(__dirname, 'src/app/documents');
  const ENTITIES: Record<string, string> = {
    '&rsquo;': '’', '&lsquo;': '‘', '&ldquo;': '“', '&rdquo;': '”',
    '&ndash;': '–', '&mdash;': '—', '&times;': '×', '&ge;': '≥',
    '&le;': '≤', '&asymp;': '≈', '&nbsp;': ' ', '&amp;': '&', '&lt;': '<', '&gt;': '>',
  };
  // Project source to rendered-ish text, tracking each projected char's source span.
  function normalize(src: string) {
    const chars: string[] = [];
    const map: [number, number][] = [];
    let i = 0;
    while (i < src.length) {
      const c = src[i];
      if (/\s/.test(c)) {
        let j = i;
        while (j < src.length && /\s/.test(src[j])) j++;
        chars.push(' '); map.push([i, j]); i = j;
      } else if (c === '&') {
        const m = /^&[a-zA-Z]+;/.exec(src.slice(i, i + 12));
        if (m && ENTITIES[m[0]] !== undefined) { chars.push(ENTITIES[m[0]]); map.push([i, i + m[0].length]); i += m[0].length; }
        else { chars.push(c); map.push([i, i + 1]); i++; }
      } else { chars.push(c); map.push([i, i + 1]); i++; }
    }
    return { text: chars.join(''), map };
  }
  function encodeReplace(s: string) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/[’']/g, '&rsquo;').replace(/‘/g, '&lsquo;')
      .replace(/“/g, '&ldquo;').replace(/”/g, '&rdquo;');
  }
  function walk(dir: string, out: string[] = []) {
    for (const name of fs.readdirSync(dir)) {
      const p = path.join(dir, name);
      if (fs.statSync(p).isDirectory()) walk(p, out);
      else if (p.endsWith('.tsx')) out.push(p);
    }
    return out;
  }
  return {
    name: 'edit-source',
    configureServer(server: any) {
      server.middlewares.use('/__edit', (req: any, res: any) => {
        res.setHeader('Content-Type', 'application/json');
        if (req.method !== 'POST') { res.statusCode = 405; res.end(JSON.stringify({ ok: false, reason: 'POST only' })); return; }
        let body = '';
        req.on('data', (c: any) => { body += c; });
        req.on('end', () => {
          try {
            const { find, replace } = JSON.parse(body);
            const nf = String(find).replace(/\s+/g, ' ').trim();
            if (nf.length < 3) { res.end(JSON.stringify({ ok: false, reason: 'selection too short' })); return; }
            const matches: { file: string; start: number; end: number }[] = [];
            for (const file of walk(SEARCH_DIR)) {
              const { text, map } = normalize(fs.readFileSync(file, 'utf8'));
              let from = 0, idx: number;
              while ((idx = text.indexOf(nf, from)) !== -1) {
                matches.push({ file, start: map[idx][0], end: map[idx + nf.length - 1][1] });
                from = idx + nf.length;
              }
            }
            if (matches.length === 0) { res.end(JSON.stringify({ ok: false, reason: 'not found in source (the selection may cross an equation, a tag, or formatting)' })); return; }
            if (matches.length > 1) { res.end(JSON.stringify({ ok: false, reason: `ambiguous: this text appears ${matches.length} times — select a longer, unique span` })); return; }
            const { file, start, end } = matches[0];
            const src = fs.readFileSync(file, 'utf8');
            fs.writeFileSync(file, src.slice(0, start) + encodeReplace(String(replace)) + src.slice(end));
            res.end(JSON.stringify({ ok: true, file: path.relative(__dirname, file) }));
          } catch (e: any) {
            res.statusCode = 500; res.end(JSON.stringify({ ok: false, reason: String((e && e.message) || e) }));
          }
        });
      });
    },
  };
}

export default defineConfig({
  plugins: [
    figmaAssetPlugin(),
    editSourcePlugin(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/app'),
    },
  },
  server: {
    headers: {
      'Cross-Origin-Opener-Policy': 'same-origin',
      'Cross-Origin-Embedder-Policy': 'require-corp',
    },
  },
  optimizeDeps: {
    // @ffmpeg/ffmpeg spawns its worker via `new Worker(new URL('./worker.js', import.meta.url))`;
    // Vite's dep pre-bundler rewrites that URL to a path that doesn't exist in .vite/deps,
    // so the worker silently fails to load. Excluding it keeps the package's real file layout intact.
    exclude: ['@ffmpeg/ffmpeg', '@ffmpeg/util'],
  },
});
