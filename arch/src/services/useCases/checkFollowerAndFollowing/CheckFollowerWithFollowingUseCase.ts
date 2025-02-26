import { GetFollowingData } from "../../../requests/FollowingRequest";
import { GetFollowersData } from "../../../requests/FollowersRequest";
import { getUserData } from "../../../requests/UserRequest";

export async function CheckFollowerWithFollowing(userName: string): Promise<string[] | null> {
    const FOLLOWERS_PER_PAGE = 100;
    const listFollowers = new Set<string>();
    const listFollowing: string[] = [];
    const userUnfollowed: string[] = [];

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

    listFollowing.forEach(user => {
        if (!listFollowers.has(user))
            userUnfollowed.push(user);
    });

    if (userUnfollowed.length === 0) 
        return ['No user has unfollowed you'];

    return userUnfollowed;
}
