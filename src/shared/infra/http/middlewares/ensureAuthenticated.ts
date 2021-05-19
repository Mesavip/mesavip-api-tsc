/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../../../../config/auth';
import { AppError } from '../../../errors/AppError';

interface IPayload {
  userId: string;
  userType: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;
  const secret_key: any = authConfig.secretKey;

  if (!authHeader) {
    throw new AppError('Token missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, secret_key);

    const { userId, userType } = decoded as IPayload;

    request.user = {
      id: userId,
      type: userType,
    };

    next();
  } catch {
    throw new AppError('Invalid token!', 401);
  }
}
