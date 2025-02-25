import { Application  } from 'express';
import { routers } from './Routes/v1';

export function RegisterRoutes(server: Application ) {
    server.use('/', routers);
}