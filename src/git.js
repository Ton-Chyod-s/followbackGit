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
    const seguidorMutuo = [];
    const naoSeguidor = [];
    let cont = 0;
    for (let i = 0; i < seguindo.length; i++) {
        for (let j = 0; j < seguidores.length; j++) {
            const segdo = seguindo[i];
            const segdores = seguidores[j];
            if (segdo === segdores) {
                cont += 1;
                seguidorMutuo.push(seguindo[i]);
                break
            }
        }
        if (cont === 0) {
            naoSeguidor.push(seguindo[i]);
        }
        cont = 0;
    }
    return naoSeguidor;
}

module.exports = { main };

if (require.main === module) {
    (async () => {
        const result = await main("Ton-Chyod-s");
        console.log(result);
    })();
}