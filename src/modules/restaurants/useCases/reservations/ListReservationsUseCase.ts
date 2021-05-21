import { Request, Response } from 'express';

import query from '../../../../shared/infra/knex/knex';

class ListReservationsUseCase {
  async execute(request: Request, response: Response): Promise<Response> {
    const { id: client_id } = request.user;

    const reservations = await query
      .select(['r.reservation_id as id', 'h.hour', 'u.name as restaurant'])
      .from({ r: 'reservations' })
      .innerJoin({ h: 'hours' }, 'r.hour_id', 'h.hour_id')
      .innerJoin({ u: 'users' }, 'u.user_id', 'h.restaurant_id')
      .where({ 'r.client_id': client_id });

    if (!reservations.length) {
      return response.status(400).json({ error: 'No reservations were found' });
    }

    return response.status(201).json(reservations);
  }
}
export { ListReservationsUseCase };
