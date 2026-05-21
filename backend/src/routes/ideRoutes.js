import express from "express";
import { createFile, createFolder, deleteFile, deleteFolder, getFile, getFileTree, saveFile } from "../controllers/ideController.js";

const router = express.Router();

// Separata, tydliga adresser för varje funktion
router.get("/api/tree", getFileTree);
router.get("/api/read", getFile);
router.put("/api/save", saveFile);

// Dina övriga funktioner
router.post("/api/file", createFile);
router.post("/api/folder", createFolder);
router.delete("/api/file", deleteFile);
router.delete("/api/folder", deleteFolder);

export default router;