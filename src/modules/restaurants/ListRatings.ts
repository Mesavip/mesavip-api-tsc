import { Request, Response } from 'express';

import query from '../../shared/infra/knex/knex';

class ListRatings {
  async execute(request: Request, response: Response): Promise<Response> {
    const { restaurant_id } = request.params;

    const ratings = await query
      .select([
        'comments.comment_id',
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

    return response.status(201).json(ratings);
  }
}
export { ListRatings };
