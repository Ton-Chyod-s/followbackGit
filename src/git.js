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

    console.log(seguindo);
    console.log(seguidores);




    
  }
  
  if (require.main === module) {
    main("Ton-Chyod-s");
  }