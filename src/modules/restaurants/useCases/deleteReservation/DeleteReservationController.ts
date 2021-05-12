import { Request, Response } from 'express';

import { DeleteReservationUseCase } from './DeleteReservationUseCase';

class DeleteReservationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { reservation_id } = request.params;

    const deleteReservationUseCase = new DeleteReservationUseCase();
    await deleteReservationUseCase.execute({ reservation_id });

    return response.status(201).send();
  }
}
export { DeleteReservationController };
