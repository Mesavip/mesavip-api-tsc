import { Request, Response } from 'express';

import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const user_register_type = request.body.cpf ?? request.body.cnpj;
    const type = request.body.cpf ? 'CLI' : 'RES';

    const createUserUseCase = new CreateUserUseCase();

    await createUserUseCase.execute({
      name,
      email,
      user_register_type,
      type,
      password,
    });

    return response.status(201).send();
  }
}

export { CreateUserController };
