const { token, nome } = require('../utility/processDotenv');
const { funcSeguidores } = require('./utility/followers');
const { funcSeguir } = require('./utility/follow');

async function follow(username, user) {
    const seguidores = await funcSeguidores(username);
    const seguindo = await funcSeguir(user);
   
    let novosSeguidores = [];

    // verificando ja se esta seguindo e formando um lista se ja segue
    for (let i = 0; i < seguidores.length; i++) {
        if (seguidores[i] !== user) {
            if (!seguindo.includes(seguidores[i])) {
                    novosSeguidores.push(seguidores[i]);
                }
            }}

    // seguir usuario selecionado na lista seguindo 
    for (let i = 0; i < novosSeguidores.length; i++) {
        try {
            await fetch(`https://api.github.com/user/following/${novosSeguidores[i]}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${token}`
                    }
            });
        } catch (error) {
            console.error("Error following user.", error);
        }
    }
    if ( novosSeguidores.length === 0 ) {
        const msg = {
            'error': "No new followers found!"
        };
        return msg;
    } else {
        return novosSeguidores;}
}

module.exports = { follow };

// Código de exemplo para testar a função follow
if (require.main === module) {
    (async () => {
        const result = await follow("cristianoAbudu", nome);
        console.log(result);
    })();
}