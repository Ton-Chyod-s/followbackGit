const { main } = require("./checkFollower");
const axios = require('axios');
const { token } = require('./key/token');

async function unfollow(username) {
    const followers = await main(username);
    let deixouDeSeguir = [];
    let naoDeixouDeSeguir = [];

    for (let i in followers) {
        // console.log(followers[i])
        axios.delete(`https://api.github.com/user/following/${followers[i]}`, {
            headers: {
                'Authorization': `token ${token}`,
            }
        }).then(response => {
            deixouDeSeguir.push(`${followers[i]}`);
        }).catch(error => {
            naoDeixouDeSeguir.push(`${followers[i]}`);
        });

        if (deixouDeSeguir.length === 0) {
            return naoDeixouDeSeguir;
        } else {
            return deixouDeSeguir;
        }
    }
}

if (require.main === module) {
    (async () => {
        const result = await unfollow("silvniv");
        console.log(result);
    })();
}