import React from "react";
import FileTreeNode from "./FileTree";

export default function Explorer({
  fileTree,
  handleOpenFile,
  createFile,
  createFolder,
  deleteSelected,
  deleteFolder,
  createFileInFolder,
  createFolderInFolder,
  handleSelectFolder,
  selectedItem,
}) {
  return (
    <aside className="w-64 bg-base-200 border-r border-base-300 flex flex-col shadow-lg z-10 shrink-0">
      <div className="p-3 bg-base-300 border-b border-base-300 flex items-center justify-between">
        <span className="font-bold uppercase text-xs tracking-widest text-primary">
          Explorer
        </span>
        <div className="flex gap-1">
          <button
            onClick={createFile}
            className="btn btn-xs btn-ghost btn-square"
            title="New File"
          >
            📄
          </button>
          <button
            onClick={createFolder}
            className="btn btn-xs btn-ghost btn-square"
            title="New Folder"
          >
            📁
          </button>
          <button
            onClick={deleteSelected}
            className="btn btn-xs btn-ghost btn-square text-error"
            title="Delete Selected"
            disabled={!selectedItem.path}
          >
            🗑️
          </button>
        </div>
      </div>
      <div className="p-2 overflow-y-auto flex-1 font-mono text-sm">
        {fileTree.map((node) => (
          <FileTreeNode
            key={node.path}
            node={node}
            onOpenFile={handleOpenFile}
            onDeleteFolder={deleteFolder}
            onCreateFile={createFileInFolder}
            onCreateFolder={createFolderInFolder}
            onSelectFolder={handleSelectFolder}
          />
        ))}
      </div>
    </aside>
  );
}
