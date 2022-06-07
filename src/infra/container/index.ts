import { container } from 'tsyringe';
import ContactRepository from '@modules/contacts/infra/typeorm/repositories/ContactRepository';
import IContactRepository from '@modules/contacts/repositories/IContactRepository';

container.registerSingleton<IContactRepository>(
   'ContactRepository', 
   ContactRepository
);