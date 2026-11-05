const express = require("express");
const router = express.Router();

const {
    rotaInicial,
    novoUsuario,
    listarUsuarios,
    loginAluno,
    loginProfessor
} = require("./controllers/usuario");

router.get("/", rotaInicial);
router.post("/usuario", novoUsuario);
router.get("/usuarios", listarUsuarios);
router.post("/login-aluno", loginAluno);
router.post("/login-professor", loginProfessor);

module.exports = router;