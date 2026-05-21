import { useState } from "react";

export default function FileTreeNode({ node, onOpenFile }){
    
    const [isOpen, setIsOpen] = useState(false);
    if (node.type === "directory" ){
      return(
        <div className="ml-4">
            <div onClick ={() => setIsOpen(!isOpen)} className="className=cursor-pointer font-bold text-gray-700 hover:text-gray-900 select-none flex items-center gap-1">
                {isOpen ? '📂' : '📁'} {node.name}
            </div>
            {isOpen && node.children.map(child => (
              <FileTreeNode
                key={child.path}
                node={child}
                onOpenFile={onOpenFile} 
              />
            ))}
        </div>
        );
    }
    
    return (
        <div className="ml-4 cursor-pointer text-gray-600 hover:text-blue-600 hover:bg-gray-100 px-1 rounded select-none" 
        onClick={() => onOpenFile(node.path)}>
           📄 {node.name} 
        </div>
    );
}