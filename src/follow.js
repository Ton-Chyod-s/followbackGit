const { token } = require('./chave/token');

const perPage = 500; // Número de resultados por página
let page = 1; // Inicializa a página para o primeiro loop

async function follow(username, user) {
    while (true) {
        const seguidores = [];
        const followersResponse = await fetch(`https://api.github.com/users/${username}/followers?page=${page}&per_page=${perPage}`,{
            headers: {
                'Authorization': `token ${token}`
            }
        });
        if (!followersResponse.ok) {
            console.error(`Erro ao buscar seguidores de ${username}`);
            return;
        }

        const dataFollowers = await followersResponse.json();
        for (let i = 0; i < dataFollowers.length; i++) {
            seguidores.push(dataFollowers[i].login);
        }

        for (let i = 0; i < seguidores.length; i++) {
            const followResponse = await fetch(`https://api.github.com/user/following/${seguidores[i]}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${token}`
                }
            });
            if (!followResponse.ok) {
                // console.error(`Erro ao seguir ${seguidores[i]}`);
                const seguindo = [];
                const followingResponse = await fetch(`https://api.github.com/users/${user}/following`,{
                    headers: {
                        'Authorization': `token ${token}`
                    }
                });
                const dataFollowing = await followingResponse.json();
                for (let i = 0; i < dataFollowing.length; i++) {
                    seguindo.push(dataFollowing[i].login);
                }
            } 
        }
        page++;
    }
}

module.exports = { follow };

// Código de exemplo para testar a função follow
if (require.main === module) {
    (async () => {
        const result = await follow("programadorLhama", "silvniv");
        console.log(result);
    })();
}
