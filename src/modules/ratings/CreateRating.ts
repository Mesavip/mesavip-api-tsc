import { Request, Response } from 'express';
import { Rating } from '../../interfaces/Rating';
import { Reservation } from '../../interfaces/Reservation';
import { db } from '../../shared/infra/knex/knex';

interface IResponse {
  rating: Rating;
  reservation_id: string;
}

export class CreateRatings {
  async execute(request: Request, response: Response): Promise<Response> {
    const { rating, reservation_id }: IResponse = request.body;

    const [id] = await db<Reservation>('reservations')
      .where({ id: reservation_id, canceled: null })
      .andWhereRaw(
        `concat(date, ' ',time)::timestamp + interval '1 hour' < now()`
      )
      .returning('id');

    if (!id) {
      return response.status(405).json({
        error:
          'You can only rate a reservation one hour after the scheduled time',
      });
    }

    await db<Rating>('ratings').insert([
      {
        client_id: rating.client_id,
        restaurant_id: rating.restaurant_id,
        rating: rating.rating,
        comment: rating.comment,
      },
    ]);

    return response.status(201).send();
  }
}
