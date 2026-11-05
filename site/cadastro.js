document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("form-cadastro");

    formulario.addEventListener("submit", async (evento) => {
        evento.preventDefault();

        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;
        const sala = document.getElementById("sala").value;

        try {
            const resposta = await fetch("http://localhost:3000/api/usuario", {
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

            const mensagem = await resposta.text();

            if (resposta.ok) {
                alert(mensagem);
                window.location.href = "index.html";
            } else {
                alert(mensagem);
            }

        } catch (erro) {
            console.error("Erro ao cadastrar:", erro);
            alert("Não foi possível conectar ao servidor.");
        }
    });
});