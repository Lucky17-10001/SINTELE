const db = require("../database");
const crypto = require("crypto");

function gerarSenha(senha) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto.scryptSync(senha, salt, 64).toString("hex");

    return salt + ":" + hash;
}

function verificarSenha(senha, senhaArmazenada) {
    const partes = senhaArmazenada.split(":");

    if (partes.length !== 2) {
        return false;
    }

    const [salt, hashArmazenado] = partes;

    if (
        !/^[a-f0-9]{32}$/i.test(salt) ||
        !/^[a-f0-9]{128}$/i.test(hashArmazenado)
    ) {
        return false;
    }

    const hashDigitado = crypto.scryptSync(senha, salt, 64);
    const hashOriginal = Buffer.from(hashArmazenado, "hex");

    return crypto.timingSafeEqual(hashDigitado, hashOriginal);
}

const rotaInicial = (req, res) => {
    res.json({
        mensagem: "Back-end respondendo!"
    });
};

const listarUsuarios = (req, res) => {
    const sql = "SELECT id_aluno, nome, email, sala FROM aluno";

    db.query(sql, (erro, resultados) => {
        if (erro) {
            console.error("Erro ao consultar alunos:", erro);
            return res.status(500).send("Erro ao consultar o BD");
        }

        res.send(resultados);
    });
};

const novoUsuario = (req, res) => {
    const { nome, email, senha, sala } = req.body;

    if (!nome || !email || !senha || !sala) {
        return res.status(400).send("Preencha todos os campos");
    }

    const senhaHash = gerarSenha(senha);

    const sql = `
        INSERT INTO aluno (nome, email, senha, sala)
        VALUES (?, ?, ?, ?)
    `;

    const valores = [nome, email, senhaHash, sala];

    db.query(sql, valores, (erro, resultado) => {
        if (erro) {
            console.error("Erro ao cadastrar aluno:", erro);

            if (erro.code === "ER_DUP_ENTRY") {
                return res.status(409).send("Este e-mail já está cadastrado");
            }

            return res.status(500).send("Erro ao cadastrar aluno");
        }

        res.status(201).send("Aluno cadastrado com sucesso!");
    });
};

const loginAluno = (req, res) => {
    const { nome, email, senha, sala } = req.body;

    if (!nome || !email || !senha || !sala) {
        return res.status(400).json({
            mensagem: "Preencha todos os campos."
        });
    }

    const sql = `
        SELECT id_aluno, nome, email, senha, sala
        FROM aluno
        WHERE email = ?
    `;

    db.query(sql, [email], (erro, resultados) => {
        if (erro) {
            console.error("Erro ao consultar aluno:", erro);

            return res.status(500).json({
                mensagem: "Erro ao consultar o BD."
            });
        }

        if (resultados.length === 0) {
            return res.status(401).json({
                mensagem: "Dados de login incorretos."
            });
        }

        const aluno = resultados[0];

        const senhaCorreta = verificarSenha(senha, aluno.senha);

        if (
            aluno.nome !== nome ||
            aluno.sala !== sala ||
            !senhaCorreta
        ) {
            return res.status(401).json({
                mensagem: "Dados de login incorretos."
            });
        }

        res.json({
            mensagem: "Login realizado com sucesso!",
            aluno: {
                id_aluno: aluno.id_aluno,
                nome: aluno.nome,
                email: aluno.email,
                sala: aluno.sala
            }
        });
    });
};

module.exports = {
    rotaInicial,
    novoUsuario,
    listarUsuarios,
    loginAluno
};