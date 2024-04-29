const seguidores = [];
async function funcSeguidores(username) {
    while (true) { 
        const respostaSeguidores = await fetch(`https://api.github.com/users/${username}/followers?page=${page}&per_page=${perPage}`, {
            headers: {
                'Authorization': `token ${token}`
            }
        });
        if (!respostaSeguidores.ok) {
            const erro = await respostaSeguidores.json();
            throw new Error(`GitHub API Error: ${erro.message}`);
        }
        const dataFollowers = await respostaSeguidores.json();
        for (let i = 0; i < dataFollowers.length; i++) {
            seguidores.push(dataFollowers[i].login);
        }
        if (dataFollowers.length < perPage) {
            break; 
        }
        page++;
    }
}
module.exports = { seguidores, funcSeguidores};