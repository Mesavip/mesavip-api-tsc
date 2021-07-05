import { Request, Response } from 'express';

import query from '../../shared/infra/knex/knex';

class ListReservations {
  async execute(request: Request, response: Response): Promise<Response> {
    const { id: client_id } = request.user;

    const pastReservations = await query
      .select([
        'r.id',
        'restaurants.name as restaurant',
        query.raw(`to_char(r.date, 'dd') as day`),
        query.raw(`to_char(r.date, 'FMMonth') as month`),
        query.raw(`to_char(r.time, 'HH24:MI AM') as time`),
        query.raw('cast(avg(rat.rating) as decimal(10,1)) as avg_rating'),
      ])
      .from({ r: 'reservations' })
      .innerJoin({ u: 'users' }, 'u.id', 'r.client_id')
      .innerJoin('restaurants', 'restaurants.id', 'r.restaurant_id')
      .innerJoin({ rat: 'ratings' }, 'restaurants.id', 'rat.restaurant_id')
      .where({ 'u.id': client_id, 'r.canceled': null })
      .andWhereRaw(`concat(r.date,' ', r.time)::timestamp < now()`)
      .groupBy(['restaurants.id', 'r.id', 'r.date', 'r. time'])
      .orderBy(['r.date', 'r.time']);

    const followingReservations = await query
      .select([
        'r.id',
        'restaurants.name as restaurant',
        query.raw(`to_char(r.date, 'dd') as day`),
        query.raw(`to_char(r.date, 'FMMonth') as month`),
        query.raw(`to_char(r.time, 'HH24:MI AM') as time`),
        query.raw(`concat_ws(' - ', a.cidade, a.estado) as city`),
        query.raw(
          `concat_ws(', ', a.logradouro, a.numero, a.complemento) as address`
        ),
        query.raw('cast(avg(rat.rating) as decimal(10,1)) as avg_rating'),
      ])
      .from({ r: 'reservations' })
      .innerJoin({ u: 'users' }, 'u.id', 'r.client_id')
      .innerJoin('restaurants', 'restaurants.id', 'r.restaurant_id')
      .innerJoin({ a: 'addresses' }, 'a.restaurant_id', 'restaurants.id')
      .innerJoin({ rat: 'ratings' }, 'restaurants.id', 'rat.restaurant_id')
      .where({ 'u.id': client_id, 'r.canceled': null })
      .andWhereRaw(`concat(r.date,' ', r.time)::timestamp > now()`)
      .groupBy(['restaurants.id', 'r.id', 'a.id', 'r.date', 'r. time'])
      .orderBy(['r.date', 'r.time']);

    if (!pastReservations && !followingReservations.length) {
      return response.status(403).json({ error: 'No reservations were found' });
    }

    return response
      .status(200)
      .json({ pastReservations, followingReservations });
  }
}
export { ListReservations };
