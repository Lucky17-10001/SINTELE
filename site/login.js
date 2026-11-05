document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("login-aluno");

    formulario.addEventListener("submit", async (evento) => {
        evento.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const sala = document.getElementById("sala").value;

        try {
            const resposta = await fetch("http://localhost:3000/api/login-aluno", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nome: nome,
                    email: email,
                    senha: senha,
                    sala: sala
                })
            });

            const dados = await resposta.json();

            if (resposta.ok) {
                alert(dados.mensagem);
                sessionStorage.setItem("aluno", JSON.stringify(dados.aluno));
                window.location.href = "index.html";
            } else {
                alert(dados.mensagem);
            }

        } catch (erro) {
            console.error("Erro ao fazer login:", erro);
            alert("Não foi possível conectar ao servidor.");
        }
    });
});