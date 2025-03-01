import { GetFollowersData } from "../../../requests/FollowersRequest";
import { GetFollowingData } from "../../../requests/FollowingRequest";
import { getUserData } from "../../../requests/UserRequest";

export async function fetchUserFollowData(userName: string): Promise<{ followers: Set<string>; following: string[] } | null> {
    try {
        const FOLLOWERS_PER_PAGE = 100;
        const listFollowers = new Set<string>();
        const listFollowing: string[] = [];
        
        const userData = await getUserData(userName);
        if (!userData) 
            return null;

        const totalFollowers = userData.Followers ?? 0;
        const followersPageCount = Math.ceil(totalFollowers / FOLLOWERS_PER_PAGE);

        if (!Number.isFinite(followersPageCount) || followersPageCount <= 0) return { followers: listFollowers, following: listFollowing };

        for (let i = 0; i < followersPageCount; i++) {
            const [followerList, followingList] = await Promise.all([
                GetFollowersData(userName, i + 1),
                GetFollowingData(userName, i + 1)
            ]);

            followerList?.forEach(follower => listFollowers.add(follower.Name));
            followingList?.forEach(following => listFollowing.push(following.Name));

            const randomDelay = Math.floor(Math.random() * 2000) + 1000;
            await new Promise(resolve => setTimeout(resolve, randomDelay));
        }

        return {
            followers: listFollowers,
            following: listFollowing
        };

    } catch (error) {
        console.error("Erro ao buscar dados de seguidores/seguidos:", error);
        return null;
    } 
}
