import { Request, Response } from 'express';

import query from '../../shared/infra/knex/knex';

export class ListReservations {
  async listPastReservations(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id: client_id } = request.user;

    const pastReservations = await query
      .select([
        'r.id',
        'restaurants.name as restaurant',
        'restaurants.id as restaurant_id',
        'r.rated',
        query.raw(`to_char(r.date, 'dd') as day`),
        query.raw(`to_char(r.date, 'FMMonth') as month`),
        query.raw(`to_char(r.time, 'HH24:MI AM') as time`),
        query.raw('cast(avg(rat.rating) as decimal(10,1)) as avg_rating'),
        query.raw(`concat_ws(' - ', a.cidade, a.estado) as city`),
        query.raw(
          `concat_ws(', ', a.logradouro, a.numero, a.complemento) as address`
        ),
      ])
      .from({ r: 'reservations' })
      .innerJoin({ u: 'users' }, 'u.id', 'r.client_id')
      .innerJoin('restaurants', 'restaurants.id', 'r.restaurant_id')
      .innerJoin({ rat: 'ratings' }, 'restaurants.id', 'rat.restaurant_id')
      .innerJoin({ a: 'addresses' }, 'a.restaurant_id', 'restaurants.id')
      .where({ 'u.id': client_id, 'r.canceled': null })
      .andWhereRaw(`concat(r.date,' ', r.time)::timestamp < now()`)
      .groupBy(['restaurants.id', 'r.id', 'r.date', 'r. time', 'a.id'])
      .orderBy(['r.date', 'r.time']);

    if (!pastReservations.length) {
      return response.status(403).json({ error: 'No reservations were found' });
    }

    return response.status(200).json(pastReservations);
  }

  async listFollowingReservations(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id: client_id } = request.user;

    const followingReservations = await query
      .select([
        'r.id',
        'r.canceled',
        'restaurants.name as restaurant',
        'restaurants.id as restaurant_id',
        query.raw(`to_char(r.date, 'dd') as day`),
        query.raw(`to_char(r.date, 'FMMonth') as month`),
        query.raw(`to_char(r.time, 'HH24:MI AM') as time`),
        query.raw('cast(avg(rat.rating) as decimal(10,1)) as avg_rating'),
        query.raw(`concat_ws(' - ', a.cidade, a.estado) as city`),
        query.raw(
          `concat_ws(', ', a.logradouro, a.numero, a.complemento) as address`
        ),
      ])
      .from({ r: 'reservations' })
      .innerJoin({ u: 'users' }, 'u.id', 'r.client_id')
      .innerJoin('restaurants', 'restaurants.id', 'r.restaurant_id')
      .innerJoin({ rat: 'ratings' }, 'restaurants.id', 'rat.restaurant_id')
      .innerJoin({ a: 'addresses' }, 'a.restaurant_id', 'restaurants.id')
      .where({ 'u.id': client_id })
      .andWhereRaw(`concat(r.date,' ', r.time)::timestamp > now()`)
      .groupBy(['restaurants.id', 'r.id', 'r.date', 'r. time', 'a.id'])
      .orderBy(['r.date', 'r.time']);

    if (!followingReservations.length) {
      return response.status(403).json({ error: 'No reservations were found' });
    }

    return response.status(200).json(followingReservations);
  }
}
