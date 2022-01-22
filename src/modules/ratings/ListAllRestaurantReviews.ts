import { Request, Response } from 'express';
import { db } from '@shared/infra/knex/knex';

class ListAllRestaurantReviews {
  async execute(request: Request, response: Response): Promise<Response> {
    const { restaurant_id } = request.params;

    const reviews = await db
      .select([
        'r.comment',
        'r.rating',
        db.raw(`to_char(r."createdAt", 'Mon dd, yyyy') as date`),
        'client.name as client',
      ])
      .from({ r: 'ratings' })
      .innerJoin({ client: 'users' }, 'client.id', 'r.client_id')
      .where({
        'r.restaurant_id': restaurant_id,
      });

    if (!reviews.length) {
      return response.status(404).json({ error: 'No reviews were found' });
    }

    return response.status(200).json(reviews);
  }
}
export { ListAllRestaurantReviews };
