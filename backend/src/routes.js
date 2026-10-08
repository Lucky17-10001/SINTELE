const express = require("express")
const router = express.Router()

const novoUsuario = require('./controllers/usuario')
const listarUsuarios = require('../dados.json')

const rotaInicial = (req, res) => {
    res.json("Back-end sintele respondendo")
}

router.get('/', rotaInicial)
router.post('/usuario', novoUsuario)
router.get('/usuarios', listarUsuarios)

module.exports = router;
