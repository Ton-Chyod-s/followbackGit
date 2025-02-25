import express, { Application } from 'express';
import { RegisterRoutes } from './controllers/RegisterRoutes';

const server: Application  = express();
const port = 3000;

server.use(express.json());

RegisterRoutes(server);

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
