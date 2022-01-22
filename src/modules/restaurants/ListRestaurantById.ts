import { Request, Response } from 'express';

import query from '../../shared/infra/knex/knex';

class ListRestaurantById {
  async execute(request: Request, response: Response): Promise<Response> {
    const { restaurant_id } = request.params;

    const restaurant = await query
      .select([
        'r.id',
        'r.name',
        'r.about',
        'r.phone',
        'r.site',
        'r.culinary',
        query.raw(
          `json_build_object(
            'bairro',a.bairro,
            'cidade', a.cidade,
            'estado', a.estado,
            'cep', a.cep,
            'logradouro', a.logradouro,
            'numero', a.numero,
            'complemento', a.complemento
            )as address`
        ),
        query.raw('cast(avg(rat.rating) as decimal(10,1)) AS avg_rating'),
        query.raw(
          `concat_ws(
          ' - ',
          to_char(r.opening_hour, 'HH24:MI'),
          to_char(r.closing_hour, 'HH24:MI')
          ) as operation_hours`
        ),
      ])
      .count('rat.rating as total_reviews')
      .from({ r: 'restaurants' })
      .innerJoin({ a: 'addresses' }, 'a.restaurant_id', 'r.id')
      .innerJoin({ rat: 'ratings' }, 'rat.restaurant_id', 'r.id')
      .where({ 'r.id': restaurant_id })
      .groupBy(['r.id', 'a.id'])
      .first();

    if (!restaurant) {
      return response.status(404).json({ error: 'Restaurant not found' });
    }

    return response.status(200).json(restaurant);
  }
}
export { ListRestaurantById };
