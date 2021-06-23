/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../../../../config/auth';

interface IPayload {
  userId: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  const secret_key: any = authConfig.secretKey;

  if (!authHeader) {
    return response.status(401).json({ error: 'Token is missing' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, secret_key);

    const { userId } = decoded as IPayload;

    request.user = {
      id: userId,
    };

    next();
  } catch {
    return response.status(401).json({ error: 'Token is invalid' });
  }
}
