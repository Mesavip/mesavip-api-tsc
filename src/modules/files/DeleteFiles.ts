import cloudinary from 'cloudinary';
import { Request, Response } from 'express';

import * as cloudinaryConfig from '../../config/cloudinary';
import query from '../../shared/infra/knex/knex';

class DeleteFiles {
  async execute(request: Request, response: Response): Promise<Response> {
    const restaurant_id = request.user.id;
    const { type } = request.params;

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

    if (!files.length) {
      return response
        .status(400)
        .json({ error: `Files with ${type} type not found` });
    }

    const filesToBeDeleted = files.map((file) => file.public_id);

    cloudinary.v2.config(cloudinaryConfig);
    await cloudinary.v2.api.delete_resources(filesToBeDeleted);

    await query('files')
      .whereIn('public_id', filesToBeDeleted)
      .andWhere({ user_id: restaurant_id })
      .delete();

    return response.status(201).send();
  }
}
export { DeleteFiles };
