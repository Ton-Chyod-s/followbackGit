const { page, perPage } = require('../utility/qtdePG');

// se for true, o teste será feito, se for false, entrera em produção
const on =  false;

let arg = ".env";
if ( on === true ) {
    arg = ".env.testing"
}

require('dotenv').config({  
    path: process.env.NODE_ENV !== "main" ? arg : ".env"
  })

const nome = process.env.USER;
const senha = process.env.PASSWORD;
const token = process.env.KEY;

async function funcSeguidores(username) {
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
    return seguidores;
}
module.exports = { funcSeguidores };

// Código de exemplo para testar a função follow
if (require.main === module) {
    (async () => {
        const result = await funcSeguidores(nome);
        console.log(result);
    })();
}