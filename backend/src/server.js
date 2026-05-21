import express from "express";
import dotenv from "dotenv";
import fileRoutes from "./routes/filesRoutes.js"
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();

app.use(express.json());

app.use("", fileRoutes);


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});