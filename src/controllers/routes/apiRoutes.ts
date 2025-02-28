import { Router, Request, Response } from 'express';
import { CheckFollowerWithFollowing } from '../../services/useCases/checkFollowerAndFollowing/CheckFollowerWithFollowingUseCase';
import { FollowUsersFollowers } from '../../services/useCases/followUsersFollowers/FollowUsersFollowersUseCase';
import { newFollower } from '../../requests/FollowRequest';
import { checkUnfollowAndFollow } from '../../services/useCases/checkUnfollowAndFollow/checkUnfollowAndFollowUseCase';

const routers = Router();

routers.get('/', (req: Request, res: Response) => {
    res.json({
        message: "Bem-vindo à API de Gerenciamento de Seguidores!",
        description: "Esta API permite verificar seguidores, seguir usuários automaticamente e monitorar alterações na lista de seguidores.",
        endpoints: {
            "/check-follower": "Verifica se um usuário segue outro usuário.",
            "/follow-users": "Segue automaticamente os seguidores de um usuário.",
            "/check-unfollower": "Verifica se um usuário deixou de seguir outro.",
            "/new-follower/:name": "Segue um novo usuário específico."
        },
        note: "Para utilizar os endpoints que exigem um nome de usuário, passe o parâmetro 'name' na query string ou na URL.",
        example: "/check-follower?name=usuario"
    });
});

routers.get('/check-follower', async (req: Request, res: Response) => {
    const name = validateUserName(req, res);
    if (!name) return;

    try {
        const result = await CheckFollowerWithFollowing(name);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Erro ao conferir seguidores do usuário." });
    }
});

routers.get('/follow-users', async (req: Request, res: Response) => {
    const name = validateUserName(req, res);
    if (!name) return;

    try {
        const result = await FollowUsersFollowers(name);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Erro ao seguir seguidores do usuário." });
    }
});

routers.get('/check-unfollower', async (req: Request, res: Response) => {
    const name = validateUserName(req, res);
    if (!name) return;

    try {
        const result = await checkUnfollowAndFollow(name);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Erro ao consultar usuário seguir." });
    }
});

routers.put('/new-follower/:name', async (req: Request, res: Response): Promise<void> => {
    const name = validateUserName(req, res);
    if (!name) return;

    try {
        const result = await newFollower(name);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Erro ao seguir o usuário." });
    }
});

function validateUserName(req: Request, res: Response): string | null {
    const name = req.query.name as string || req.params.name;
    if (!name) {
        res.status(400).json({ error: "O nome do usuário é obrigatório." });
        return null;
    }
    return name;
}

export { routers };
