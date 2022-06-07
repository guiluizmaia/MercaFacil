import AppError from '@infra/http/errors/AppError';
import { Response, Request } from 'express';
import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';
import IClientRepository from '../repositories/IClientRepository';
import { compare } from 'bcryptjs';


interface IRequest {
    email: String,
    pass: String,
}

@injectable()
class AuthenticateService{
    constructor(
        @inject('ClientRepository')
        private clientRepository: IClientRepository
    ){}
    
    public async execute({email, pass}: IRequest): Promise<String> {
        const client = await this.clientRepository.findByEmail(email);

        if (!client) {
            throw new AppError('Email or password not correct!', 401);
        }

        const passwordMatch = await compare(String(pass), String(client.pass));

        if (!passwordMatch) {
            throw new AppError('Email or password not correct!', 401);
        }

        let secretKey;
        if(client.name === 'macapa'){
            secretKey = process.env.SECRETMACAPA;
        }else if(client.name === 'varejao'){
            secretKey = process.env.SECRETVAREJAO;
        }else{
            throw new AppError('Email or password not correct!', 401);
        }

        const token = sign({}, String(secretKey), {
            subject: String(client.id),
            expiresIn: '1d',
        });

        return token;
    }
}

export default AuthenticateService;