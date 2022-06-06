import AppError from '@infra/http/errors/AppError';
import { Response, Request } from 'express';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import Contact from '../infra/typeorm/entities/Contact';
import IContactsRepository from '../repositories/IContactsRepository';

interface contactConverted {
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
        @inject("ContactsRepository")
        private contactsRepository: IContactsRepository
    ){}
    public async execute({contacts, client}: IRequest): Promise<Contact[]> {
        if (client === "MACAPA"){
            const contactsConverted = this
                .clientMacapaRequestToClientMacapaConverted(contacts);
            return this.contactsRepository.createMacapa(contactsConverted);
        } else if (client === "VAREJAO"){
            const contactsConverted = this
                .clientVarejaoRequestToClientVarejaoConverted(contacts);
            return this.contactsRepository.createVarejao(contactsConverted);
        }
        
        throw new AppError("Client is wrong", 401);
    }

    private clientMacapaRequestToClientMacapaConverted(clients: contact[]): contactConverted[]{
        return clients.map(client => {
            const prefix = `+${client.cellphone.slice(0,2)}`
            const ddd = `(${client.cellphone.slice(2,4)})`
            const init = client.cellphone.slice(4, client.cellphone.length - 4)
            const final = client.cellphone.slice(client.cellphone.length - 4)

            return {
                nome: client.name.toUpperCase(),
                celular: `${prefix} ${ddd} ${init}-${final}`
            }
        })
    }

    private clientVarejaoRequestToClientVarejaoConverted(clients: contact[]): contactConverted[]{
        return clients.map(client => {
            return {
                nome: client.name,
                celular: client.cellphone.replace(/[^\d]+/g,'')
            }
        })
    }
}

export default CreateContactsService;