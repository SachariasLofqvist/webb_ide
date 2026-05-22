import { useState, useEffect } from "react";

export default function FileTreeNode({
  node,
  onOpenFile,
  onDeleteFolder,
  onCreateFile,
  onCreateFolder,
  onSelectFolder,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [contextMenu, setContextMenu] = useState({ show: false, x: 0, y: 0 });

  useEffect(() => {
    const closeMenu = () => setContextMenu({ ...contextMenu, show: false });
    if (contextMenu.show) {
      window.addEventListener("click", closeMenu);
    }
    return () => window.removeEventListener("click", closeMenu);
  }, [contextMenu.show]);

  const handleContextMenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setContextMenu({ show: true, x: e.clientX, y: e.clientY });
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    onDeleteFolder(node.path);
    setContextMenu({ ...contextMenu, show: false });
  };

  if (node.type === "directory") {
    return (
      <div className="ml-4 relative">
        <div
          onClick={() => setIsOpen(!isOpen)}
          onContextMenu={handleContextMenu}
          className="cursor-pointer font-bold text-gray-400 hover:text-gray-200 hover:bg-base-300 p-1 rounded select-none flex items-center gap-1"
        >
          {isOpen ? "📂" : "📁"} {node.name}
        </div>

        {isOpen &&
          node.children.map((child) => (
            <FileTreeNode
              key={child.path}
              node={child}
              onOpenFile={onOpenFile}
              onDeleteFolder={onDeleteFolder}
              onCreateFile={onCreateFile}
              onCreateFolder={onCreateFolder}
              onSelectFolder={onSelectFolder}
            />
          ))}

        {contextMenu.show && (
          <div
            className="fixed z-50 bg-base-200 border border-base-300 shadow-xl rounded-md p-1"
            style={{ top: contextMenu.y, left: contextMenu.x }}
          >
            <ul className="menu menu-sm p-0 text-base-content">
              <li>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCreateFile(node.path);
                    setContextMenu({ ...contextMenu, show: false });
                  }}
                >
                  📄 New File
                </button>
              </li>
              <li>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCreateFolder(node.path);
                    setContextMenu({ ...contextMenu, show: false });
                  }}
                >
                  📁 New Folder
                </button>
              </li>
              <li>
                <button
                  className="text-error hover:bg-error/20"
                  onClick={handleDelete}
                >
                  🗑️ Delete Folder
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="ml-4 cursor-pointer text-gray-500 hover:text-gray-300 hover:bg-base-300 p-1 rounded select-none flex items-center gap-1"
      onClick={() => onOpenFile(node.path)}
    >
      📄 {node.name}
    </div>
  );
}
