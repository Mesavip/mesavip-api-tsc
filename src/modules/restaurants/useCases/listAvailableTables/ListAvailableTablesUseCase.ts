import { AppError } from '../../../../shared/errors/AppError';
import query from '../../../../shared/infra/knex/knex';

interface IRequest {
  restaurant_id: string;
}

class ListAvailableTablesUseCase {
  async execute({ restaurant_id }: IRequest): Promise<any[]> {
    const availableTables = await query
      .distinct(['h.hour_id as id', 'h.restaurant_id', 'h.hour'])
      .from({ h: 'hours' })
      .innerJoin({ t: 'tables' }, 'h.restaurant_id', 't.restaurant_id')
      .whereNotExists(
        query({ r: 'reservations' }).whereRaw(
          'r.table_id = t.table_id AND r.hour_id = h.hour_id'
        )
      )
      .andWhere({ 'h.restaurant_id': restaurant_id })
      .orderBy('h.hour');

    if (!availableTables) {
      throw new AppError('No tables available');
    }

    return availableTables;
  }
}
export { ListAvailableTablesUseCase };
