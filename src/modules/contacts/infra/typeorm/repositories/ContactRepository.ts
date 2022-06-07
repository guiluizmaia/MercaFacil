import IContactDto from "@modules/contacts/dtos/IContactDto";
import IContactsRepository from "@modules/contacts/repositories/IContactRepository"
import { getRepository, Repository } from "typeorm";
import Contact from "../entities/Contact";

class ContactRepository implements IContactsRepository{
    private ormRepositoryPostgreSql: Repository<Contact>;
    private ormRepositoryMySql: Repository<Contact>;

    constructor() {
      this.ormRepositoryPostgreSql = getRepository(Contact, 'postgres');
      this.ormRepositoryMySql = getRepository(Contact, 'mysql');

    }
    
    public async createVarejao(contacts: IContactDto[]): Promise<Contact[]> {
        const query = await this.ormRepositoryPostgreSql
            .createQueryBuilder()
            .insert()
            .into(Contact)
            .values(contacts)
            .execute();

        const createdIds = query.identifiers.map(identifier => {
            return identifier.id;
        })           

        return this.ormRepositoryPostgreSql
            .createQueryBuilder("contact")
            .where("contact.id IN (:...createdIds)", {createdIds})
            .getMany()
    }

    public async indexVarejao(): Promise<Contact[]> {
        return this.ormRepositoryPostgreSql.find();
    }

    public async createMacapa(contacts: IContactDto[]): Promise<Contact[]> {
        const query = await this.ormRepositoryMySql
            .createQueryBuilder()
            .insert()
            .into(Contact)
            .values(contacts)
            .execute();

        const createdIds = query.identifiers.map(identifier => {
            return identifier.id;
        })  

        return this.ormRepositoryMySql
            .createQueryBuilder("contact")
            .where("contact.id IN (:...createdIds)", {createdIds})
            .getMany();
    }

    public async indexMacapa(): Promise<Contact[]> {
        return this.ormRepositoryMySql.find();
    }
    
}

export default ContactRepository;