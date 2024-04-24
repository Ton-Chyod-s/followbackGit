const axios = require("axios");
const cheerio = require("cheerio");

async function main(username) {
    const perfil = await fetch(`https://api.github.com/users/${username}`);
    const data = await perfil.json();
    const seguidores = `${data.following}`

   
    
  }
  
  if (require.main === module) {
    main("Ton-Chyod-s");
  }