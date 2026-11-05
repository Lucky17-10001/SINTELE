const fs = require("fs");
const path = require("path");

const caminhoDados = path.join(__dirname, "../../dados.json");

function carregarUsuarios() {
    try {
        const dados = fs.readFileSync(caminhoDados, "utf8");
        return JSON.parse(dados);
    } catch (erro) {
        console.error("Erro ao carregar usuários:", erro);
        return [];
    }
}

function salvarUsuarios(usuarios) {
    fs.writeFileSync(
        caminhoDados,
        JSON.stringify(usuarios, null, 4),
        "utf8"
    );
}

const rotaInicial = (req, res) => {
    res.json({
        mensagem: "Back-end respondendo!"
    });
};

const listarUsuarios = (req, res) => {
    const usuarios = carregarUsuarios();

    // Não enviar senhas ao navegador.
    const usuariosPublicos = usuarios.map(({ senha, ...usuario }) => usuario);

    res.json(usuariosPublicos);
};

const novoUsuario = (req, res) => {
    const { nome, email, senha, sala } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({
            erro: "Preencha todos os campos obrigatórios."
        });
    }

    const usuarios = carregarUsuarios();

    const emailExiste = usuarios.some(
        usuario => usuario.email === email
    );

    if (emailExiste) {
        return res.status(409).json({
            erro: "Este e-mail já está cadastrado."
        });
    }

    const novoUsuario = {
        nome,
        email,
        senha,
        ...(sala && { sala })
    };

    usuarios.push(novoUsuario);

    try {
        salvarUsuarios(usuarios);

        res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso!"
        });
    } catch (erro) {
        console.error("Erro ao salvar usuário:", erro);

        res.status(500).json({
            erro: "Não foi possível cadastrar o usuário."
        });
    }
};

module.exports = {
    rotaInicial,
    novoUsuario,
    listarUsuarios
};