import { AppError } from '../../../../shared/errors/AppError';
import query from '../../../../shared/infra/knex/knex';

interface IRequest {
  reservation_id: string;
}

class DeleteReservationUseCase {
  async execute({ reservation_id }: IRequest): Promise<void> {
    const reservation = await query('reservations')
      .where({ reservation_id })
      .first();

    if (!reservation) {
      throw new AppError('Reservation does not exist');
    }

    await query('reservations').where({ reservation_id }).delete();
  }
}
export { DeleteReservationUseCase };
