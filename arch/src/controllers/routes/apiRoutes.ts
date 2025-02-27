import { Router, Request, Response } from 'express';
import { CheckFollowerWithFollowing } from '../../services/useCases/checkFollowerAndFollowing/CheckFollowerWithFollowingUseCase';
import { FollowUsersFollowers } from '../../services/useCases/followUsersFollowers/FollowUsersFollowersUseCase';
import { newFollower } from '../../requests/FollowRequest';

const routers = Router();

routers.get('/', (req: Request, res: Response) => {
    res.json({'message': 'Hello World!'});
});

routers.get('/check-follower', async (req: Request, res: Response) => {
    const name = req.query.name as string;

    res.json(await CheckFollowerWithFollowing(name));
});

routers.get('/follow-users', async (req: Request, res: Response) => {
    const name = req.query.name as string;

    res.json(await FollowUsersFollowers(name));
});

routers.put('/new-follower/:name', async (req: Request, res: Response): Promise<void> => {
    const name = req.params.name;

    if (!name) {
        res.status(400).json({ error: "O nome do usuário é obrigatório." });
        return;
    }

    try {
        const result = await newFollower(name);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Erro ao seguir o usuário." });
    }
});

export { routers };
