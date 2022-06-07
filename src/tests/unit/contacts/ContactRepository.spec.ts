import AppError from '@infra/http/errors/AppError';
import CreateContactsService from '@modules/contacts/services/CreateContactsService';
import ContactRepositoryMock from '@tests/mocks/ContactRepositoryMock';

let createContactsService: CreateContactsService;
let contactRepository: ContactRepositoryMock;

describe('TokenService', () => {
    beforeAll(async () => {
        contactRepository = new ContactRepositoryMock();
        createContactsService = new CreateContactsService(contactRepository);
    })

    it('should be able create a contact with client MACAPA', async () => {

        const contactsBase = [{
                    name: 'Srta. Isabelly Castro',
                    cellphone: '5541959365078'
                },
                {
                    name: 'Ana Julia da Rocha',
                    cellphone: '5541923038062'
                }];

        const createdContacts = await createContactsService.execute({contacts: contactsBase, client: 'MACAPA'});

        
        expect(createdContacts.length).toBe(2);
        expect(createdContacts[0].celular).toBe('+55 (41) 95936-5078');
        expect(createdContacts[0].nome).toBe(contactsBase[0].name.toUpperCase());
    })

    it('should be able create a contact with client VAREJAO', async () => {

        const contactsBase = [{
                    name: 'Srta. Isabelly Castro',
                    cellphone: '5541959365078'
                },
                {
                    name: 'Ana Julia da Rocha',
                    cellphone: '5541923038062'
                }];

        const createdContacts = await createContactsService.execute({contacts: contactsBase, client: 'VAREJAO'});

        
        expect(createdContacts.length).toBe(2);
        expect(createdContacts[0].celular).toBe(contactsBase[0].cellphone);
        expect(createdContacts[0].nome).toBe(contactsBase[0].name);
    })

    it('should be able create a contact with client wrong', async () => {
        const contactsBase = [{
                    name: 'Srta. Isabelly Castro',
                    cellphone: '5541959365078'
                },
                {
                    name: 'Ana Julia da Rocha',
                    cellphone: '5541923038062'
                }];

        await expect(
            createContactsService.execute({contacts: contactsBase, client: 'TESTE'}))
            .rejects
            .toEqual(new AppError('Client is wrong', 401))
    })
})