const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sintele"
});

db.connect((erro) => {
    if (erro) {
        console.error("Erro ao conectar ao BD:", erro);
    } else {
        console.log("Conectado ao BD SINTELE!");
    }
});

module.exports = db;