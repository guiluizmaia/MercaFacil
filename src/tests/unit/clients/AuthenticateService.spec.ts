import AppError from '@infra/http/errors/AppError';
import IClientRepository from '@modules/clients/repositories/IClientRepository';
import AuthenticateService from '@modules/clients/services/AuthenticateService';
import ClientRepositoryMock from '@tests/mocks/ClientRepositoryMock';
import { sign } from 'jsonwebtoken';

let authenticateService: AuthenticateService;
let clientRepository: IClientRepository;


describe('AuthenticateService', () => {
    beforeAll(async () => {
        clientRepository = new ClientRepositoryMock()
        authenticateService = new AuthenticateService(
            clientRepository
        );
    });

    it('should be able login with email test@macapa.com', async () => {
        const client = await clientRepository.findByEmail('test@macapa.com');
        
        const tokenBase = sign({}, String(process.env.SECRETMACAPA), {
            subject: String(client?.id),
            expiresIn: '1d',
        });

        const token = await authenticateService.execute({
            email: 'test@macapa.com',
            pass: '1234'
        });
        
        expect(token).toEqual(tokenBase);
    });

    it('should be able login with email test@varejao.com', async () => {
        const client = await clientRepository.findByEmail('test@varejao.com');
        
        const tokenBase = sign({}, String(process.env.SECRETVAREJAO), {
            subject: String(client?.id),
            expiresIn: '1d',
        });

        const token = await authenticateService.execute({
            email: 'test@varejao.com',
            pass: '1234'
        });
        
        expect(token).toEqual(tokenBase);
    })

    it('should not be able login without name authenticate', async () => {
        await expect(authenticateService.execute({
            email: 'test@test.com',
            pass: '1234'
        })).rejects.toEqual(new AppError('Email or password not correct!', 401));
    })

    it('should not be able login with email wrong', async () => {
        await expect(authenticateService.execute({
            email: 'test@t.com',
            pass: '1234'
        })).rejects.toEqual(new AppError('Email or password not correct!', 401));
    })

    it('should not be able login with pass wrong', async () => {
        await expect(authenticateService.execute({
            email: 'test@varejao.com',
            pass: '123456'
        })).rejects.toEqual(new AppError('Email or password not correct!', 401));
    })

})