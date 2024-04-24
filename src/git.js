async function main(username) {
    const seguidores = [];
    const followers = await fetch(`https://api.github.com/users/${username}/followers`);
    const dataFollowers = await followers.json();
    for (let i = 0; i < dataFollowers.length; i++) {
        seguidores.push(dataFollowers[i].login);
    }

    const seguindo = [];
    const following = await fetch(`https://api.github.com/users/${username}/following`);
    const dataFollowing = await following.json();
    for (let i = 0; i < dataFollowing.length; i++) {
        seguindo.push(dataFollowing[i].login);
    }
    const seguidorMutuo = {};
    const naoSeguidor = {};
    let cont = 0;
    for (let i = 0; i < seguindo.length; i++) {
        for (let j = 0; j < seguidores.length; j++) {
            const segdores = seguidores[i];
            const segdo = seguindo[j];
            if (segdo === segdores) {
                cont += 1;
                seguidorMutuo[`nome${i}`] = seguidores[i];
                break
            }
        }
        if (cont === 0) {
        naoSeguidor[`nome${i}`] = seguidores[i];
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