import { GetFollowingData } from "../../../requests/FollowingRequest";
import { GetFollowersData } from "../../../requests/FollowersRequest";
import { getUserData } from "../../../requests/UserRequest";

export async function CheckFollowerWithFollowing(userName: string) {
    const FOLLOWERS_PER_PAGE = 100;
    let listFollowers = new Array();
    let listfollowing = new Array();
    let userUnfollowed = new Array();

    const userData = await getUserData(userName);

    if (!userData) {
        return null;
    }

    const totalFollowers = userData?.Followers ?? 0;
    const followersPageCount = Math.ceil(totalFollowers / FOLLOWERS_PER_PAGE);

    if (Number.isFinite(followersPageCount) && followersPageCount > 0){
        for (let i = 0; i < followersPageCount; i++) {
            const followerList = await GetFollowersData(userName, i + 1);
            if (followerList) {
                followerList.forEach((follower) => listFollowers.push(follower.Name));
            }

            const followingList = await GetFollowingData(userName, i + 1);
            if (followingList) {
                followingList.forEach((following) => listfollowing.push(following.Name));
            }
        }
    
    for (let i = 0; i < listfollowing.length; i++) {
        if (!listFollowers.includes(listfollowing[i])) {
            userUnfollowed.push(listfollowing[i]);
        }
    }

    return userUnfollowed;
    }
}
