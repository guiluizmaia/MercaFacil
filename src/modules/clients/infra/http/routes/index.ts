import { Request, Response, Router } from 'express';
import TokenController from '../controllers/TokenController';

const clientsRoutes = Router();

const tokenController = new TokenController();

clientsRoutes.post('/', tokenController.execute);

export default clientsRoutes;
