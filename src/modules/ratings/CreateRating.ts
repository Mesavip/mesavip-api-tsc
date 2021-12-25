import { Request, Response } from 'express';
import { db } from '../../shared/infra/knex/knex';
import { Rating } from '../../interfaces/Rating';
import { Reservation } from '../../interfaces/Reservation';

interface IRequest {
  rating: Rating;
}

export class CreateRatings {
  async execute(request: Request, response: Response): Promise<Response> {
    const { rating }: IRequest = request.body;
    console.log(rating);

    const [CanUserRateTheReservation] = await db<Reservation>('reservations')
      .where({ id: rating.reservation_id, canceled: null })
      .andWhereRaw(
        `concat(date, ' ',time)::timestamp + interval '1 hour' < now()`
      )
      .returning('id');

    if (!CanUserRateTheReservation) {
      return response.status(405).json({
        error:
          'You can only rate a reservation one hour after the scheduled time',
      });
    }

    await db<Rating>('ratings').insert([
      {
        client_id: rating.client_id,
        restaurant_id: rating.restaurant_id,
        reservation_id: rating.reservation_id,
        rating: rating.rating,
        comment: rating.comment,
      },
    ]);

    await db<Reservation>('reservations')
      .where({ id: rating.reservation_id })
      .update({
        rated: true,
      });

    return response.status(201).send();
  }
}
