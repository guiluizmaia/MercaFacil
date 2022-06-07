import Clients from '@modules/clients/infra/typeorm/entities/Clients';
import IClientRepository from '@modules/clients/repositories/IClientRepository';
import { v4 } from 'uuid';

class ClientRepositoryMock implements IClientRepository{
    private inMemory: Clients[] = [
        {
            id: v4(),
            email: 'test@macapa.com',
            pass: '$2a$08$cOPTUpIF30TjntcXMQ0jJ.b/UMKCMd6h10f0Ojny5UWYNfv.abpGK',
            name: 'macapa',
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: v4(),
            email: 'test@varejao.com',
            pass: '$2a$08$cOPTUpIF30TjntcXMQ0jJ.b/UMKCMd6h10f0Ojny5UWYNfv.abpGK',
            name: 'varejao',
            created_at: new Date(),
            updated_at: new Date() 
        },
        {
            id: v4(),
            email: 'test@test.com',
            pass: '$2a$08$cOPTUpIF30TjntcXMQ0jJ.b/UMKCMd6h10f0Ojny5UWYNfv.abpGK',
            name: 'testForError',
            created_at: new Date(),
            updated_at: new Date() 
        }
    ];
    
    public async findByEmail(email: String): Promise<Clients | undefined> {
        const findClient = this.inMemory.find(client => 
            client.email === email
        );

        if(!findClient){
            return undefined;
        }

        return findClient
    }
}
export default ClientRepositoryMock;