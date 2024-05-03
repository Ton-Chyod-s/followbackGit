const { funcSeguidores } = require('./utility/followers');
const { funcSeguir } = require('./utility/follow');

async function checkFollow(username) {
    const followers = await funcSeguidores(username);
    const following = await funcSeguir(username);

    const mutualFollower = {};
    const nonFollower = {};
    let numFollower = 0;

    for (let i = 0; i <= following.length; i++) {
        const follow = following[i];
        if (i >= following.length) {
            numFollower ++;
            break;
        } else if (follow === undefined) {
            nonFollower[`follower ${i}`] = "No followers found!";
            return nonFollower;
        } else if (followers.includes(follow)) {
            mutualFollower[`follower ${i}`] = follow;
        } else {
            nonFollower[`follower ${i}`] = follow;
        }
    }
    if (Object.keys(nonFollower).length === 0 && numFollower === 1) {
        nonFollower["error"] = "All followers are following back!";
    } else {
        if (following.length === 0) {
            nonFollower["error"] = "No followers found!";
        }
    }
    return nonFollower;
}

module.exports = { checkFollow };

if (require.main === module) {
    (async () => {
        const result = await checkFollow("silvniv");
        console.log(result);
    })();
}