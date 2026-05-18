import express from "express"
import { createFile, deleteFile, editFile, getAllFiles, getFileById } from "../controllers/filesController.js";

const router = express.Router();

router.get("/", getAllFiles);
router.get("/:id", getFileById);
router.post("/", createFile);
router.put("/:id", editFile);
router.delete("/:id", deleteFile);

export default router;