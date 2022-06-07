import { Request, Response, Router } from 'express';
import { CreateContactValidator } from '../../validators/Contacts';
import ContactsController from '../controllers/ContactsController';

const contactsRoutes = Router();

const contactControllers = new ContactsController();

contactsRoutes.post('/', CreateContactValidator, contactControllers.execute);

export default contactsRoutes;
