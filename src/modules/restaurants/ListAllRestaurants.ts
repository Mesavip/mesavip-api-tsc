import { Request, Response } from 'express';

import query from '../../shared/infra/knex/knex';

class ListAllRestaurants {
  async execute(request: Request, response: Response): Promise<Response> {
    const { name } = request.params;
    const restaurant_name = name ? name : '';

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
      .leftJoin({ rat: 'ratings' }, 'rat.restaurant_id', 'r.id')
      .where({ 'f.type': 'list' })
      //It's done like this, because of the issue below
      //https://github.com/knex/knex/issues/1207#issuecomment-185079698
      .whereRaw(`upper(r.name) like upper('%'||?||'%')`, [restaurant_name])
      .groupBy(['r.id', 'f.id', 'c.id', 'a.id']);

    if (!restaurants.length) {
      return response.status(404).json({ error: 'Restaurants not found' });
    }

    return response.status(200).json(restaurants);
  }
}
export { ListAllRestaurants };
