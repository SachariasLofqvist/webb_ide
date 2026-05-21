import Navbar from "./Navbar";
import Footer from "./Footer";
import {useState, useEffect } from "react";
import axios from "axios";
import Explorer from "./Explorer";
import Editor from "./Editor";

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
      <div className="flex h-screen bg-base-100 text-base-content font-sans text-sm">
        
        {/* SIDOFÄLT (Explorer) */}
        <Explorer 
          fileTree={fileTree}
          handleOpenFile={handleOpenFile}
        />

        {/* EDITOR-VYN */}
        <Editor 
          handleSave={handleSave}
          currentFilePath={currentFilePath}
          code={code}
          setCode={setCode}
        />

      </div>
      <Footer />
    </>
  );

}
