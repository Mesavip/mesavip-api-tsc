import { Request, Response } from 'express';

import query from '../../shared/infra/knex/knex';

class CreateReservations {
  async execute(request: Request, response: Response): Promise<Response> {
    const { date, hour_id, restaurant_id } = request.params;
    const { id: client_id } = request.user;

    const table = await query
      .select('table_id')
      .from({ t: 'tables' })
      .whereNotExists(
        query({
          r: 'reservations',
        }).whereRaw(
          `r.table_id = t.table_id AND r.hour_id = ? AND r.date = ?`,
          [hour_id, date]
        )
      )
      .andWhere({ 't.restaurant_id': restaurant_id })
      .first();

    if (!table) {
      return response.status(400).json({ error: 'Reservation not available' });
    }

    const { table_id }: any = table;

    await query('reservations').insert({
      date,
      hour_id,
      client_id,
      table_id,
    });

    return response.status(201).send();
  }
}
export { CreateReservations };
