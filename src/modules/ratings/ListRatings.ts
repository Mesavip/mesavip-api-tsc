import { Request, Response } from 'express';
import { db } from '@shared/infra/knex/knex';

class ListRatings {
  async execute(request: Request, response: Response): Promise<Response> {
    const { reservation_id } = request.params;

    const ratings = await db
      .select([
        'r.id',
        'r.comment',
        'r.rating',
        db.raw(`to_char(r."createdAt", 'Mon dd, yyyy') as date`),
        'client.name as client',
      ])
      .from({ r: 'ratings' })
      .innerJoin('reservations', 'reservations.id', 'r.reservation_id')
      .innerJoin({ client: 'users' }, 'client.id', 'reservations.client_id')
      .where({
        'r.reservation_id': reservation_id,
      });
    if (!ratings.length) {
      return response.status(404).json({ error: 'No ratings were found' });
    }

    return response.status(200).json(ratings);
  }
}
export { ListRatings };
