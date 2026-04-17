import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import wasm from 'vite-plugin-wasm';
import topLevelAwait from 'vite-plugin-top-level-await';
import { resolve } from 'path';

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
            input: resolve(__dirname, 'jcode.html')
        }
    },

});
