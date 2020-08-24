import { Router } from 'express';
import { client } from './client/client-route';
const routes = Router();


routes.use('/client', client);
export default routes;