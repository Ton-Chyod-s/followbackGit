const axios = require("axios");
const cheerio = require("cheerio");

async function main(username) {
    const siteSeguindo = 'https://github.com/Ton-Chyod-s?tab=followers'
    const siteSeguidores = 'https://github.com/Ton-Chyod-s?tab=following'

    const perfil = await fetch(`https://api.github.com/users/${username}`);
    const data = await perfil.json();
    const seguidores = `${data.following}`

    const responseSeguindo = await axios.get(siteSeguindo);
    const $Seguindo = cheerio.load(responseSeguindo.data);
    const cards = $Seguindo(".js-profile-following");

    const responseSeguidores = await axios.get(siteSeguidores);
    const $Seguidores = cheerio.load(responseSeguidores.data);
  }
  
  if (require.main === module) {
    main("Ton-Chyod-s");
  }