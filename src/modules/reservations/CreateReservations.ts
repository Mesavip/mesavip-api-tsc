import { Request, Response } from 'express';

import query from '../../shared/infra/knex/knex';

class CreateReservations {
  async execute(request: Request, response: Response): Promise<Response> {
    const { date, time, restaurant_id } = request.body;
    const { id: client_id } = request.user;

    const { tables_amount } = await query('restaurants')
      .select(['tables_amount'])
      .where({ id: restaurant_id })
      .first();

    const reservations = await query
      .select(['r.id'])
      .from({ r: 'reservations' })
      .innerJoin('restaurants', 'r.restaurant_id', 'restaurants.id')
      .where({ 'r.restaurant_id': restaurant_id, date, time, canceled: null })
      .limit(tables_amount);

    if (reservations.length === tables_amount) {
      return response.status(404).json({ error: 'Reservation not available' });
    }

    const [id] = await query('reservations')
      .insert({
        date,
        time,
        client_id,
        restaurant_id,
      })
      .returning(['id']);

    return response.status(201).json({ id });
  }
}
export { CreateReservations };
