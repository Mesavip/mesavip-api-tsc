import { Request, Response } from 'express';

import { ListReservationsUseCase } from './ListReservationsUseCase';

class ListReservationsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: client_id } = request.user;

    const listReservationsUseCase = new ListReservationsUseCase();
    const reservations = await listReservationsUseCase.execute({ client_id });

    return response.status(201).json(reservations);
  }
}
export { ListReservationsController };
