import express from "express";
import fs from "fs/promises";
import path from "path";
import buildFileTree from "../lib/bulidFileTree.js";
import { exec } from "child_process";

const WORKSPACE_DIR = path.resolve("./workspace");

export async function getFileTree(req, res) {
  try {
    const fileTree = await buildFileTree(WORKSPACE_DIR);
    res.json({ tree: fileTree });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function getFile(req, res) {
  try {
    const { filePath } = req.query;

    if (!filePath) {
      return res.status(400).json({ error: "File path missing" });
    }

    const targetPath = path.join(WORKSPACE_DIR, filePath);

    if (!targetPath.startsWith(WORKSPACE_DIR)) {
      return res.status(403).json({ error: "Access denied" });
    }

    const fileContent = await fs.readFile(targetPath, "utf-8");
    res.json({ content: fileContent });
  } catch (error) {
    if (error.code === "ENOENT") {
      return res.status(404).json({ error: "File not found" });
    }
    res.status(500).json({ error: "Server fault" });
  }
}

export async function saveFile(req, res) {
  try {
    const { filePath, content } = req.body;
    const targetPath = path.join(WORKSPACE_DIR, filePath);

    if (!targetPath.startsWith(WORKSPACE_DIR)) {
      return res.status(403).json({ error: "Access denied" });
    }

    await fs.writeFile(targetPath, content, "utf-8");
    res.json({ message: "File saved!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createFile(req, res) {
  try {
    const { filePath, fileName } = req.body;
    const targetPath = path.join(WORKSPACE_DIR, filePath, fileName);
    if (!targetPath.startsWith(WORKSPACE_DIR)) {
      return res.status(403).json({ error: "Access denied " });
    }

    await fs.writeFile(targetPath, "");

    res.json({ message: "File created " });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteFile(req, res) {
  try {
    const { filePath } = req.body;
    const targetPath = path.join(WORKSPACE_DIR, filePath);

    if (!targetPath.startsWith(WORKSPACE_DIR)) {
      return res.status(403).json({ error: "Access denied " });
    }

    await fs.unlink(targetPath);

    res.json({ message: "File deleted " });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createFolder(res, req) {
  try {
    const { folderPath, folderName } = req.body;
    const targetPath = path.join(WORKSPACE_DIR, folderPath, folderName);

    if (!targetPath.startsWith(WORKSPACE_DIR)) {
      return res.status(403).json({ error: "Access denied " });
    }

    await fs.mkdir(targetPath, { recursive: true });

    res.json({ message: "Folder created" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function deleteFolder(res, req) {
  try {
    const { folderPath } = req.body;
    const targetPath = path.join(WORKSPACE_DIR, folderPath);

    if (!targetPath.startsWith(WORKSPACE_DIR)) {
      return res.status(403).json({ error: "Access denied " });
    }

    await fs.rm(targetPath, { recursive: true, force: true });

    res.json({ message: "Folder deleted " });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function runFile(req, res) {
  const { filePath } = req.body;

  if (!filePath) {
    res.status(400).json({ error: "File path missing " });
  }

  const targetPath = path.join(WORKSPACE_DIR, filePath);

  if (!targetPath.startsWith(WORKSPACE_DIR)) {
    return res.status(403).json({ error: "Access denied " });
  }

  let command = "";
  if (filePath.endsWith(".py")) {
    command = `python "${targetPath}"`;
  } else if (filePath.endsWith(".js")) {
    command = `node "${targetPath}"`;
  } else {
    return res.status(400).json({ error: "Språket stöds inte än" });
  }

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.json({ output: stderr || error.message, isError: true });
    }
    res.json({ output: stdout, isError: false });
  });
}
