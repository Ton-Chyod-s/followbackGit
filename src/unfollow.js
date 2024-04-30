const { main } = require("./checkFollower");
const { token } = require('./key/token');
const axios = require('axios');

async function unfollow(username) {
    const followers = await main(username);
    let deixouDeSeguir = new Array();
    let naoDeixouDeSeguir = new Array();

    for (let i in followers) {
        // console.log(followers[i])
        axios.delete(`https://api.github.com/user/following/${followers[i]}`, {
            headers: {
                'Authorization': `token ${token}`,
            }
        }).then(response => {
            deixouDeSeguir.push(`Unfollowed ${followers[i]}`);
        }).catch(error => {
            naoDeixouDeSeguir.push(`Not Unfollowed ${followers[i]}`);
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