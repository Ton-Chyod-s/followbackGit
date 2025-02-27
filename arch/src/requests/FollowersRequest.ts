import { FollowersData } from "../models/request/IFollowersRequest";

require('dotenv').config({ path: ".env" });

async function GetFollowersData(username: string, page: number): Promise<FollowersData[] | null> {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/followers?page=${page}&per_page=100`, {
            headers: {
                Authorization: process.env.KEY || "",
            },
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();

        const followers: FollowersData[] = data.map((user: any) => ({
            Name: user.login,
        }));

        return followers;

    } catch (error) {
        console.error("Erro ao buscar seguidores:", error);
        return null;
    }
}

export { GetFollowersData };
