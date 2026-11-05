const express = require("express");
const router = express.Router();

const {
    rotaInicial,
    novoUsuario,
    listarUsuarios,
    loginAluno
} = require("./controllers/usuario");

router.get("/", rotaInicial);
router.post("/usuario", novoUsuario);
router.get("/usuarios", listarUsuarios);
router.post("/login-aluno", loginAluno);

module.exports = router;