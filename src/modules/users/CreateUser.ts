import { hash } from 'bcrypt';
import { Request, Response } from 'express';

import query from '../../shared/infra/knex/knex';

class CreateUser {
  async execute(request: Request, response: Response): Promise<Response> {
    const { name, email, password, cpf } = request.body;

    if (!cpf) {
      return response.status(401).json({ error: 'CPF invalid' });
    }

    const userAlreadyExists = await query('users').where({ email }).first();

    if (userAlreadyExists) {
      return response.status(401).json({ error: 'User already exists' });
    }

    const password_hash = await hash(password, 10);

    await query('users').insert({
      name,
      email,
      cpf,
      type: 'CLI',
      password_hash,
    });

    return response.status(201).send();
  }
}

export { CreateUser };
