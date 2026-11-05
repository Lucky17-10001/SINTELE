const db = require("../database");

const criarAtividade = (req, res) => {
    const { titulo, descricao, data_entrega, materia, id_professor } = req.body;

    if (!titulo || !descricao || !data_entrega || !materia || !id_professor) {
        return res.status(400).json({
            mensagem: "Preencha todos os campos."
        });
    }

    const sql = `
        INSERT INTO atividade
        (titulo, descricao, data_entrega, materia, id_professor)
        VALUES (?, ?, ?, ?, ?)
    `;

    const valores = [titulo, descricao, data_entrega, materia, id_professor];

    db.query(sql, valores, (erro, resultado) => {
        if (erro) {
            console.error("Erro ao criar atividade:", erro);

            return res.status(500).json({
                mensagem: "Erro ao salvar atividade."
            });
        }

        res.status(201).json({
            mensagem: "Atividade criada com sucesso!",
            id: resultado.insertId
        });
    });
};

const listarAtividades = (req, res) => {
    const sql = `
        SELECT atividade.*, professor.nome AS nome_professor
        FROM atividade
        INNER JOIN professor ON atividade.id_professor = professor.id
        ORDER BY atividade.id DESC
    `;

    db.query(sql, (erro, resultados) => {
        if (erro) {
            console.error("Erro ao listar atividades:", erro);

            return res.status(500).json({
                mensagem: "Erro ao consultar atividades."
            });
        }

        res.json(resultados);
    });
};

module.exports = {
    criarAtividade,
    listarAtividades
};