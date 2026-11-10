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

const enviarEntrega = (req, res) => {
    const { id } = req.params;
    const { id_aluno, resposta } = req.body;

    if (!id_aluno || !resposta || !resposta.trim()) {
        return res.status(400).json({
            mensagem: "Preencha o campo de resposta."
        });
    }

    const sql = `
        INSERT INTO entrega (id_aluno, id_atividade, resposta)
        VALUES (?, ?, ?)
    `;

    db.query(sql, [id_aluno, id, resposta], (erro, resultado) => {
        if (erro) {
            console.error("Erro ao salvar entrega:", erro);

            if (erro.code === "ER_DUP_ENTRY") {
                return res.status(409).json({
                    mensagem: "Você já enviou uma resposta para esta atividade."
                });
            }

            if (erro.code === "ER_NO_REFERENCED_ROW_2") {
                return res.status(400).json({
                    mensagem: "Aluno ou atividade não encontrado."
                });
            }

            return res.status(500).json({
                mensagem: "Erro ao salvar a entrega."
            });
        }

        res.status(201).json({
            mensagem: "Resposta enviada com sucesso!",
            id: resultado.insertId
        });
    });
};

const listarEntregas = (req, res) => {
    const sql = `
        SELECT
            entrega.id AS id_entrega,
            entrega.resposta,
            entrega.nota,
            entrega.data_envio,
            aluno.nome AS nome_aluno,
            aluno.sala,
            atividade.titulo AS titulo_atividade,
            atividade.materia
        FROM entrega
        INNER JOIN aluno ON entrega.id_aluno = aluno.id_aluno
        INNER JOIN atividade ON entrega.id_atividade = atividade.id
        ORDER BY entrega.data_envio DESC
    `;

    db.query(sql, (erro, resultados) => {
        if (erro) {
            console.error("Erro ao listar entregas:", erro);

            return res.status(500).json({
                mensagem: "Erro ao consultar entregas."
            });
        }

        res.json(resultados);
    });
};

module.exports = {
    criarAtividade,
    listarAtividades,
    enviarEntrega,
    listarEntregas
};