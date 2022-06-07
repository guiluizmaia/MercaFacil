import TokenService from '@modules/clients/services/TokenService';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

class TokenController{
    public async execute(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { client } = request.query;
        
        const token = await container.resolve(TokenService).execute({client: String(client)});
    
        return response.status(200).json(token);
    }
}

export default TokenController;