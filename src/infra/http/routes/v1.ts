import { Router } from 'express';

import contactsRoutes from '@modules/contacts/infra/http/routes';
import clientsRoutes from '@modules/clients/infra/http/routes';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';



const v1Routes = Router();

v1Routes.use('/token', clientsRoutes);

v1Routes.use(ensureAuthenticated)

v1Routes.use('/contacts', contactsRoutes);



export default v1Routes;
