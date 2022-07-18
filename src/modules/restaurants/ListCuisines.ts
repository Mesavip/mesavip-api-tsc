import { Request, Response } from 'express';
import query from '../../shared/infra/knex/knex';

export class ListCuisines {
  async execute(request: Request, response: Response): Promise<Response> {
    const cuisines = await query
      .raw(
        `
        SELECT DISTINCT
        culinary AS name,
        (
          SELECT COUNT(r2.id)
          FROM restaurants r2
          WHERE r2.culinary = r.culinary
        ) AS total
        FROM restaurants r
        GROUP BY id
      `
      )
      .then((res) => res.rows);

    if (!cuisines.length) {
      return response.status(404).json({ error: 'Cuisines not found' });
    }

    return response.status(200).json(cuisines);
  }
}
