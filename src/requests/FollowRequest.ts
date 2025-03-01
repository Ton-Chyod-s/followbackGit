
require('dotenv').config({ path: "src\\config\\.env" });

export async function newFollower(newFollower: string): Promise<boolean | null> {
    try{
        const key = process.env.KEY;
        if (!key) {
            throw new Error("Chave não encontrada.");
        }

        const response = await fetch(`https://api.github.com/user/following/${newFollower}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${key}`,	
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36 Brave/121",
                "Accept": 'application/vnd.github+json',
                "Accept-Language": "en-US,en;q=0.9",
                "Origin": "https://github.com",
                "DNT": "1",
                "Cache-Control": "no-cache"
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