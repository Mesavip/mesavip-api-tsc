import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import authConfig from '../../../../config/auth';
import { AppError } from '../../../../shared/errors/AppError';
import query from '../../../../shared/infra/knex/knex';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  user: {
    name: string;
    email: string;
    type: string;
  };
}

class AuthenticateUserCase {
  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await query('users').where({ email }).first();

    if (!user) {
      throw new AppError('Incorrect email or password');
    }

    const { expiresIn } = authConfig;
    const secret_key: any = authConfig.secretKey;

    const doesPasswordsMatch = await compare(password, user.password_hash);

    if (!doesPasswordsMatch) {
      throw new AppError('incorrect email or password');
    }

    const token = sign(
      { userId: user.user_id, userType: user.type },
      secret_key,
      {
        expiresIn,
      }
    );

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
        type: user.type,
      },
    };

    return tokenReturn;
  }
}

export { AuthenticateUserCase };
