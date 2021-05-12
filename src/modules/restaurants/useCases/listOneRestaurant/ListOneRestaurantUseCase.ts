import { AppError } from '../../../../shared/errors/AppError';
import query from '../../../../shared/infra/knex/knex';

interface IRequest {
  restaurant_id: string;
}

class ListOneRestaurantUseCase {
  async execute({ restaurant_id }: IRequest): Promise<any[]> {
    const restaurant = await query
      .select([
        'u.name',
        'r.about',
        'r.phone',
        'c.name AS culinary',
        'a.bairro',
        'a.cidade',
        'a.estado',
        'a.cep',
        'a.logradouro',
        'a.numero',
        'a.complemento',
        query.raw('cast(avg(rates.rate) as decimal(10,1)) AS average_rate'),
      ])
      .count('rates.rate as total_ratings')
      .from({ u: 'users' })
      .innerJoin({ r: 'restaurants' }, 'u.user_id', 'r.restaurant_id')
      .innerJoin({ c: 'culinaries' }, 'c.culinary_id', 'r.culinary_id')
      .innerJoin({ a: 'addresses' }, 'a.user_id', 'r.restaurant_id')
      .innerJoin('rates', 'rates.restaurant_id', 'r.restaurant_id')
      .where({ 'r.restaurant_id': restaurant_id })
      .groupBy(['u.user_id', 'r.id', 'c.culinary_id', 'a.address_id']);

    if (!restaurant) {
      throw new AppError('Restaurant not found');
    }
    return restaurant;
  }
}
export { ListOneRestaurantUseCase };
