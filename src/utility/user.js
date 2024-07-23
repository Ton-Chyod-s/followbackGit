const fs = require('node:fs');
const path = require('path');
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

async function user (email, senha) {
    // create file token.js
    if (!fs.existsSync(path.join(__dirname, 'key'))) {
        fs.mkdirSync(path.join(__dirname, 'key'));
    }

    // write usuario in file
    (function () {
        const token = `email = "${email}" ;\nsenha = "${senha}";\n\nmodule.exports = { email, senha };`
        const filePath = path.join(__dirname, 'key', 'usuario.js');
        fs.writeFile(filePath, token, 'utf8', function (err) {
            if (err) return console.log(err);
        });
    })();
}

// Código de exemplo para testar a função follow
if (require.main === module) {
    (async () => {
        const result = await user (nome, senha);
    })();
}