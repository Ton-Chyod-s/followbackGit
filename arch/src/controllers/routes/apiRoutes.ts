import { Router, Request, Response } from 'express';
import { GetFollowersData } from '../../request/followers';

const routers = Router();

routers.get('/', (req: Request, res: Response) => {
    res.json({'message': 'Hello World!'});
});

routers.get('/followers', async (req: Request, res: Response) => {
    const username = req.query.username as string;
    const page = Number(req.query.page) || 1;

    res.json(await GetFollowersData(username, page));
});

routers.get('/user', (req: Request, res: Response) => {
    res.json({'message': 'Hello World!'});
});

export { routers };
