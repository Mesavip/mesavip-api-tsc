import { AppError } from '../../../../shared/errors/AppError';
import query from '../../../../shared/infra/knex/knex';

interface IRequest {
  hour_id: string;
  restaurant_id: string;
  client_id: string;
}

class CreateReservationsUseCase {
  async execute({
    hour_id,
    restaurant_id,
    client_id,
  }: IRequest): Promise<void> {
    const table = await query
      .select('table_id')
      .from({ t: 'tables' })
      .whereNotExists(
        query({
          r: 'reservations',
        }).whereRaw('r.table_id = t.table_id AND r.hour_id = ?', [hour_id])
      )
      .andWhere({ 't.restaurant_id': restaurant_id })
      .first();

    if (!table) {
      throw new AppError('Reservation not available');
    }

    const { table_id }: any = table;

    await query('reservations').insert({
      hour_id,
      client_id,
      table_id,
    });
  }
}
export { CreateReservationsUseCase };
