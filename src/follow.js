const { token } = require('./key/token');
const { funcSeguidores } = require('./utility/followers');
const { funcSeguir } = require('./utility/follow');

async function follow(username, user) {
    const seguidores = await funcSeguidores(username);
    const seguindo = await funcSeguir(username);

    for (let i = 0; i <= seguindo.length; i++) {
        const segdo = seguindo[i];
        if (i >= seguindo.length) {
            break;
        } else if (segdo === undefined) {
            return "Nenhum seguidor encontrado!";
        }
    }
    let mesmoSeguidor = [];
    let novosSeguidores = [];
    
    // verificando ja se esta seguindo e formando um lista se ja segue
    for (let i = 0; i < seguidores.length; i++) {
        if (seguidores[i] !== user) {
            if (seguindo.includes(seguidores[i])) {
                mesmoSeguidor.push(seguidores[i]);
            } else {
                novosSeguidores.push(seguidores[i]);
            }}
    }

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
            console.error('Erro ao seguir o usuário', error);
        }
    }
    if (novosSeguidores.length === 0) {
        const msg = {
            'error': "Nenhum novo seguidor encontrado!"
        };
        return msg;
    } else {
        return novosSeguidores;}
}

module.exports = { follow };

// Código de exemplo para testar a função follow
if (require.main === module) {
    (async () => {
        const result = await follow("silvniv", "Ton-Chyod-s");
        console.log(result);
    })();
}
