import express from "express";
import { createFile, createFolder, deleteFile, deleteFolder, getFile, getFileTree, saveFile } from "../controllers/ideController";

const router = express.Router();

router.get("/demo", getFileTree)
router.get("/demo/:id", getFile)
router.post("/demo", createFile)
router.post("/demo", createFolder)
router.put("/demo/:id", saveFile)
router.delete("/demo/:id", deleteFile)
router.delete("/demo", deleteFolder)

export default router