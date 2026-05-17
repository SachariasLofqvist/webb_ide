import express from "express"
import { createNote, deleteNote, editNote, getAllNotes } from "../controllers/notesController.js";

const router = express.Router();

router.get("/", getAllNotes);
router.post("/", createNote);
router.put("/:id", editNote);
router.delete("/:id", deleteNote);

export default router;