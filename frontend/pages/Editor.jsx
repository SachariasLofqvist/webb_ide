

export default function Editor({ currentFilePath, handleSave, code, setCode }) {
  return (
        <main className="flex-1 flex flex-col bg-base-100">
          {/* Top bar med spara-knapp */}
          <header className="h-14 bg-base-200 border-b border-base-300 flex items-center justify-between px-6">
            <div className="font-mono text-sm opacity-80 flex items-center gap-2">
              {currentFilePath ? currentFilePath : 'No file open'}
            </div>
            <button 
              onClick={handleSave}
              disabled={!currentFilePath}
              className="btn btn-sm btn-primary"
            >
              Save
            </button>
          </header>

          {/* Själva texteditorn */}
          <div className="flex-1 p-4 bg-base-100">
            {currentFilePath ? (
              <textarea
              className="textarea textarea-bordered w-full h-full font-mono text-sm focus:outline-none focus:border-primary resize-none bg-base-200/50 shadow-inner"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck="false"
              placeholder="Start coding..."
            />
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center opacity-30">
                <div className="text-4xl mb-4">🌲</div>
                <p className="font-mono">Choose a file to start coding</p>
              </div>
            </div>
          )}
          </div>
        </main>
  );
}