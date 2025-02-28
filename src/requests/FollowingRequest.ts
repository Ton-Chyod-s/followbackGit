import { FollowingData } from "../models/request/IFollowingRequest";

require('dotenv').config({ path: "src\\config\\.env" });

async function GetFollowingData(username: string, page: number): Promise<FollowingData[] | null> {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/following?page=${page}&per_page=100`, {
            headers: {
                Authorization: `Bearer ${process.env.KEY || ""}`,
            },
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();

        const following: FollowingData[] = data.map((user: any) => ({
            Name: user.login,
            // TODO: Add more fields
        }));

        return following;

    } catch (error) {
        console.error("Erro ao buscar seguidores:", error);
        return null;
    }
}

export { GetFollowingData };
