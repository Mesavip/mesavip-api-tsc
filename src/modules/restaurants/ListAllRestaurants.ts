import { Request, Response } from 'express';

import query from '../../shared/infra/knex/knex';

class ListAllRestaurants {
  async execute(request: Request, response: Response): Promise<Response> {
    const restaurants = await query
      .select([
        'r.id',
        'r.name',
        'c.name as culinary',
        'a.bairro',
        'f.path as image',
        query.raw('cast(avg(rat.rating) as decimal(10,1)) as avg_rating'),
      ])
      .from({ r: 'restaurants' })
      .innerJoin({ c: 'culinaries' }, 'c.id', 'r.culinary_id')
      .innerJoin({ a: 'addresses' }, 'a.restaurant_id', 'r.id')
      .innerJoin({ f: 'files' }, 'r.id', 'f.restaurant_id')
      .innerJoin({ rat: 'ratings' }, 'rat.restaurant_id', 'r.id')
      .where({ 'f.type': 'list' })
      .groupBy(['r.id', 'f.id', 'c.id', 'a.id']);

    if (!restaurants.length) {
      return response.status(404).json({ error: 'Restaurants not found' });
    }

    return response.status(200).json(restaurants);
  }
}
export { ListAllRestaurants };
