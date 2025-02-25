import { Router, Request, Response } from 'express';

const routers = Router();

routers.get('/', (req: Request, res: Response) => {
    res.json({'message': 'Hello World!'});
});

export { routers };
