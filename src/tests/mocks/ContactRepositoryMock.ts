import IContactDto from '@modules/contacts/dtos/IContactDto';
import Contact from '@modules/contacts/infra/typeorm/entities/Contact';
import IContactRepository from '@modules/contacts/repositories/IContactRepository';

class ContactRepositoryMock implements IContactRepository{
    private inMemoryVarejao: Contact[] = [];
    private inMemoryMacapa: Contact[] = [];

    async createVarejao(contacts: IContactDto[]): Promise<Contact[]> {
        contacts.forEach((contact) => {
            const contactsMemory = new Contact();
            this.inMemoryVarejao.push(Object.assign(contactsMemory, contact));
        })
        return this.inMemoryVarejao;
    }
    
    async indexVarejao(): Promise<Contact[]> {
        return this.inMemoryVarejao;
    }
    
    async createMacapa(contacts: IContactDto[]): Promise<Contact[]> {
        contacts.forEach((contact) => {
            const contactsMemory = new Contact();
            this.inMemoryMacapa.push(Object.assign(contactsMemory, contact));
        })
        return this.inMemoryMacapa;
    }

    async indexMacapa(): Promise<Contact[]> {
        return this.inMemoryMacapa;
    }
}
export default ContactRepositoryMock;