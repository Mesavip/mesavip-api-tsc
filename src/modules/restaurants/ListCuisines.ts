import { Request, Response } from 'express';
import query from '../../shared/infra/knex/knex';

export class ListCuisines {
  async execute(request: Request, response: Response): Promise<Response> {
    const cuisines = await query('restaurants')
      .distinct('culinary as name')
      .limit(6);

    if (!cuisines.length) {
      return response.status(404).json({ error: 'Cuisines not found' });
    }

    return response.status(200).json(cuisines);
  }
}
