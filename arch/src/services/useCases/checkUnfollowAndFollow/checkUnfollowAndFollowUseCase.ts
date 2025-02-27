import { GetFollowersData } from "../../../requests/FollowersRequest";
import { GetFollowingData } from "../../../requests/FollowingRequest";
import { getUserData } from "../../../requests/UserRequest";

export async function checkUnfollowAndFollow(userName: string): Promise<string[] | null> {
    const FOLLOWERS_PER_PAGE = 100;
    const listFollowers = new Set<string>();
    const listFollowing: string[] = [];
    const userToFollow: string[] = [];

    const userData = await getUserData(userName);
    if (!userData) 
        return null;

    const totalFollowers = userData.Followers ?? 0;
    const followersPageCount = Math.ceil(totalFollowers / FOLLOWERS_PER_PAGE);

    if (!Number.isFinite(followersPageCount) || followersPageCount <= 0) return [];

    for (let i = 0; i < followersPageCount; i++) {
        const [followerList, followingList] = await Promise.all([
            GetFollowersData(userName, i + 1),
            GetFollowingData(userName, i + 1)
        ]);

        followerList?.forEach(follower => listFollowers.add(follower.Name));
        followingList?.forEach(following => listFollowing.push(following.Name));
    }

    listFollowers.forEach(user => {
        if (!listFollowing.includes(user))
            userToFollow.push(user);
    });
    
    if  ( userToFollow.length === 0) 
        return ['no user to follow'];

    return userToFollow;
}
