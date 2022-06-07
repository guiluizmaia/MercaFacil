import { container } from 'tsyringe';
import ContactRepository from '@modules/contacts/infra/typeorm/repositories/ContactRepository';
import IContactRepository from '@modules/contacts/repositories/IContactRepository';
import IClientRepository from '@modules/clients/repositories/IClientRepository';
import ClientRepository from '@modules/clients/infra/typeorm/repositories/ClientRepository';

container.registerSingleton<IContactRepository>(
   'ContactRepository', 
   ContactRepository
).registerSingleton<IClientRepository>(
   'ClientRepository',
   ClientRepository
);