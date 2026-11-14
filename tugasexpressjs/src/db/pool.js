import mysql from "mysql2/promise"

const pool = mysql.createPool({
    host: "127.0.0.1",
    port: 3310,
    user: "root",
    password: "rahasia",
    database: "todolist",
    waitForConnections: true,
    connectionLimit: 10,
})

export default pool;