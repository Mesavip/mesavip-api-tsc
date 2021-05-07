import { Request, Response } from 'express';

import query from '../../../shared/infra/knex/knex';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

class ListUserUseCase {
  async handle(request: Request, response: Response): Promise<Response> {
    const user = await query<ICreateUserDTO>('users');
    return response.json(user);
  }
}

export { ListUserUseCase };
