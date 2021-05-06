import { Request, Response } from 'express';
import { v4 as uuid } from 'uuid';

import query from '../../database/knex';

interface IUser {
  user_id: string;
  name: string;
  email: string;
  cpf?: string;
  cnpj?: string;
}

class Testing {
  async index(request: Request, response: Response): Promise<Response> {
    const user = await query<IUser>('users');
    return response.json(user);
  }

  async store(request: Request, response: Response): Promise<Response> {
    const user: IUser = request.body;

    await query<IUser>('users').insert({ name: user.name });

    return response.json(user);
  }
}

export { Testing };
