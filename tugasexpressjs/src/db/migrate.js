import path from "node:path"
import { fileURLToPath } from "node:url"
import fs from "node:fs/promises"
import pool from "./pool.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const sql = await fs.readFile(path.join(__dirname, "schema.sql"), "utf8")

await pool.query(sql);
console.log("finish migrations")
await pool.end();