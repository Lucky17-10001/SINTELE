document.addEventListener("DOMContentLoaded", () => {
    let taskSubmissions = {};
    let teacherGrades = {};
    let customActivities = [];

    const baseActivities = [
        { id: "1", title: "Exercícios de Estequiometria", materia: "Estequiometria" },
        { id: "2", title: "Exercícios de Termoquímica", materia: "Termoquímica" },
        { id: "3", title: "Conceito de Soluto e Solvente", materia: "Soluções" }
    ];

    let allActivities = [...baseActivities, ...customActivities];

    const formCriar = document.getElementById("form-criar-atividade");
    const listaEntregas = document.getElementById("lista-entregas");

    function loadDashboardData() {
        fetch("http://localhost:3000/api/dashboard")
            .then(res => res.json())
            .then(data => {
                taskSubmissions = data.submissions || {};
                teacherGrades = data.teacherGrades || {};
                customActivities = data.customActivities || [];
                renderSubmissionsMonitor();
            })
            .catch(err => console.error("Erro ao sincronizar dados com o backend:", err));
    }

    function renderSubmissionsMonitor() {
        listaEntregas.innerHTML = "";
        allActivities = [...baseActivities, ...customActivities];

        allActivities.forEach(activity => {
            const row = document.createElement("div");
            const submission = taskSubmissions[activity.id];
            const currentGrade = teacherGrades[activity.id] || "";

            if (submission) {
                const fileName = typeof submission === 'object' ? submission.name : submission;
                const fileUrl = typeof submission === 'object' ? submission.url : "#";
                const targetAttr = typeof submission === 'object' ? 'target="_blank" download' : '';

                row.className = "entrega-row entregue";
                row.innerHTML = `
                    <div class="entrega-header">
                        <span>📚 Módulo: ${activity.materia}</span>
                        <span style="color: #10b981;">✔️ Entregue</span>
                    </div>
                    <h3>${activity.title}</h3>
                    
                    <!-- 🌟 LINK REAL PARA DOWNLOAD DIRETO DO SERVIDOR BACKEND -->
                    <div class="entrega-arquivo">
                        📂 Arquivo do Aluno: 
                        <a href="${submission.url}" target="_blank" rel="noopener noreferrer" style="color: #2563eb; font-weight: bold; text-decoration: underline; margin-left: 5px;">
                            ${submission.name}
                        </a>
                    </div>
                    
                    <div class="grade-section">
                        <label for="grade-${activity.id}">Nota:</label>
                        <input type="text" id="grade-${activity.id}" class="grade-input" placeholder="Ex: 9.5" value="${currentGrade}">
                        <button class="btn-nota" data-id="${activity.id}">Salvar Nota</button>
                    </div>
                `;
            } else {
                row.className = "entrega-row";
                row.innerHTML = `
                    <div class="entrega-header">
                        <span>📚 Módulo: ${activity.materia}</span>
                        <span style="color: #64748b;">⏳ Pendente</span>
                    </div>
                    <h3>${activity.title}</h3>
                    <p style="font-size: 13px; color:#94a3b8;">Nenhum estudante enviou resolução para esta tarefa ainda.</p>
                `;
            }
            listaEntregas.appendChild(row);
        });
    }

    listaEntregas.addEventListener("click", (e) => {
        if (e.target.classList.contains("btn-nota")) {
            const taskId = e.target.getAttribute("data-id");
            const inputField = document.getElementById(`grade-${taskId}`);
            const gradeValue = inputField.value.trim();

            if (gradeValue === "") {
                alert("Por favor, digite uma nota válida.");
                return;
            }

            fetch(`http://localhost:3000/api/grade/${taskId}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ grade: gradeValue })
            })
            .then(res => res.json())
            .then(data => {
                alert("Nota registrada com sucesso no backend!");
                loadDashboardData();
            })
            .catch(err => console.error("Erro ao registrar nota:", err));
        }
    });

    formCriar.addEventListener("submit", (e) => {
        e.preventDefault();

        const materia = document.getElementById("nova-materia").value;
        const title = document.getElementById("novo-titulo").value;

        fetch("http://localhost:3000/api/activity", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, materia })
        })
        .then(res => res.json())
        .then(data => {
            alert(`Sucesso! A atividade "${title}" foi salva e publicada.`);
            formCriar.reset();
            loadDashboardData();
        })
        .catch(err => console.error("Erro ao criar nova atividade:", err));
    });

    setInterval(loadDashboardData, 3000);

    loadDashboardData();
});