document.addEventListener("DOMContentLoaded", () => {
    const gridAtividades = document.querySelector(".grid-atividades");
    const modal = document.getElementById("upload-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-desc");
    const closeModal = document.querySelector(".close-modal");
    const formEnvio = document.getElementById("form-envio");
    const respostaInput = document.getElementById("resposta-tarefa");

    let activeTaskId = null;
    let atividades = [];

    function carregarAtividades() {
        fetch("http://localhost:3000/api/activities")
            .then(res => {
                if (!res.ok) {
                    throw new Error("Erro ao buscar atividades.");
                }

                return res.json();
            })
            .then(data => {
                atividades = data;
                renderizarAtividades();
            })
            .catch(erro => {
                console.error("Erro ao carregar atividades:", erro);
            });
    }

    function renderizarAtividades() {
        gridAtividades.innerHTML = "";

        atividades.forEach(atividade => {
            const card = document.createElement("article");
            card.className = "card-atividade";
            card.dataset.id = atividade.id;

            const materia = document.createElement("span");
            materia.className = "materia";
            materia.textContent = atividade.materia;

            const titulo = document.createElement("h3");
            titulo.textContent = atividade.titulo;

            const descricao = document.createElement("p");
            descricao.textContent = atividade.descricao;

            const badge = document.createElement("div");
            badge.className = "badge pendente";
            badge.textContent = "Pendente";

            const conteudo = document.createElement("div");
            conteudo.className = "conteudo-card";

            const prazo = document.createElement("div");
            prazo.className = "meta-info";

            const prazoTexto = document.createElement("span");
            prazoTexto.textContent = `📅 Prazo: ${atividade.data_entrega}`;

            prazo.appendChild(prazoTexto);

            conteudo.append(materia, titulo, descricao, prazo);

            const botao = document.createElement("a");
            botao.href = "#";
            botao.className = "btn-enviar";
            botao.textContent = "Enviar Tarefa";

            card.append(badge, conteudo, botao);
            gridAtividades.appendChild(card);
        });
    }

    gridAtividades.addEventListener("click", evento => {
        const botao = evento.target.closest(".btn-enviar");

        if (!botao) return;

        evento.preventDefault();

        const card = botao.closest(".card-atividade");
        activeTaskId = card.dataset.id;

        const atividade = atividades.find(
            item => String(item.id) === String(activeTaskId)
        );

        if (!atividade) return;

        modalTitle.textContent = `Enviar: ${atividade.titulo}`;
        modalDesc.textContent = "Digite sua resolução no campo abaixo.";

        formEnvio.reset();
        modal.classList.remove("hidden");
    });

    closeModal.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    window.addEventListener("click", evento => {
        if (evento.target === modal) {
            modal.classList.add("hidden");
        }
    });

    formEnvio.addEventListener("submit", async evento => {
        evento.preventDefault();

        const resposta = respostaInput.value.trim();

        if (!resposta) {
            alert("Digite sua resposta antes de enviar.");
            return;
        }

        const alunoSalvo = sessionStorage.getItem("aluno");

        if (!alunoSalvo) {
            alert("Aluno não identificado. Faça login novamente.");
            return;
        }

        const aluno = JSON.parse(alunoSalvo);

        try {
            const resultado = await fetch(
                `http://localhost:3000/api/entrega/${activeTaskId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        id_aluno: aluno.id_aluno,
                        resposta: resposta
                    })
                }
            );

            const dados = await resultado.json();

            if (resultado.ok) {
                alert(dados.mensagem);
                modal.classList.add("hidden");
                formEnvio.reset();
            } else {
                alert(dados.mensagem);
            }

        } catch (erro) {
            console.error("Erro ao enviar resposta:", erro);
            alert("Não foi possível conectar ao servidor.");
        }
    });

    carregarAtividades();
});