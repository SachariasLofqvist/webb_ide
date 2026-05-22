import Navbar from "../lib/Navbar";
import Footer from "../lib/Footer";
import { useState, useEffect } from "react";
import axios from "axios";
import Explorer from "../lib/Explorer";
import Editor from "../lib/Editor";

export default function Demo() {
  const [fileTree, setFileTree] = useState([]);
  const [currentFilePath, setCurrentFilePath] = useState(null);
  const [activeFolderPath, setActiveFolderPath] = useState("");
  const [selectedItem, setSelectedItem] = useState({ type: null, path: "" });
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    action: null,
    targetPath: "",
    title: "",
    needsInput: false,
  });
  const [modalInput, setModalInput] = useState("");

  const openModal = (action, targetPath, title, needsInput = true) => {
    setModalConfig({ isOpen: true, action, targetPath, title, needsInput });
    setModalInput("");
  };

  const fetchFileTree = async () => {
    try {
      const res = await axios.get("/api/tree");
      if (res.data.tree) setFileTree(res.data.tree);
    } catch (error) {
      console.error("Could not fetch file tree", error);
    }
  };

  useEffect(() => {
    fetchFileTree();
  }, []);

  const handleOpenFile = async (filePath) => {
    const parts = filePath.split("/");
    parts.pop();
    setActiveFolderPath(parts.join("/"));
    setSelectedItem({ type: "file", path: filePath });

    try {
      const res = await axios.get("/api/read", {
        params: { filePath: filePath },
      });
      setCurrentFilePath(filePath);
      setCode(res.data.content);
    } catch (error) {
      console.error("Could not open file", error);
    }
  };

  const handleSelectFolder = (folderPath) => {
    setActiveFolderPath(folderPath);
    setSelectedItem({ type: "folder", path: folderPath });
  };

  const handleSave = async () => {
    if (!currentFilePath) return;
    try {
      await axios.put("/api/save", {
        filePath: currentFilePath,
        content: code,
      });
    } catch (error) {
      console.error("Could not save file", error);
    }
  };

  const handleRun = async () => {
    if (!currentFilePath) return;
    await handleSave();
    setIsRunning(true);
    setOutput("Running...");

    try {
      const res = await axios.post("/api/run", { filePath: currentFilePath });
      setOutput(res.data.output || "Program executed but returned no output.");
    } catch (error) {
      setOutput("An error occurred while running the code.");
      console.error(error);
    } finally {
      setIsRunning(false);
    }
  };

  const createFile = () => {
    openModal(
      "createFile",
      activeFolderPath,
      "Name of the new file (e.g. index.js)",
      true,
    );
  };

  const createFolder = () => {
    openModal("createFolder", activeFolderPath, "Name of the new folder", true);
  };

  const deleteSelected = () => {
    if (!selectedItem.path) return;

    if (selectedItem.type === "file") {
      openModal(
        "deleteFile",
        selectedItem.path,
        `Are you sure you want to delete ${selectedItem.path}?`,
        false,
      );
    } else if (selectedItem.type === "folder") {
      openModal(
        "deleteFolder",
        selectedItem.path,
        `Are you sure you want to delete the folder ${selectedItem.path} and all its contents?`,
        false,
      );
    }
  };

  const deleteFolder = (folderPath) => {
    if (!folderPath) return;
    openModal(
      "deleteFolder",
      folderPath,
      `Are you sure you want to delete the folder ${folderPath} and all its contents?`,
      false,
    );
  };

  const handleModalConfirm = async () => {
    const { action, targetPath } = modalConfig;

    try {
      if (action === "createFile") {
        if (!modalInput) return;
        await axios.post("/api/file", {
          filePath: targetPath,
          fileName: modalInput,
        });
      } else if (action === "createFolder") {
        if (!modalInput) return;
        await axios.post("/api/folder", {
          folderPath: targetPath,
          folderName: modalInput,
        });
      } else if (action === "deleteFile") {
        await axios.delete("/api/file", { data: { filePath: targetPath } });
        setCurrentFilePath(null);
        setCode("");
        setSelectedItem({ type: null, path: "" });
      } else if (action === "deleteFolder") {
        await axios.delete("/api/folder", { data: { folderPath: targetPath } });
        setSelectedItem({ type: null, path: "" });
      }

      setModalConfig({ ...modalConfig, isOpen: false });
      await fetchFileTree();
    } catch (error) {
      console.error(`Error during ${action}:`, error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex h-screen bg-base-100 text-base-content font-sans text-sm relative">
        <Explorer
          fileTree={fileTree}
          handleOpenFile={handleOpenFile}
          createFile={createFile}
          createFolder={createFolder}
          deleteSelected={deleteSelected}
          deleteFolder={deleteFolder}
          selectedItem={selectedItem}
          handleSelectFolder={handleSelectFolder}
          createFileInFolder={(path) =>
            openModal("createFile", path, "Name of the new file", true)
          }
          createFolderInFolder={(path) =>
            openModal("createFolder", path, "Name of the new folder", true)
          }
        />

        <Editor
          handleSave={handleSave}
          currentFilePath={currentFilePath}
          code={code}
          setCode={setCode}
          handleRun={handleRun}
          output={output}
          isRunning={isRunning}
        />

        {modalConfig.isOpen && (
          <div className="modal modal-open">
            <div className="modal-box bg-base-200 border border-base-300 shadow-2xl">
              <h3 className="font-bold text-lg">{modalConfig.title}</h3>

              {modalConfig.needsInput && (
                <input
                  type="text"
                  value={modalInput}
                  onChange={(e) => setModalInput(e.target.value)}
                  placeholder="Type here..."
                  className="input input-bordered w-full mt-4 bg-base-100 font-mono"
                  autoFocus
                  onKeyDown={(e) => e.key === "Enter" && handleModalConfirm()}
                />
              )}

              <div className="modal-action">
                <button
                  className="btn btn-ghost"
                  onClick={() =>
                    setModalConfig({ ...modalConfig, isOpen: false })
                  }
                >
                  Cancel
                </button>
                <button
                  className={`btn ${modalConfig.needsInput ? "btn-primary" : "btn-error"}`}
                  onClick={handleModalConfirm}
                >
                  {modalConfig.needsInput ? "Create" : "Delete permanently"}
                </button>
              </div>
            </div>

            <div
              className="modal-backdrop"
              onClick={() => setModalConfig({ ...modalConfig, isOpen: false })}
            ></div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
