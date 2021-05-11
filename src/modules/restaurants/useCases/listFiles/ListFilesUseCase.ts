import { AppError } from '../../../../shared/errors/AppError';
import query from '../../../../shared/infra/knex/knex';

interface IRequest {
  restaurant_id: string;
  type: string;
}

class ListFilesUseCase {
  async execute({ restaurant_id, type }: IRequest): Promise<any[]> {
    const files = await query
      .select(['file_id', 'path'])
      .from('files')
      .where({ user_id: restaurant_id, type });

    if (!files) {
      throw new AppError('Files not found');
    }

    console.log(files);

    return files;
  }
}
export { ListFilesUseCase };
