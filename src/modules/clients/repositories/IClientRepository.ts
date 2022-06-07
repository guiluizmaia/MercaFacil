import Clients from "../infra/typeorm/entities/Clients";

interface IClientRepository{
    findByEmail(email: String): Promise<Clients | undefined>;
}

export default IClientRepository;