import IClientRepository from '@modules/clients/repositories/IClientRepository';
import { getRepository, Repository } from 'typeorm';
import Clients from '../entities/Clients';

class ClientRepository implements IClientRepository{
    private ormRepositoryAuth: Repository<Clients>;

    constructor() {
      this.ormRepositoryAuth = getRepository(Clients, 'authDb');

    }
    
    public async findByEmail(email: String): Promise<Clients | undefined> {
        return this.ormRepositoryAuth.findOne({
            where: {
                email
            }
        })
    } 
    
}

export default ClientRepository;