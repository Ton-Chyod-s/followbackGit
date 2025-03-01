import { FollowersData } from "../models/request/IFollowersRequest";

require('dotenv').config({ path: "src\\config\\.env" });

export async function GetFollowersData(username: string, page: number): Promise<FollowersData[] | null> {
    try {
        const response = await fetch(`https://api.github.com/users/${username}/followers?page=${page}&per_page=100`, {
            headers: {
                "Authorization": `Bearer ${process.env.KEY || ""}`,
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Brave/121",
                "Accept": "application/vnd.github.v3+json",
                "Accept-Language": "en-US,en;q=0.9",
                "Origin": "https://github.com",
                "DNT": "1",
                "Cache-Control": "no-cache"
            },
        });

        if (response.status === 403 || response.status === 429) {
            throw new Error(`Erro ${response.status}: Acesso negado ou limite de requisições atingido.`);
        }

        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        const followers: FollowersData[] = data.map((user: any) => ({
            Name: user.login,
            // TODO: Add more fields
        }));

        return followers;

    } catch (error) {
        console.error("Erro ao buscar seguidores:", error);
        return null;
    }
}

