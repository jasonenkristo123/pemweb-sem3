import { Router } from "express";
import {
  addTodoController,
  deleteTodoController,
  getAllTodosController,
  updateTodoController,
} from "../controller/todo.controller.js";


const todoRoutes = Router();

todoRoutes.get("/", getAllTodosController);
todoRoutes.post("/", addTodoController);
todoRoutes.put("/:id", updateTodoController);
todoRoutes.delete("/:id", deleteTodoController);

export default todoRoutes;