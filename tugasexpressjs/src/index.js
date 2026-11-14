import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import todoRoutes from "./api/routes/todo.routes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "view")));


app.use("/api/todos", todoRoutes);

app.listen(3000, () => {
    console.log("server is running in port 3000")
});