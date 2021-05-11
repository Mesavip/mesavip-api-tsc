import cloudinary from 'cloudinary';

import * as cloudinaryConfig from '../../../../config/cloudinary';
import { AppError } from '../../../../shared/errors/AppError';
import query from '../../../../shared/infra/knex/knex';

interface IRequest {
  restaurant_id: string;
  type: string;
}

class DeleteFilesUseCase {
  async execute({ restaurant_id, type }: IRequest): Promise<void> {
    const files = await query
      .select('public_id', 'type')
      .from('files')
      .where({
        user_id: restaurant_id,
      })
      .andWhere(function () {
        if (type === 'galeria') {
          this.where({ type });
        } else {
          this.whereNot({ type: 'galeria' });
        }
      });

    if (!files) {
      throw new AppError(`Files with ${type} type not found`);
    }

    const filesToBeDeleted = files.map((file) => file.public_id);

    cloudinary.v2.config(cloudinaryConfig);
    await cloudinary.v2.api.delete_resources(filesToBeDeleted);

    const deletedFiles = await query('files')
      .whereIn('public_id', filesToBeDeleted)
      .andWhere({ user_id: restaurant_id })
      .delete();
  }
}
export { DeleteFilesUseCase };
