
import express, { Request, Response } from 'express';

const server = express();
const port = 3000;

server.get('/', (req: Request, res: Response) => {
    res.json({'message': 'Hello World!'});
});

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
