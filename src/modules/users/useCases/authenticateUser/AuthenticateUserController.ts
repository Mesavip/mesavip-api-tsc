import { Request, Response } from 'express';

import { AuthenticateUserCase } from './AuthenticateUserCase';

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUserCase = new AuthenticateUserCase();
    const token = await authenticateUserCase.execute({ email, password });

    return response.json(token);
  }
}

export { AuthenticateUserController };
