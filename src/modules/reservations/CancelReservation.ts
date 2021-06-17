import { Request, Response } from 'express';

import query from '../../shared/infra/knex/knex';

class CancelReservation {
  async execute(request: Request, response: Response): Promise<Response> {
    const { reservation_id } = request.params;

    const reservation = await query('reservations')
      .where({ reservation_id })
      .first();

    if (!reservation) {
      return response.status(400).json({ error: 'Reservation does not exist' });
    }

    const [canceled] = await query('reservations')
      .update({ canceled: true })
      .where({ reservation_id })
      .returning(['canceled']);

    return response.status(200).json(canceled);
  }
}
export { CancelReservation };
