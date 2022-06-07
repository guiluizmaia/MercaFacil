import { Request, Response, Router } from 'express';
import AuthController from '../controllers/AuthController';

const clientsRoutes = Router();

const authController = new AuthController();

clientsRoutes.post('/', authController.execute);

export default clientsRoutes;
