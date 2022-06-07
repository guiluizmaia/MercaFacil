import { Response, Request } from 'express';
import AppError from '@infra/http/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Contact from '../infra/typeorm/entities/Contact';
import IContactRepository from '../repositories/IContactRepository';
import { v4 } from 'uuid';

interface contactConverted {
    id: String;
    nome: String;
    celular: String;
}

interface contact {
    name: String;
    cellphone: String;
}

interface IRequest {
    contacts: contact[],
    client: String
}

@injectable()
class CreateContactsService{
    constructor(
        @inject('ContactRepository')
        private contactsRepository: IContactRepository
    ){}

    public async execute({contacts, client}: IRequest): Promise<Contact[]> {
        if (client === 'MACAPA'){
            const contactsConverted = this
                .clientMacapaRequestToClientMacapaConverted(contacts);

            return this.contactsRepository.createMacapa(contactsConverted);
        } else if (client === 'VAREJAO'){
            const contactsConverted = this
                .clientVarejaoRequestToClientVarejaoConverted(contacts);

            return this.contactsRepository.createVarejao(contactsConverted);
        }
        
        throw new AppError('Client is wrong', 401);
    }

    private clientMacapaRequestToClientMacapaConverted(clients: contact[]): contactConverted[]{
        return clients.map(client => {
            const prefix = `+${client.cellphone.slice(0,2)}`
            const ddd = `(${client.cellphone.slice(2,4)})`
            const init = client.cellphone.slice(4, client.cellphone.length - 4)
            const final = client.cellphone.slice(client.cellphone.length - 4)

            return {
                id: v4(),
                nome: client.name.toUpperCase(),
                celular: `${prefix} ${ddd} ${init}-${final}`
            }
        })
    }

    private clientVarejaoRequestToClientVarejaoConverted(clients: contact[]): contactConverted[]{
        return clients.map(client => {
            return {
                id: v4(),
                nome: client.name,
                celular: client.cellphone.replace(/[^\d]+/g,'')
            }
        })
    }
}

export default CreateContactsService;