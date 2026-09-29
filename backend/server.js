const express = require("express")
const cors = require("cors")
const usuario = require("..//dados.json")



//Controllers CRUD [create, read, update, delete]
const rotaInicial = (req, res) => {
    res.json("Back-end respondendo")
}

const cadastrarUsuario = (req, res) => {
    const usuario = req.body
    res.status(201).json(usuario)
}
const readUsuario = (req, res) => {
    res.json(usuario)
}


//Configurações do servidor
const app = express()
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const porta = 3000

app.get('/', rotaInicial)
app.post('/usuarios', cadastrarUsuario)
app.get('/usuarios', readUsuario)
app.listen(porta, () => {
    console.log(`Servidor respondendo em: http://localhost:${porta}`)
})