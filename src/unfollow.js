const { main } = require("./checkFollower");
const { token } = require('./utility/key/token');
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
        }).catch((err) => {
            naoDeixouDeSeguir.push(`Not Unfollow ${followers[i]}`);
        })
        deixouDeSeguir.push(`Unfollow ${followers[i]}`);
    }
    if (deixouDeSeguir.length === 0) {
        return naoDeixouDeSeguir;
    } else {
        return deixouDeSeguir;
    };
}

if (require.main === module) {
    (async () => {
        const result = await unfollow("ton-chyod-s");
        console.log(result);
    })();
}