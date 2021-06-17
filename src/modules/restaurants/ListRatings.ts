import { Request, Response } from 'express';

import query from '../../shared/infra/knex/knex';

class ListRatings {
  async execute(request: Request, response: Response): Promise<Response> {
    const { restaurant_id } = request.params;

    const ratings = await query
      .select([
        'comments.comment_id as id',
        'comments.comment',
        query.raw(`to_char(comments."createdAt", 'Mon dd, yyyy') as date`),
        'rates.rate',
        'client.name as client',
      ])
      .from('comments')
      .innerJoin({ client: 'users' }, 'client.user_id', 'comments.client_id')
      .innerJoin('rates', 'client.user_id', 'rates.client_id')
      .where({
        'comments.restaurant_id': restaurant_id,
        'rates.restaurant_id': restaurant_id,
      });

    if (ratings.length === 0) {
      return response.status(404).json({ error: 'No ratings were found' });
    }

    return response.status(200).json(ratings);
  }
}
export { ListRatings };
