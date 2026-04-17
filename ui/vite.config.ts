import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    base: './',

    plugins: [
        solidPlugin(),
        wasm(),
        topLevelAwait()
    ],

    optimizeDeps: {
      include: ["@codemirror/state", "@codemirror/view"]
    },

    server: {
        port: 3000,
        fs: {
            allow: ['..']
        }
    },

    build: {
        target: 'esnext',
        rollupOptions: {
            input: resolve(__dirname, 'index.html')
        }
    },

});
