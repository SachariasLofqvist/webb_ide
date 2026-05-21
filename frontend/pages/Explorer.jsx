import React from 'react'
import FileTreeNode from './FileTree'; 

export default function Explorer({ fileTree, handleOpenFile }) {
  return (
    <aside className="w-64 bg-base-200 border-r border-base-300 flex flex-col shadow-lg z-10">
      <div className="p-4 bg-base-300 border-b border-base-300 font-bold uppercase text-xs tracking-widest text-primary">
        Explorer
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
  );
}