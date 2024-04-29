const { token } = require('./chave/token');
const { seguidores, funcSeguidores } = require('./utilitario/seguidores');

const perPage = 500; // Número de resultados por página
const page = 1; // Inicializa a página para o primeiro loop

async function unfollow(username) {
    funcSeguidores(username);
    seguidores
}