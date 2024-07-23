const { page, perPage } = require('./qtdePG');

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
const token = process.env.TOKEN;

async function funcSeguir(username) {
    const seguindo = [];
    while (true) {   
            const respostaSeguindo = await fetch(`https://api.github.com/users/${username}/following?page=${page}&per_page=${perPage}`, {
        // headers: {
        //     'Authorization': `token ${token}`
        //     }
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
        const result = await funcSeguir(nome);
        console.log(result);
    })();
}