import { createSignal, onMount } from 'solid-js';
// @ts-ignore
import { CodeMirror } from '@solid-codemirror/codemirror';
import { html } from '@codemirror/lang-html';
import { oneDark } from '@codemirror/theme-one-dark';

function App() {

    const [code, setCode] = createSignal('');
    const [showExecution, setShowExecution] = createSignal(false);
    const [output, setOutput] = createSignal('');

    let worker: Worker;

    onMount(() => {

        worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' });

        worker.onmessage = (e) => {

            setOutput(e.data.result);

        }

    })

    const handleRun = () => {

        setShowExecution(true);
        setOutput('EXECUTING CODE...');
        worker.postMessage({ code: code() });

    };

    const closeExecution = () => {

        setShowExecution(false);

    };

    const saveCode = () => {

        const blob = new Blob([code()], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');

        a.href = url;
        a.download = 'jcode_export.html';
        a.click();
        URL.revokeObjectURL(url);

    }

    return (

        <>

            <div class="top-bar">
                <span>JebCode!</span>
                <a href="index.html" class="back-btn">&lt;&lt;&lt; BACK</a>
            </div>
            {!showExecution() && (
                <div class="layer focal-layer">
                    <CodeMirror
                        value={code()}
                        onValueChange={(value: string) => setCode(value)}
                        extensions={[html(), oneDark]}
                    />
                    </div>
            )}

            {showExecution() && (

            <div class="layer execution-layer">
                <div class="execution-header">
                <span>PREVIEW</span>
                <button onClick={closeExecution}>GO BACK...!</button>
                </div>
                <div class="execution-output">

                <iframe srcdoc={output()}
                sandbox="allow-scripts"
                style={{
                    width: '100%',
                    height: '100%',
                    border: 'none',
                    background: '#ffffff',
                    flex: '1'
                }} />

                </div>

                </div>

        )}

            <div class="context-layer" id="context-overlay"></div>

            {!showExecution() && (
                <div style={{ position: 'absolute', bottom: '20px', right: '20px', display: 'flex', gap: '10px', 'z-index': 100 }}>
                    <button class="run-btn" onClick={saveCode}>
                        SAVE
                    </button>
                <button class="run-btn" onClick={handleRun}>
                    PREVIEW!
                </button>
                </div>
            )}

        </>

    );

}

export default App;
