import { hash } from 'bcrypt';
import { Request, Response } from 'express';

import query from '../../shared/infra/knex/knex';

interface ICreateUser {
  name: string;
  email: string;
  password: string;
  cpf: string;
}

class CreateUser {
  async execute(request: Request, response: Response): Promise<Response> {
    const { name, email, password, cpf }: ICreateUser = request.body;

    if (!cpf) {
      return response.status(401).json({ error: 'CPF invalid' });
    }

    const userAlreadyExists = await query('users')
      .where({ email })
      .orWhere({ cpf })
      .first();

    if (userAlreadyExists) {
      return response.status(401).json({ error: 'User already exists' });
    }

    const password_hash = await hash(password, 10);

    await query('users').insert({
      name,
      email,
      cpf,
      password_hash,
    });

    return response.status(201).send();
  }
}

export { CreateUser };
