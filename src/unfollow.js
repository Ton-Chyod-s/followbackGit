const { funcSeguidores } = require('./utility/followers');
const { funcSeguir } = require('./utility/follow');

async function unfollow(username) {
    const seguidores = await funcSeguidores(username);
    const seguindo = await funcSeguir(username);

    return "Tudo oks!"
}

unfollow("silvniv")

if (require.main === module) {
    (async () => {
        const result = await unfollow("silvniv");
        console.log(result);
    })();
}