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

export default defineConfig({
  plugins: [
    figmaAssetPlugin(),
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src/app'),
    },
  },
});
