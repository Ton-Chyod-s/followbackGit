const { token } = require('./chave/token');

const perPage = 500; // Número de resultados por página
let page = 1; // Inicializa a página para o primeiro loop

async function main(username) {
    const seguidores = [];
    while (true) { 
        const respostaSeguidores = await fetch(`https://api.github.com/users/${username}/followers?page=${page}&per_page=${perPage}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        });
        if (!respostaSeguidores.ok) {
            const erro = await respostaSeguidores.json();
            throw new Error(`GitHub API Error: ${erro.message}`);
        }
        const dataFollowers = await respostaSeguidores.json();
        for (let i = 0; i < dataFollowers.length; i++) {
            seguidores.push(dataFollowers[i].login);
        }
        if (dataFollowers.length < perPage) {
            break; 
        }
        page++;
    }

    const seguindo = [];
    while (true) {   
            const respostaSeguindo = await fetch(`https://api.github.com/users/${username}/following?page=${page}&per_page=${perPage}`, {
        headers: {
            'Authorization': `token ${token}`
            }
        });
        if (!respostaSeguindo.ok) {
            const erro = await respostaSeguindo.json();
            throw new Error(`GitHub API Error: ${erro.message}`);
        }
        const dataFollowing = await respostaSeguindo.json();
        for (let i = 0; i < dataFollowing.length; i++) {
            seguindo.push(dataFollowing[i].login);
        };
        if (dataFollowing.length < perPage) {
            break; 
        }
        page++;
    }

    const seguidorMutuo = {};
    const naoSeguidor = {};
    let numSeguidor = 0;

    for (let i = 0; i <= seguindo.length; i++) {
        const segdo = seguindo[i];
        if (i >= seguindo.length) {
            numSeguidor ++;
            break;
        } else if (segdo === undefined) {
            naoSeguidor[`seguidor ${i}`] = "Nenhum seguidor encontrado!";
            return naoSeguidor;
        } else if (seguidores.includes(segdo)) {
            seguidorMutuo[`seguidor ${i}`] = segdo;
        } else {
            naoSeguidor[`seguidor ${i}`] = segdo;
        }
    }
    if (Object.keys(naoSeguidor).length === 0 && numSeguidor === 1) {
        naoSeguidor["erro"] = "Todos seguidores estão seguindo de volta!";
    } else {
        if (seguindo.length === 0) {
            naoSeguidor["erro"] = "Nenhum seguidor encontrado!";
        }
    }
    return naoSeguidor;
}

module.exports = { main };

if (require.main === module) {
    (async () => {
        const result = await main("Ton-Chyod-s");
        console.log(result);
    })();
}
