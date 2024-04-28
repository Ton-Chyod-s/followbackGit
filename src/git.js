const { token } = require('./chave/token');

const perPage = 500; // Número de resultados por página
let page = 1; // Inicializa a página para o primeiro loop

async function main(username) {
    const seguidores = [];
    const followersResponse = await fetch(`https://api.github.com/users/${username}/followers`, {
        headers: {
            'Authorization': `token ${token}`
        }
    });
    const dataFollowers = await followersResponse.json();
    for (let i = 0; i < dataFollowers.length; i++) {
        seguidores.push(dataFollowers[i].login);
    }

    const seguindo = [];
    const followingResponse = await fetch(`https://api.github.com/users/${username}/following`, {
        headers: {
            'Authorization': `token ${token}`
        }
    });
    const dataFollowing = await followingResponse.json();
    for (let i = 0; i < dataFollowing.length; i++) {
        seguindo.push(dataFollowing[i].login);
    };

    const seguidorMutuo = {};
    const naoSeguidor = {};

    for (let i = 0; i < seguindo.length; i++) {
        const segdo = seguindo[i];
        if (seguidores.includes(segdo)) {
            seguidorMutuo[`seguidor ${i}`] = segdo;
        } else {
            naoSeguidor[`seguidor ${i}`] = segdo;
        }
    }
    if (Object.keys(naoSeguidor).length === 0) {
        naoSeguidor["erro"] = "Todos seguidores estão seguindo de volta!";
    }
    return naoSeguidor;
}

module.exports = { main };

if (require.main === module) {
    (async () => {
        const result = await main("silvniv");
        console.log(result);
    })();
}
