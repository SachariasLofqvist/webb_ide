import fs from "fs/promises";
import path from "path";

async function buildFileTree(currentDir, relativePath = ""){
    const entries = await fs.readdir(currentDir, {withFileTypes: true});
    const tree = [];

    for(const entry of entries){
        if (entry.name.startsWith(".") || entry.name === "node_modeules") {
            continue;
        }

        const nextRelativePath = path.join(relativePath, entry.name);
        const nextAbsolutePath = path.join(currentDir, entry.name);

        if (entry.isDirectory()) {
            tree.push({
                name: entry.name,
                type: "directory",
                path: nextRelativePath,
                children: await buildFileTree(nextAbsolutePath, nextRelativePath)
            });
            
        } else{
            tree.push({
                name: entry.name,
                type: "file",
                path: nextRelativePath
            });
        }
    }

    return tree.sort((a,b) => {
        if (a.type === b.type) return a.name.localeCompare(b.name);
        return a.type === "directory" ? -1 : 1;
    });
}

export default buildFileTree