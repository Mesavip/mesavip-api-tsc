import { AppError } from '../../../../shared/errors/AppError';
import query from '../../../../shared/infra/knex/knex';

// Do I really need that interface???
interface IData {
  restaurant_id: string;
}

class ListRatingsUseCase {
  async execute({ restaurant_id }: IData): Promise<any[]> {
    const ratings = await query
      .select([
        'comments.comment_id',
        'comments.comment',
        'comments.createdAt',
        'rates.rate',
        'client.name as client',
      ])
      .from('comments')
      .innerJoin({ client: 'users' }, 'client.user_id', 'comments.client_id')
      .innerJoin('rates', 'client.user_id', 'rates.client_id')
      .where({
        'comments.restaurant_id': restaurant_id,
        'rates.restaurant_id': restaurant_id,
      });

    console.log(ratings);

    return ratings;
  }
}
export { ListRatingsUseCase };
