const express = require("express")
const router = express.Router()

const { rotaInicial, novoUsuario, listarUsuarios } = require('./controllers/usuario');
router.get('/', rotaInicial)
router.post('/usuario', novoUsuario)
router.get('/usuarios', listarUsuarios)

module.exports = router;
