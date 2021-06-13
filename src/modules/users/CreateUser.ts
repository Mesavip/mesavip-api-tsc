import { hash } from 'bcrypt';
import { Request, Response } from 'express';

import query from '../../shared/infra/knex/knex';

class CreateUser {
  async execute(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const user_register_type = request.body.cpf ?? request.body.cnpj;
    const type = request.body.cpf ? 'CLI' : 'RES';

    const userAlreadyExists = await query('users').where({ email }).first();

    if (userAlreadyExists) {
      return response.status(201).json({ error: 'User already exists' });
    }

    const cpf_or_cnpj = type === 'CLI' ? 'cpf' : 'cnpj';
    const password_hash = await hash(password, 10);

    await query('users').insert({
      name,
      email,
      [cpf_or_cnpj]: user_register_type,
      type,
      password_hash,
    });

    return response.status(201).send();
  }
}

export { CreateUser };
