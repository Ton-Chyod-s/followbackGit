const { main } = require("./checkFollower");
const axios = require('axios');
const { token } = require('./key/token');

async function unfollow(username) {
    const followers = await main(username);
    for (let i in followers) {
        // console.log(followers[i])
        axios.delete(`https://api.github.com/user/following/${followers[i]}`, {
            headers: {
                'Authorization': `token ${token}`,
            }
        }).then(response => {
            console.log(`Você deixou de seguir o usuário ${followers[i]}`);
        }).catch(error => {
            console.error("Error unfollowing user.", error);
        });

    }
}

if (require.main === module) {
    (async () => {
        const result = await unfollow("silvniv");
    })();
}