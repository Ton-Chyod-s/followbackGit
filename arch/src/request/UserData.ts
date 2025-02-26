import { GitHubUser } from "../request/interfaces/GitHubUser";

async function getUserData(username: string): Promise<GitHubUser | null> {
    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();

        const userData: GitHubUser = data.map((user: any) => ({
            followers: user.followers,
            following: user.following,
        }));

        return userData;

    } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        return null;
    }
}

export { getUserData };
