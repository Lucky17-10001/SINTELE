const rotaInicial = (req, res) => {
    res.json("Back-end respondendo")
}
const listarUsuarios = (req, res) => {
    res.send(usuarios)
}

const novoUsuario = (req, res) => {
    if (req.body && Object.keys(req.body).length > 0) {
        usuarios.push(req.body); 
        res.send("Usuário cadastrado com sucesso!"); 
    } else {
        res.status(400).send("Erro ao cadastrar usuário: Dados vazios");
    }
}; 
module.exports = {
    rotaInicial,
     novoUsuario,
     listarUsuarios
};