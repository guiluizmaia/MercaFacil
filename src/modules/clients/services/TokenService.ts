import AppError from '@infra/http/errors/AppError';
import { Response, Request } from 'express';
import { sign } from 'jsonwebtoken';
import { injectable } from 'tsyringe';

interface IRequest {
    client: string
}

@injectable()
class TokenService{
    public async execute({client}: IRequest): Promise<String> {
        let secretKey;

        if (client === "MACAPA"){
            secretKey = process.env.SECRETMACAPA;
        } else if (client === "VAREJAO"){
            secretKey = process.env.SECRETVAREJAO;
        } else {
            throw new AppError("Client not found", 401);
        }

        const token = sign({}, String(secretKey), {
            subject: client,
            expiresIn: "1d",
        });

        return token;
    }
}

export default TokenService;