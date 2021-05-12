import { AppError } from '../../../../shared/errors/AppError';
import query from '../../../../shared/infra/knex/knex';

class ListAllRestaurantsUseCase {
  async execute(): Promise<any[]> {
    const restaurants = await query
      .select([
        'u.user_id',
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

    if (!restaurants) {
      throw new AppError('Restaurants not found');
    }
    return restaurants;
  }
}
export { ListAllRestaurantsUseCase };
