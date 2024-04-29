const { token } = require('./key/token');

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
    let mesmoSeguidor = [];
    let novosSeguidores = [];
    // verificando ja se esta seguindo e formando um lista se ja segue
    for (let i = 0; i < seguidores.length; i++) {
        if (seguidores[i] !== user) {
            if (seguindo.includes(seguidores[i])) {
                mesmoSeguidor.push(seguidores[i]);
            } else {
                novosSeguidores.push(seguidores[i]);
            }}
    }

    // seguir usuario selecionado na lista seguindo 
    for (let i = 0; i < novosSeguidores.length; i++) {
        try {
            await fetch(`https://api.github.com/user/following/${novosSeguidores[i]}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${token}`
                    }
            });
        } catch (error) {
            console.error('Erro ao seguir o usuário', error);
        }
    }
    if (novosSeguidores.length === 0) {
        const msg = {
            'error': "Nenhum novo seguidor encontrado!"
        };
        return msg;
    } else {
        return novosSeguidores;}
}

module.exports = { follow };


// Código de exemplo para testar a função follow
if (require.main === module) {
    (async () => {
        const result = await follow("silvniv", "Ton-Chyod-s");
        console.log(result);
    })();
}
