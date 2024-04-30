const { main } = require("./checkFollower");

async function unfollow(username) {
    const followers = await main(username);
    for (let i in followers) {
        console.log(followers[i])
        

        
    }
    return followers
}

unfollow("silvniv")

if (require.main === module) {
    (async () => {
        const result = await unfollow("silvniv");
        console.log(result);
    })();
}