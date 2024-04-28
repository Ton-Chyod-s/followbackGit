async function main(username) {
    const seguidores = [];
    const followersResponse = await fetch(`https://api.github.com/users/${username}/followers`);
    const dataFollowers = await followersResponse.json();
    for (let i = 0; i < dataFollowers.length; i++) {
        seguidores.push(dataFollowers[i].login);
    }

    const seguindo = [];
    const followingResponse = await fetch(`https://api.github.com/users/${username}/following`);
    const dataFollowing = await followingResponse.json();
    for (let i = 0; i < dataFollowing.length; i++) {
        seguindo.push(dataFollowing[i].login);
    }

    const seguidorMutuo = {};
    const naoSeguidor = {};

    for (let i = 0; i < seguindo.length; i++) {
        const segdo = seguindo[i];
        if (seguidores.includes(segdo)) {
            seguidorMutuo[`seguidor ${i}`] = segdo;
        } else {
            naoSeguidor[`seguidor ${i}`] = segdo;
        }
    }
    if (Object.keys(naoSeguidor).length === 0) {
        naoSeguidor["erro"] = "Todos seguidores estão seguindo de volta!";
    }
    return naoSeguidor;
}

module.exports = { main };

if (require.main === module) {
    (async () => {
        const result = await main("Emakiflom");
        console.log(result);
    })();
}
