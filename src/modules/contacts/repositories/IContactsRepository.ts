import IContactDto from "../dtos/IContactDto";
import Clients from "../infra/typeorm/entities/Contact";

interface IContactsRepository{
    createVarejao(contacts: IContactDto[]): Promise<Clients[]>;
    indexVarejao(): Promise<Clients[]>;
    createMacapa(contacts: IContactDto[]): Promise<Clients[]>;
    indexMacapa(): Promise<Clients[]>;
}

export default IContactsRepository;