import { Router, Request, Response } from 'express';
import { CheckFollowerWithFollowing } from '../../services/useCases/checkFollowerAndFollowing/CheckFollowerWithFollowingUseCase';
import { FollowUsersFollowers } from '../../services/useCases/FollowUsersFollowers/FollowUsersFollowersUseCase';

const routers = Router();

routers.get('/', (req: Request, res: Response) => {
    res.json({'message': 'Hello World!'});
});

routers.get('/check-follower', async (req: Request, res: Response) => {
    const name = req.query.name as string;
    const page = Number(req.query.page) || 1;

    res.json(await CheckFollowerWithFollowing(name));
});

routers.get('/follow-users', async (req: Request, res: Response) => {
    const name = req.query.name as string;

    res.json(await FollowUsersFollowers(name));
});

export { routers };
