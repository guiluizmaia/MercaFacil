import { NextFunction, Request, Response } from 'express';
import AppError from '@infra/http/errors/AppError';

import jwt from 'jsonwebtoken';

interface ITokenDecodeProps {
  iat: number;
  exp: number;
  sub: string;
  token_validator: string;
}

export default async function ensureAuthenticated(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError('token not found in header', 401);
  }

  const [bearer, token] = authorization.split(' ');

  if (
    bearer.toLowerCase() !== 'bearer' ||
    !token ||
    token.split('.').length !== 3
  ) {
    throw new AppError('The custom token format is incorrect', 401);
  }

  try {
    const { sub: client } = jwt.verify(
      token,
      String(process.env.SECRETMACAPA),
    ) as ITokenDecodeProps;

    req.client = "MACAPA"

    next();
  } catch (err) {
    try{
        const { sub: client } = jwt.verify(
            token,
            String(process.env.SECRETVAREJAO),
        ) as ITokenDecodeProps;
      
        req.client = "VAREJAO"
    
        next();
    } catch (err) {  
        if (err instanceof jwt.JsonWebTokenError) {
          throw new AppError('This token is inspired, login again.', 401);
        }
        throw err;
    }
  }
}
