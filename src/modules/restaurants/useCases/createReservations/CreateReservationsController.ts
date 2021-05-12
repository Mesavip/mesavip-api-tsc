import { Request, Response } from 'express';

import { CreateReservationsUseCase } from './CreateReservationsUseCase';

class CreateReservationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { hour_id, restaurant_id } = request.params;
    const { id: client_id } = request.user;

    const createReservationsUseCase = new CreateReservationsUseCase();
    await createReservationsUseCase.execute({
      hour_id,
      restaurant_id,
      client_id,
    });

    return response.status(201).send();
  }
}
export { CreateReservationsController };
