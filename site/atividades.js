document.addEventListener("DOMContentLoaded", () => {
    let taskSubmissions = JSON.parse(localStorage.getItem("taskSubmissions")) || {};

    const cards = document.querySelectorAll(".card-atividade");
    
    const modal = document.getElementById("upload-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalDesc = document.getElementById("modal-desc");
    const closeModal = document.querySelector(".close-modal");
    const formEnvio = document.getElementById("form-envio");
    const fileInput = document.getElementById("arquivo-tarefa");
    const dropZone = document.querySelector(".drop-zone");
    const fileInfo = document.getElementById("file-info");
    const fileNameSpan = document.getElementById("file-name");

    let activeTaskId = null; 
    cards.forEach(card => {
        const taskId = card.getAttribute("data-id");
        if (taskSubmissions[taskId]) {
            setCardToCompleted(card);
        }
    });

    document.addEventListener("click", (event) => {
        if (event.target.classList.contains("btn-enviar")) {
            event.preventDefault();
            const button = event.target;
            const card = button.closest(".card-atividade");
            const taskId = card.getAttribute("data-id");
            const taskTitle = card.querySelector("h3").textContent;

            if (button.classList.contains("disabled")) {
                const savedFileName = taskSubmissions[taskId] || "Arquivo enviado anteriormente (padrão do sistema).";
                alert(`Tarefa já enviada!\nArquivo entregue: ${savedFileName}`);
                return;
            }

            activeTaskId = taskId;
            modalTitle.textContent = `Enviar: ${taskTitle}`;
            modalDesc.textContent = "Selecione o arquivo contendo a resolução dos seus exercícios.";
            
            formEnvio.reset();
            fileInfo.classList.add("hidden");
            modal.classList.remove("hidden");
        }
    });

    closeModal.addEventListener("click", () => modal.classList.add("hidden"));
    window.addEventListener("click", (e) => { if (e.target === modal) modal.classList.add("hidden"); });

    dropZone.addEventListener("click", () => fileInput.click());

    fileInput.addEventListener("change", () => {
        if (fileInput.files.length > 0) {
            fileNameSpan.textContent = fileInput.files[0].name; 
            fileInfo.classList.remove("hidden");
        }
    });

    formEnvio.addEventListener("submit", (event) => {
        event.preventDefault();
        if (fileInput.files.length === 0) return;

        const uploadedFileName = fileInput.files[0].name; 
        
        taskSubmissions[activeTaskId] = uploadedFileName;
        localStorage.setItem("taskSubmissions", JSON.stringify(taskSubmissions));

        const targetCard = document.querySelector(`.card-atividade[data-id="${activeTaskId}"]`);
        setCardToCompleted(targetCard);

        modal.classList.add("hidden");
    });

    function setCardToCompleted(card) {
        card.className = "card-atividade concluida";
        const badge = card.querySelector(".badge");
        badge.className = "badge sucesso";
        badge.textContent = "Concluída";
        const metaInfo = card.querySelector(".meta-info span");
        metaInfo.textContent = "📅 Entregue";
        const button = card.querySelector(".btn-enviar");
        button.className = "btn-enviar disabled";
        button.textContent = "Visualizar Envio";
    }
});
