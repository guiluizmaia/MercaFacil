import IContactDto from '../dtos/IContactDto';
import Clients from '../infra/typeorm/entities/Contact';

interface IContactRepository{
    createVarejao(contacts: IContactDto[]): Promise<Clients[]>;
    indexVarejao(): Promise<Clients[]>;
    createMacapa(contacts: IContactDto[]): Promise<Clients[]>;
    indexMacapa(): Promise<Clients[]>;
}

export default IContactRepository;