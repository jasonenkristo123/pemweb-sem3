import {
  addTodoService,
  deleteTodoService,
  getAllTodosService,
  updateTodoService,
} from "../services/todo.service.js";


export async function getAllTodosController(req, res) {
    try {
        const result = await getAllTodosService();
        
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}


export async function addTodoController(req, res) {
    try {
        const title = req.body.title;

        if (!title) {
            return res.status(400).json({
                message: "Title is required"
            })
        }

        const result = await addTodoService(title);

        res.status(201).json(result);
        
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export async function updateTodoController(req, res) {
    try {
        const id = req.params.id;
        const title = req.body.title;
        const isDone = req.body.isDone;

        if (!id) {
            return res.status(400).json({
                message: "Id is required"
            })
        }

        const result = await updateTodoService(id, title, isDone);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

export async function deleteTodoController(req, res) {
    try {
        const id = req.params.id;

        if (!id) {
            return res.status(400).json({
                message: "Id is required"
            })
        }

        const result = await deleteTodoService(id);

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

