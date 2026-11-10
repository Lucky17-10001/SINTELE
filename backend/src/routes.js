const express = require("express");
const router = express.Router();

const {
    rotaInicial,
    novoUsuario,
    listarUsuarios,
    loginAluno,
    loginProfessor
} = require("./controllers/usuario");

const {
    criarAtividade,
    listarAtividades,
    enviarEntrega
} = require("./controllers/atividade");

router.get("/", rotaInicial);
router.post("/usuario", novoUsuario);
router.get("/usuarios", listarUsuarios);
router.post("/login-aluno", loginAluno);
router.post("/login-professor", loginProfessor);
router.post("/activity", criarAtividade);
router.get("/activities", listarAtividades);
router.post("/entrega/:id", enviarEntrega);

module.exports = router;