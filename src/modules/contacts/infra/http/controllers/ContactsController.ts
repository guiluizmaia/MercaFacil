import CreateContactsService from '@modules/contacts/services/CreateContactsService';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

class ContactsController{
    public async execute(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { contacts } = request.body;
        const client = request.client;

        const token = await container.resolve(CreateContactsService).execute({contacts, client});
    
        return response.status(200).json(token);
    }
}

export default ContactsController;