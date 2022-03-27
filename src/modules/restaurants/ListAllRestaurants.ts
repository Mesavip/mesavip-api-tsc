import { Request, Response } from 'express';
import query from '../../shared/infra/knex/knex';

interface queryTypes {
  name: string;
  cuisine: string;
  avg_rating: number;
}

class ListAllRestaurants {
  async execute(request: Request, response: Response): Promise<Response> {
    const {
      name,
      cuisine,
      avg_rating,
    } = (request.query as unknown) as queryTypes;

    const restaurants = await query
      .select([
        'r.id',
        'r.name',
        'r.culinary',
        'a.bairro',
        'f.path as image',
        query.raw('cast(avg(rat.rating) as decimal(10,1)) as avg_rating'),
      ])
      .count('rat.rating as total_reviews')
      .from({ r: 'restaurants' })
      .innerJoin({ a: 'addresses' }, 'a.restaurant_id', 'r.id')
      .innerJoin({ f: 'files' }, 'r.id', 'f.restaurant_id')
      .leftJoin({ rat: 'ratings' }, 'rat.restaurant_id', 'r.id')
      .where({ 'f.type': 'list' })
      .where((query) => {
        if (name) {
          query.whereRaw(`upper(r.name) like upper('%'||?||'%')`, [name]);
        }

        if (cuisine) {
          query.where({ 'r.culinary': cuisine });
        }

        if (avg_rating) {
          query.whereRaw(
            `(select
          cast(avg(rat.rating) as decimal(10,1)) as avg_rating
          from restaurants res
          left join ratings rat on r.id = rat.restaurant_id
          where res.id = r.id
          group by r.id) >= ?`,
            [avg_rating]
          );
        }
      })
      .groupBy(['r.id', 'f.id', 'a.id'])
      .orderBy('avg_rating', 'desc');

    if (!restaurants.length) {
      return response.status(401).json({ error: 'Restaurants not found' });
    }

    return response.status(200).json(restaurants);
  }
}
export { ListAllRestaurants };
