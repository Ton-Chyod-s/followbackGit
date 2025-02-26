import { Router, Request, Response } from 'express';
import { GetFollowersData } from '../../requests/FollowersRequest';
import { getUserData } from '../../requests/UserRequest';
import { GetFollowingData } from '../../requests/FollowingRequest';

const routers = Router();

routers.get('/', (req: Request, res: Response) => {
    res.json({'message': 'Hello World!'});
});

routers.get('/user', async(req: Request, res: Response) => {
    const name = req.query.name as string;
    
    res.json(await getUserData(name));
});

routers.get('/followers', async (req: Request, res: Response) => {
    const name = req.query.name as string;
    const page = Number(req.query.page) || 1;

    res.json(await GetFollowersData(name, page));
});

routers.get('/following', async (req: Request, res: Response) => {
    const name = req.query.name as string;
    const page = Number(req.query.page) || 1;

    res.json(await GetFollowingData(name, page));
});

export { routers };
