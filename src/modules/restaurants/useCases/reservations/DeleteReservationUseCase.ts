import { Request, Response } from 'express';

import query from '../../../../shared/infra/knex/knex';

class DeleteReservationUseCase {
  async execute(request: Request, response: Response): Promise<Response> {
    const { reservation_id } = request.params;

    const reservation = await query('reservations')
      .where({ reservation_id })
      .first();

    if (!reservation) {
      return response.status(400).json({ error: 'Reservation does not exist' });
    }

    await query('reservations').where({ reservation_id }).delete();

    return response.status(201).send();
  }
}
export { DeleteReservationUseCase };
