import { GetFollowersData } from "../../../requests/FollowersRequest";
import { getUserData } from "../../../requests/UserRequest";

require('dotenv').config({ path: ".env" });

export async function FollowUsersFollowers(userName: string): Promise<string[] | null> {
    const user = process.env.USER ?? '';
    
    const getFollowersINotFollow = await GetUnreciprocatedFollows(userName, user);
    if (!getFollowersINotFollow)
        return null;

    return null;
}


async function GetUnreciprocatedFollows(userName: string, user: string): Promise<Set<string> | null> {
    const notFollowingBack = new Set<string>();

    const myFollowers = await GetUserFollowers(userName);
    if (!myFollowers) return null;

    const myFollowing = await GetUserFollowers(user);
    if (!myFollowing) return null;

    myFollowers.forEach(user => { 
        if (!myFollowing.has(user)) { 
            notFollowingBack.add(user);
        }
    });

    return notFollowingBack;
}

async function GetUserFollowers(userName: string): Promise<Set<string> | null> {
    const FOLLOWERS_PER_PAGE = 100;
    const listFollowers = new Set<string>();

    try{
        const userData = await getUserData(userName);
        if (!userData) 
            return null;

        const totalFollowers = userData.Followers ?? 0;
        const followersPageCount = Math.ceil(totalFollowers / FOLLOWERS_PER_PAGE);

        if (!Number.isFinite(followersPageCount) || followersPageCount <= 0) return new Set();

        const promises = Array.from({ length: followersPageCount }, (_, i) =>
            GetFollowersData(userName, i + 1)
        );
        const followersData = await Promise.all(promises);
        
        followersData.forEach(followerList => {
            followerList?.forEach(follower => listFollowers.add(follower.Name));
        });

    } catch (error) {
        console.error("Erro ao buscar seguidores:", error);
        return null;
    }
    
    return listFollowers;
}

