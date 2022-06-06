import { Router } from 'express';

import contactsRoutes from '@modules/contacts/infra/http/routes';
import clientsRoutes from '@modules/clients/infra/http/routes';



const v1Routes = Router();


v1Routes.use('/contacts', contactsRoutes);

v1Routes.use('/token', clientsRoutes);


export default v1Routes;
