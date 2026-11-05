document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("login-professor");

    formulario.addEventListener("submit", async (evento) => {
        evento.preventDefault();

        const email = document.getElementById("email").value;
        const senha = document.getElementById("senha").value;

        try {
            const resposta = await fetch("http://localhost:3000/api/login-professor", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    senha: senha
                })
            });

            const dados = await resposta.json();

            if (resposta.ok) {
                alert(dados.mensagem);

                sessionStorage.setItem("professor", JSON.stringify(dados.professor));

                window.location.href = "indexprofessor.html";
            } else {
                alert(dados.mensagem);
            }

        } catch (erro) {
            console.error("Erro ao fazer login:", erro);
            alert("Não foi possível conectar ao servidor.");
        }
    });
});