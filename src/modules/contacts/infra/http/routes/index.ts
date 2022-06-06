import { Request, Response, Router } from 'express';
import ContactsController from '../controllers/ContactsController';

const contactsRoutes = Router();

const contactControllers = new ContactsController();

contactsRoutes.post('/', contactControllers.execute);

export default contactsRoutes;
