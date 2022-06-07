import { LoginValidator } from '@modules/clients/infra/validators/Clients';
import { Request, Response, Router } from 'express';
import AuthController from '../controllers/AuthController';

const clientsRoutes = Router();

const authController = new AuthController();

clientsRoutes.post('/', LoginValidator, authController.execute);

export default clientsRoutes;
