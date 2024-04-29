const { token } = require('./chave/token');

const perPage = 500; // Número de resultados por página
let page = 1; // Inicializa a página para o primeiro loop

async function follow(username, user) {
    // verificando os seguidores do usuario 1
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
    // verificando os usuarios seguidores do usuario 2
    const seguindo = [];
    while (true) {   
            const respostaSeguindo = await fetch(`https://api.github.com/users/${user}/following?page=${page}&per_page=${perPage}`, {
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
    for (let i = 0; i <= seguindo.length; i++) {
        const segdo = seguindo[i];
        if (i >= seguindo.length) {
            break;
        } else if (segdo === undefined) {
            return "Nenhum seguidor encontrado!";
        }
    }

    // verificando ja se esta seguindo e formando um lista se ja segue
    for (let i = 0; i < seguidores.length; i++) {
        if (seguindo.includes(seguidores[i])) {
            seguindo.pop(i);
        }
    }

    // seguir usuario selecionado na lista seguindo 
    for (let i = 0; i < seguindo.length; i++) {
        await fetch(`https://api.github.com/user/following/${seguindo[i]}`, {
        method: 'PUT',
        headers: {
            'Authorization': `token ${token}`
            }
        });
    }   
}

module.exports = { follow };

// Código de exemplo para testar a função follow
if (require.main === module) {
    (async () => {
        const result = await follow("silvniv", "Ton-Chyod-s");
        console.log(result);
    })();
}
