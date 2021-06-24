import { Request, Response } from 'express';

import query from '../../shared/infra/knex/knex';

class ListAvailableHours {
  async execute(request: Request, response: Response): Promise<Response> {
    const { restaurant_id, date } = request.params;

    const { opening_hour, closing_hour } = await query('restaurants')
      .select(['opening_hour', 'closing_hour'])
      .where({ id: restaurant_id })
      .first();

    const availableHours = await query
      .select('h.id', query.raw(`to_char(h.hour, 'HH24:MI') as hour`))
      .from({ h: 'hours' })
      .whereNotIn('h.hour', function () {
        this.select('r.time')
          .from({ r: 'reservations' })
          .innerJoin('restaurants', 'r.restaurant_id', 'restaurants.id')
          .where({ 'r.restaurant_id': restaurant_id, 'r.date': date })
          .groupBy('r.time', 'restaurants.tables_amount')
          .havingRaw('count(r.time) = restaurants.tables_amount');
      })
      .whereRaw('h.hour > now()::time')
      .andWhere('h.hour', '>=', opening_hour)
      .andWhere('h.hour', '<=', closing_hour)
      .orderBy('h.hour');

    if (!availableHours.length) {
      return response.status(404).json({ error: 'Reservation not available' });
    }

    return response.status(201).json(availableHours);
  }
}
export { ListAvailableHours };
