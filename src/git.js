const { funcSeguidores } = require('./utility/followers');
const { funcSeguir } = require('./utility/follow');

async function main(username) {
    const seguidores = await funcSeguidores(username);
    const seguindo = await funcSeguir(username);

    const seguidorMutuo = {};
    const naoSeguidor = {};
    let numSeguidor = 0;

    for (let i = 0; i <= seguindo.length; i++) {
        const segdo = seguindo[i];
        if (i >= seguindo.length) {
            numSeguidor ++;
            break;
        } else if (segdo === undefined) {
            naoSeguidor[`seguidor ${i}`] = "Nenhum seguidor encontrado!";
            return naoSeguidor;
        } else if (seguidores.includes(segdo)) {
            seguidorMutuo[`seguidor ${i}`] = segdo;
        } else {
            naoSeguidor[`seguidor ${i}`] = segdo;
        }
    }
    if (Object.keys(naoSeguidor).length === 0 && numSeguidor === 1) {
        naoSeguidor["erro"] = "Todos seguidores estão seguindo de volta!";
    } else {
        if (seguindo.length === 0) {
            naoSeguidor["erro"] = "Nenhum seguidor encontrado!";
        }
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
