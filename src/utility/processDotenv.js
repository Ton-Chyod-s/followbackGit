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

module.exports = { token, nome, senha };