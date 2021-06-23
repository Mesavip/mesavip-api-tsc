import { Request, Response } from 'express';

import query from '../../shared/infra/knex/knex';

class ListRatings {
  async execute(request: Request, response: Response): Promise<Response> {
    const { restaurant_id } = request.params;

    const ratings = await query
      .select([
        'r.id',
        'r.comment',
        'r.rating',
        query.raw(`to_char(r."createdAt", 'Mon dd, yyyy') as date`),
        'client.name as client',
      ])
      .from({ r: 'ratings' })
      .innerJoin({ client: 'users' }, 'client.id', 'r.client_id')
      .where({
        'r.restaurant_id': restaurant_id,
      })
      .first();

    if (!ratings) {
      return response.status(404).json({ error: 'No ratings were found' });
    }

    return response.status(200).json(ratings);
  }
}
export { ListRatings };
