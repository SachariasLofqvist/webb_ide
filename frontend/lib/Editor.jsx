import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { python } from '@codemirror/lang-python';
import { oneDark } from '@codemirror/theme-one-dark'
import { keymap } from '@codemirror/view';
import { acceptCompletion } from '@codemirror/autocomplete'
import { insertTab } from '@codemirror/commands'

export default function Editor({ currentFilePath, handleSave, handleRun, code, setCode, output, isRunning}) {
  
  const getLanguageExtension = () => {
    if (!currentFilePath) return [];
    if (currentFilePath.endsWith('.py')) return [python()]
    if (currentFilePath.endsWith('.js') || currentFilePath.endsWith('.jsx')) return [javascript({ jsx: true})]
    return [];
  }

  const customShortcuts = keymap.of([
    {
      key: "Mod-s",
      preventDefault: true,
      run: () => {
        handleSave();
        return true;
      }
    },
    {
      key: "Tab",
      run: (target) => {
        // 1. Kolla om vi kan acceptera ett ord i menyn
        if(acceptCompletion(target)) return true;
        // 2. Annars, gör ett vanligt indrag
        if(insertTab(target)) return true;
        return false;
      }
    }
  ]);

  return (
    <main className="flex-1 flex flex-col bg-base-100 h-screen overflow-hidden">
      
      <header className="h-14 bg-base-200 border-b border-base-300 flex items-center justify-between px-6 shrink-0">
        <div className="font-mono text-sm opacity-80 flex items-center gap-2">
          {currentFilePath ? currentFilePath : 'No file open'}
        </div>
        <div className="flex gap-2">
          <button onClick={handleSave} disabled={!currentFilePath} className="btn btn-sm btn-ghost">
            Save
          </button>
          <button 
            onClick={handleRun} 
            disabled={!currentFilePath || isRunning} 
            className="btn btn-sm btn-success"
          >
            {isRunning ? (
              <span className="loading loading-spinner loading-xs"></span>
            ) : (
              "Run"
            )}
          </button>
        </div>
      </header>

      <div className="flex-1 p-4 bg-base-100 overflow-hidden">
        {currentFilePath ? (
          <div className='w-full h-full overflow-auto bg-[#282c34] rounded-md'>
            <CodeMirror
              value={code}
              height='100%'
              theme={oneDark}
              indentWithTab = { false }
              extensions={[...getLanguageExtension(), customShortcuts]}
              onChange={(value) => setCode(value)}
              className="h-full text-base font-mono"
            />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center opacity-30">
              <p className="font-mono">Choose a file to start coding</p>
            </div>
          </div>
        )}
      </div>

      <div className="h-1/3 bg-base-300 border-t border-base-300 p-4 shrink-0 overflow-y-auto font-mono text-sm shadow-inner">
        <div className="text-base-content/50 mb-3 uppercase text-xs font-bold tracking-wider">
          Terminal Output
        </div>
        {output ? (
          <pre className="text-base-content/90 whitespace-pre-wrap leading-relaxed">
            {output}
          </pre>
        ) : (
          <span className="text-base-content/30 italic">
            ...
          </span>
        )}
      </div>
    </main>
  );
}