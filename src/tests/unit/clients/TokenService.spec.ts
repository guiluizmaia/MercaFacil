import AppError from "@infra/http/errors/AppError";
import TokenService from "@modules/clients/services/TokenService";
import { sign } from "jsonwebtoken";

let tokenService: TokenService;

describe("TokenService", () => {
    beforeAll(async () => {
        tokenService = new TokenService();
    })

    it("should be able find a token with client 'MACAPA'", async () => {
        const tokenBase = sign({}, String(process.env.SECRETMACAPA), {
            subject: "MACAPA",
            expiresIn: "1d",
        });

        const token = await tokenService.execute({client: "MACAPA"});

        
        expect(token).toEqual(tokenBase);
    })

    it("should be able find a token with client 'VAREJAO'", async () => {
        const tokenBase = sign({}, String(process.env.SECRETVAREJAO), {
            subject: "VAREJAO",
            expiresIn: "1d",
        });

        const token = await tokenService.execute({client: "VAREJAO"});

        
        expect(token).toEqual(tokenBase);
    })

    it("should be able find a token with client wrong", async () => {
        await expect(tokenService.execute({client: "ERRADO"}))
            .rejects.toEqual(new AppError("Client not found", 401));
    })
})