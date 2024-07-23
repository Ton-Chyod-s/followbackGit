const { funcSeguidores } = require('./utility/followers');
const { funcSeguir } = require('./utility/follow');
const { nome } = require('../utility/processDotenv');

async function main(username,ehVerdadeiro = false) {
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
            naoSeguidor[`seguidor ${i}`] = "No followers found!";
            return naoSeguidor;
        } else if (seguidores.includes(segdo)) {
            seguidorMutuo[`seguidor ${i}`] = segdo;
        } else {
            naoSeguidor[`seguidor ${i}`] = segdo;
        }
    }
    if (Object.keys(naoSeguidor).length === 0 && numSeguidor === 1) {
        naoSeguidor["erro"] = "All followers are following back!";
    } else {
        if (seguindo.length === 0) {
            naoSeguidor["erro"] = "No followers found!";
        }
    }
    if (ehVerdadeiro) {
        return seguidorMutuo;
    } else {
        return naoSeguidor;
    }
}

module.exports = { main };

if (require.main === module) {
    (async () => {
        const result = await main(nome);
        console.log(result);
    })();
}
