const uploadFoto = document.getElementById('uploadFoto');
const fotoPerfil = document.getElementById('fotoPerfil');

window.addEventListener('DOMContentLoaded', () => {
    const fotoSalva = localStorage.getItem('fotoSalvaAluno');

    if (fotoSalva) {
        fotoPerfil.src = fotoSalva;
    }
});

uploadFoto.addEventListener('change', function (event) {
    const arquivo = event.target.files[0];

    if (arquivo) {
        const leitor = new FileReader();

        leitor.onload = function (e) {
            const resultadoImagem = e.target.result;

            fotoPerfil.src = resultadoImagem;
            localStorage.setItem('fotoSalvaAluno', resultadoImagem);
        };

        leitor.readAsDataURL(arquivo);
    }
});