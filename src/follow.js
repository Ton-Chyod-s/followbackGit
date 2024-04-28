<<<<<<< HEAD
async function follow(username) {
    const seguidores = [];
    const followersResponse = await fetch(`https://api.github.com/users/${username}/followers`);
    const dataFollowers = await followersResponse.json();
    for (let i = 0; i < dataFollowers.length; i++) {
        seguidores.push(dataFollowers[i].login);
    }

    for (let i = 0; i < seguidores.length; i++) {
        const followResponse = await fetch(`https://api.github.com/user/following/${seguidores[i]}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `token ${token}`
                }
            });
            if (!followResponse.ok) {
                console.error(`Erro ao seguir ${seguidores[i]}`);
            }
        }
    }

if (require.main === module) {
    (async () => {
        const result = await follow("Emakiflom");
        console.log(result);
    })();
}

// https://github.com/settings/tokens 
=======
// lol
>>>>>>> parent of 9c93934 (doc: att)
