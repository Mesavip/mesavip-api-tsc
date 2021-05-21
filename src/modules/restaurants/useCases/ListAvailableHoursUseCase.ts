import { Request, Response } from 'express';

import query from '../../../shared/infra/knex/knex';

class ListAvailableHoursUseCase {
  async execute(request: Request, response: Response): Promise<Response> {
    const { restaurant_id, date } = request.params;

    const availableHours = await query
      .distinct(['h.hour_id as id', 'h.restaurant_id', 'h.hour'])
      .from({ h: 'hours' })
      .innerJoin({ t: 'tables' }, 'h.restaurant_id', 't.restaurant_id')
      .whereNotExists(
        query({
          r: 'reservations',
        }).whereRaw(
          'r.table_id = t.table_id AND r.hour_id = h.hour_id AND date = ?',
          [date]
        )
      )
      .andWhere({ 'h.restaurant_id': restaurant_id })
      .orderBy('h.hour');

    if (!availableHours) {
      return response
        .status(404)
        .json({ error: 'No tables available in that date and time' });
    }

    return response.status(201).json(availableHours);
  }
}
export { ListAvailableHoursUseCase };
