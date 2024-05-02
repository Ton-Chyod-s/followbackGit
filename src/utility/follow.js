const { page, perPage } = require('./qtdePG');
const { token } = require('./utility/key/token');

async function funcSeguir(username) {
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
    return seguindo;
}

module.exports = { funcSeguir };

// Código de exemplo para testar a função follow
if (require.main === module) {
    (async () => {
        const result = await funcSeguir("Ton-Chyod-s");
        console.log(result);
    })();
}