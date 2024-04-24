const axios = require("axios");
const cheerio = require("cheerio");

async function main(username) {
    const seguindo = [];
    const followers = await fetch(`https://api.github.com/users/${username}/followers`);
    const dataFollowers = await followers.json();
    for (let i = 0; i < dataFollowers.length; i++) {
        seguindo.push(dataFollowers[i].login);
    }

    const seguidores = [];
    const following = await fetch(`https://api.github.com/users/${username}/following`);
    const dataFollowing = await following.json();
    for (let i = 0; i < dataFollowing.length; i++) {
        seguidores.push(dataFollowing[i].login);
    }

    for (let i = 0; i < seguindo.length; i++) {
        for (let j = 0; j < seguidores.length; j++) {
            if (seguindo[i] === seguidores[j]) {
                console.log(`Usuário: ${username} segue ${seguindo[i]} e é seguido por ${seguidores[j]}`);
            } else {
                console.log(`Usuário: ${username} segue ${seguindo[i]} e não é seguido por ${seguidores[j]}`);
            }
        }
    }

  }
  
  if (require.main === module) {
    main("Ton-Chyod-s");
  }