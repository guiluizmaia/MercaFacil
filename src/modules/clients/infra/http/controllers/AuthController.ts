import AuthenticateService from '@modules/clients/services/AuthenticateService';
import { Response, Request } from 'express';
import { container } from 'tsyringe';

class AuthController{
    public async execute(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, pass } = request.body;
        
        const token = await container.resolve(AuthenticateService).execute({email, pass});
    
        return response.status(200).json({token: token});
    }
}

export default AuthController;