import express from "express";
import dotenv from "dotenv";
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

connectDB();

app.use("/api/notes", notesRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});