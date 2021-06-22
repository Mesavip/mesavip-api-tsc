import { Request, Response } from 'express';

import query from '../../shared/infra/knex/knex';

class ListAvailableHours {
  async execute(request: Request, response: Response): Promise<Response> {
    const { restaurant_id, date } = request.params;

    const availableHours = await query
      .select(query.raw(`to_char(h.hour, 'HH24:MI') as hour`))
      .from({ h: 'hours' })
      .whereNotIn('h.hour', function () {
        this.select('r.time')
          .from({ r: 'reservations' })
          .innerJoin('restaurants', 'r.restaurant_id', 'restaurants.id')
          .where({ 'r.restaurant_id': restaurant_id, 'r.date': date })
          .groupBy('r.time', 'restaurants.tables_amount')
          .havingRaw(`count(r.time) = restaurants.tables_amount`);
      })
      .andWhere(query.raw('h.hour > now()::time'))
      .orderBy('h.hour');

    if (!availableHours.length) {
      return response.status(404).json({ error: 'Reservation not available' });
    }

    return response.status(201).json(availableHours);
  }
}
export { ListAvailableHours };
