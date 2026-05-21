import Navbar from "./Navbar";
import Footer from "./Footer";
import {useState, useEffect } from "react";
import FileTreeNode from "./FileTree";
import axios from "axios";

export default function Demo() {
  const [fileTree, setFileTree] = useState([]);
  const [currentFilePath, setCurrentFilePath] = useState(null);
  const [code, setCode] = useState("");

  useEffect(() => {

    axios.get('/api/tree')
      .then(res => {
        if (res.data.tree) setFileTree(res.data.tree)
      })
      .catch(err => console.error("Could not get file tree", err));
  }, []);

  const handleOpenFile = async (filePath) => {
    try {
      const res = await axios.get("/api/read", {
        params: { filePath: filePath}
      });

      setCurrentFilePath(filePath);
      setCode(res.data.content);
    } catch (error) {
      console.error("Could not open file", error)
    }
  }

  const handleSave = async () => {
    if (!currentFilePath) return;

    try {
      await axios.put('/api/save', {
        filePath: currentFilePath,
        content: code
      });
      alert('File saved')
    } catch (error) {
      console.error("Could not save file", error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="flex h-screen bg-gray-50 font-sans text-sm">
        
        {/* SIDOFÄLT (Explorer) */}
        <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
          <div className="p-3 bg-gray-100 border-b border-gray-200 font-semibold text-gray-700 uppercase text-xs tracking-wider">
            Utforskaren
          </div>
          <div className="p-2 overflow-y-auto flex-1">
            {fileTree.map(node => (
              <FileTreeNode 
                key={node.path} 
                node={node} 
                onOpenFile={handleOpenFile} 
              />
            ))}
          </div>
        </aside>

        {/* EDITOR-VYN */}
        <main className="flex-1 flex flex-col">
          {/* Top bar med spara-knapp */}
          <header className="h-12 bg-gray-100 border-b border-gray-200 flex items-center justify-between px-4">
            <div className="text-gray-600 font-mono">
              {currentFilePath ? currentFilePath : 'Ingen fil öppen'}
            </div>
            <button 
              onClick={handleSave}
              disabled={!currentFilePath}
              className="bg-blue-600 text-white px-4 py-1.5 rounded hover:bg-blue-700 disabled:opacity-50 transition-colors"
            >
              Spara
            </button>
          </header>

          {/* Själva texteditorn */}
          <div className="flex-1 p-4">
            {currentFilePath ? (
              <textarea
                className="w-full h-full p-4 font-mono text-sm bg-white border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck="false"
              />
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400">
                Välj en fil i utforskaren för att börja koda
              </div>
            )}
          </div>
        </main>

      </div>
      <Footer />
    </>
  );

}
