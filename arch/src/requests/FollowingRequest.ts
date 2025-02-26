import { FollowingData } from "../models/request/IFollowingRequest";

require('dotenv').config({  
    path: process.env.NODE_ENV !== "main" ? ".env.testing" : ".env"
  })

async function GetFollowingData(username: string, page: number): Promise<FollowingData[] | null> {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/following?page=${page}&per_page=100`, {
            headers: {
                Authorization: process.env.KEY || "",
            },
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();

        const following: FollowingData[] = data.map((user: any) => ({
            Name: user.login,
        }));

        return following;

    } catch (error) {
        console.error("Erro ao buscar seguidores:", error);
        return null;
    }
}

export { GetFollowingData };
