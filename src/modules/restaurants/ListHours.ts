import { Request, Response } from 'express';

import query from '../../shared/infra/knex/knex';

class ListHours {
  async execute(request: Request, response: Response): Promise<Response> {
    const { restaurant_id } = request.params;

    const hours = await query
      .select(['hour_id', 'hour'])
      .from('hours')
      .where({ restaurant_id });

    if (!hours) {
      return response.status(201).json({ error: 'No hours registered' });
    }

    return response.status(201).json(hours);
  }
}
export { ListHours };
