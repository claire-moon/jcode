import init, { writeFile, runFile } from '../../engine/pkg/engine.js';
import { wasmBase64 } from './wasm_data';

let initialized = false;

self.onmessage = async (e: MessageEvent) => {
    if (!initialized) {
        const binaryString = atob(wasmBase64);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }

        await init(bytes);
        initialized = true;

    }

    const { code } = e.data;
    writeFile("preview.html", code);
    const result = runFile("preview.html");
    self.postMessage({ result });
};
