import { AppError } from '../../../../shared/errors/AppError';
import query from '../../../../shared/infra/knex/knex';

interface IRequest {
  restaurant_id: string;
}

class ListHoursUseCase {
  async execute({ restaurant_id }: IRequest): Promise<any[]> {
    const hours = await query
      .select(['hour_id', 'hour'])
      .from('hours')
      .where({ restaurant_id });

    if (!hours) {
      throw new AppError('No hours registered');
    }

    return hours;
  }
}
export { ListHoursUseCase };
