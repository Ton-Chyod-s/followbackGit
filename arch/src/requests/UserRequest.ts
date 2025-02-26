import { GitHubUser } from "../models/request/IUserDataRequest";

require('dotenv').config({  
    path: process.env.NODE_ENV !== "main" ? ".env.testing" : ".env"
  })

async function getUserData(username: string): Promise<GitHubUser | null> {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`, {
            headers: {
                Authorization: process.env.KEY || "",
            },
        });
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
