import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../../config/auth';

export class TokenValidation {
  async execute(req: Request, res: Response) {
    const authHeader = req.headers.authorization;
    const secretKey: any = authConfig.secretKey;

    if (!authHeader) {
      return res.status(401).json({ error: 'Token is missing' });
    }

    const [, token] = authHeader?.split(' ');

    try {
      verify(token, secretKey);
      return res.status(200).send();
    } catch {
      return res.status(401).json({ error: 'Token is invalid or expired' });
    }
  }
}
