import express from "express";
import fs from "fs/promises";
import path from "path";
import buildFileTree from "../lib/bulidFileTree";

const WORKSPACE_DIR = path.resolve("./workspace")

export async function getFileTree(req, res){
    try {
        const fileTree = await buildFileTree(WORKSPACE_DIR)
        res.json({ tree: fileTree });
    } catch (error) {
        console.error("Could not load file tree", error);
        res.status(500).json({ error: "Could not read file tree"});        
    }
};

export async function getFile(req, res){
    try {
        const {filePath} = req.query;

        if(!filePath){
            return res.status(400).json({error: "File path missing"})
        }

        const {targetPath} = path.join(WORKSPACE_DIR, filePath)

        if(!targetPath.startsWith(WORKSPACE_DIR)){
            return res.status(403).json({error: "Access denied"})
        }

        const fileContent = await fs.readFile(targetPath, "utf-8")

        res.json({content: fileContent})

    } catch (error) {
        if(error.code === 'ENOENT'){
            return res.status(404).json({error: "File not found"})
        }
        res.status(500).json({error: "Server fault"})
    }
};

export async function saveFile(req, res){
    try {
        
        const {filePath, content} = req.body;
        const targetPath = path.join(WORKSPACE_DIR, filePath)

        if(!targetPath.startsWith(WORKSPACE_DIR)){
            return res(403).json({error: "Access denied"})
        }

        await fs.writeFile(targetPath, content, "utf-8")

        res.json({ message: "File saved! "})

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export async function createFile(req, res){

};

export async function deleteFile(req, res){

};

export async function createFolder(res, req){

};

export async function deleteFolder(res, req){

};