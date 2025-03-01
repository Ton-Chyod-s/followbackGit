import { GitHubUser } from "../models/request/IUserDataRequest";

require('dotenv').config({ path: "src\\config\\.env" });

async function getUserData(username: string): Promise<GitHubUser | null> {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`, {
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
  
        return {
            Followers: data.followers ?? 0,
            Following: data.following ?? 0
        };

    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        return null;
    }
}

export { getUserData };
