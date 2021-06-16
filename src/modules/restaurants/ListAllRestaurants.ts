import { Request, Response } from 'express';

import query from '../../shared/infra/knex/knex';

class ListAllRestaurants {
  async execute(request: Request, response: Response): Promise<Response> {
    const restaurants = await query
      .select([
        'u.user_id as id',
        'u.name',
        'c.name as culinary',
        'a.bairro',
        'f.path',
        query.raw('cast(avg(rates.rate) as decimal(10,1)) as average_rate'),
      ])
      .from({ u: 'users' })
      .innerJoin({ r: 'restaurants' }, 'u.user_id', 'r.restaurant_id')
      .innerJoin({ c: 'culinaries' }, 'c.culinary_id', 'r.culinary_id')
      .innerJoin({ a: 'addresses' }, 'a.user_id', 'r.restaurant_id')
      .innerJoin({ f: 'files' }, 'u.user_id', 'f.user_id')
      .innerJoin('rates', 'rates.restaurant_id', 'r.restaurant_id')
      .where({ 'f.type': 'list' })
      .groupBy([
        'u.user_id',
        'r.id',
        'f.file_id',
        'c.culinary_id',
        'a.address_id',
      ]);
    if (!restaurants.length) {
      return response.status(400).json({ error: 'Restaurants not found' });
    }

    return response.status(201).json(restaurants);
  }
}
export { ListAllRestaurants };
