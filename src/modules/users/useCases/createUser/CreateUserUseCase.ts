import { hash } from 'bcrypt';

import { AppError } from '../../../../shared/errors/AppError';
import query from '../../../../shared/infra/knex/knex';

interface ICreateUser {
  name: string;
  email: string;
  user_register_type: string;
  type: string;
  password: string;
}

class CreateUserUseCase {
  async execute({
    name,
    email,
    user_register_type,
    type,
    password,
  }: ICreateUser): Promise<void> {
    const userAlreadyExists = await query('users').where({ email }).first();

    if (userAlreadyExists) {
      throw new AppError('User already exists');
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
  }
}

export { CreateUserUseCase };
