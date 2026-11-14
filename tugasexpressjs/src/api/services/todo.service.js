import pool from "../../db/pool.js";


export async function getAllTodosService() {
    const queryDB = "SELECT * FROM todos";

    const [rows] = await pool.query(queryDB);

    return rows;
}

export async function addTodoService(title) {
    const queryDB = "INSERT INTO todos(title) values (?)"

    const [result] = await pool.query(queryDB, [title]);

    return {
        id: result.insertId,
        title,
        isDone: false
    }
}

export async function updateTodoService(id, title, isDone) {
    const queryDB = "UPDATE todos SET title = COALESCE(?, title), isDone = COALESCE(?, isDone) WHERE id = ?";

    await pool.query(queryDB, [title ?? null, isDone ?? null, id]);

    return {
        id,
        title,
        isDone
    }
}   

export async function deleteTodoService(id) {
    const queryDB = "DELETE FROM todos WHERE id = ?";

    await pool.query(queryDB, [id]);

    return {
        id,
        message: "Todo deleted successfully"
    }
}   
