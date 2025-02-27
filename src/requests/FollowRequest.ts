
require('dotenv').config({ path: ".env" });

export async function newFollower(newFollower: string): Promise<Boolean | null> {
    try{
        const key = process.env.KEY;
        if (!key) {
            throw new Error("Chave não encontrada.");
        }

        const response = await fetch(`https://api.github.com/user/following/${newFollower}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${key}`,	
                'Accept': 'application/vnd.github+json'
            },
        });
    
        if (!response.ok) {
            throw new Error(`Erro: ${response.status} - ${response.statusText}`);
            
        }

    } catch (error) {
        console.error(error);
        return false;
    }
    
    return true;
}