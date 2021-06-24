import { Request, Response } from 'express';

import query from '../../shared/infra/knex/knex';

class ListReservations {
  async execute(request: Request, response: Response): Promise<Response> {
    const { id: client_id } = request.user;

    const pastReservations = await query
      .select([
        'r.id',
        'restaurants.name as restaurant',
        query.raw(`to_char(r.time, 'HH24:MI') as time`),
        query.raw(`to_char(r.date, 'Mon dd, yyyy') as date`),
      ])
      .from({ r: 'reservations' })
      .innerJoin({ u: 'users' }, 'u.id', 'r.client_id')
      .innerJoin('restaurants', 'restaurants.id', 'r.restaurant_id')
      .where({ 'u.id': client_id, 'r.canceled': null })
      .andWhereRaw(`concat(r.date,' ', r.time)::timestamp < now()`)
      .orderBy(['r.date', 'r.time']);

    const followingReservations = await query
      .select([
        'r.id',
        'restaurants.name as restaurant',
        query.raw(`to_char(r.time, 'HH24:MI') as time`),
        query.raw(`to_char(r.date, 'Mon dd, yyyy') as date`),
        query.raw(
          `concat_ws(' - ', a.logradouro, a.numero, a.complemento, a.cidade, a.estado) as address`
        ),
      ])
      .from({ r: 'reservations' })
      .innerJoin({ u: 'users' }, 'u.id', 'r.client_id')
      .innerJoin('restaurants', 'restaurants.id', 'r.restaurant_id')
      .innerJoin({ a: 'addresses' }, 'a.restaurant_id', 'restaurants.id')
      .where({ 'u.id': client_id, 'r.canceled': null })
      .andWhereRaw(`concat(r.date,' ', r.time)::timestamp > now()`)
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
