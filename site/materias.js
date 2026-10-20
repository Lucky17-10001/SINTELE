let materias = JSON.parse(localStorage.getItem('materias')) || [];
let materiaAtualIndex = null;
function renderizarAbas() {
    const container = document.getElementById('containerAbas');
    container.innerHTML = '';

    if (materias.length === 0) {
        container.innerHTML = '<em>Nenhuma matéria cadastrada ainda.</em>';
        return;
    }

    materias.forEach((materia, index) => {
        const botaoAba = document.createElement('button');
        botaoAba.textContent = materia.nome;
        botaoAba.onclick = () => selecionarMateria(index);

        container.appendChild(botaoAba);
    });
}
function adicionarMateria() {
    const input = document.getElementById('nomeMateria');
    const nome = input.value.trim();

    if (!nome) {
        alert('Digite o nome da matéria');
        return;
    }
    materias.push({
        nome: nome,
        conteudos: []
    });
    salvarEAtualizar();
    input.value = '';
    selecionarMateria(materias.length - 1);
}
function selecionarMateria(index) {
    materiaAtualIndex = index;
    const materia = materias[index];
    const divConteudo = document.getElementById('conteudoMateria');

    let listaPostagensHTML = '';
    if (materia.conteudos.length === 0) {
        listaPostagensHTML = '<p>Nenhum conteúdo postado nesta matéria.</p>';
    } else {
        listaPostagensHTML = '<ul>' +
            materia.conteudos.map(item => `<li>${item}</li>`).join('') +
            '</ul>';
    }

    divConteudo.innerHTML = `
        <h2>Matéria: ${materia.nome}</h2>
        <div>
          <h4>Adicionar publicação/aula para ${materia.nome}:</h4>
          <input type="text" id="novoConteudo" placeholder="Conteúdo da aula, aviso ou tarefa">
          <button onclick="adicionarConteudo()">Postar</button>
        </div>
        <h3>Postagens da Matéria:</h3>
        ${listaPostagensHTML}
      `;
}
function adicionarConteudo() {
    if (materiaAtualIndex === null) return;
    const input = document.getElementById('novoConteudo');
    const texto = input.value.trim();
    if (!texto) {
        alert('Digite algum conteúdo para postar');
        return;
    }
    materias[materiaAtualIndex].conteudos.push(texto);
    salvarEAtualizar();
    selecionarMateria(materiaAtualIndex);
}
function salvarEAtualizar() {
    localStorage.setItem('materias', JSON.stringify(materias));
    renderizarAbas();
}
renderizarAbas();