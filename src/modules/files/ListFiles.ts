import { Request, Response } from 'express';

import query from '../../shared/infra/knex/knex';

class ListFiles {
  async execute(request: Request, response: Response): Promise<Response> {
    const { restaurant_id, type } = request.params;

    const files = await query
      .select(['file_id', 'path'])
      .from('files')
      .where({ user_id: restaurant_id, type });

    if (!files.length) {
      return response.status(401).json({ error: 'files not found' });
    }

    return response.status(201).json(files);
  }
}
export { ListFiles };
