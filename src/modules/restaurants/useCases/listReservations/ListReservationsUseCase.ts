import { AppError } from '../../../../shared/errors/AppError';
import query from '../../../../shared/infra/knex/knex';

interface IRequest {
  client_id: string;
}

class ListReservationsUseCase {
  async execute({ client_id }: IRequest): Promise<any[]> {
    const reservations = await query
      .select(['r.reservation_id as id', 'h.hour', 'u.name as restaurant'])
      .from({ r: 'reservations' })
      .innerJoin({ h: 'hours' }, 'r.hour_id', 'h.hour_id')
      .innerJoin({ u: 'users' }, 'u.user_id', 'h.restaurant_id')
      .where({ 'r.client_id': client_id });

    if (!reservations) {
      throw new AppError('No reservations were found');
    }

    return reservations;
  }
}
export { ListReservationsUseCase };
