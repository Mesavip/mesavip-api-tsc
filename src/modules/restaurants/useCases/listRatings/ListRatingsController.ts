import { Request, Response } from 'express';

import { ListRatingsUseCase } from './ListRatingsUseCase';

class ListRatingsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { restaurant_id } = request.params;
    const listRatingsUseCase = new ListRatingsUseCase();

    const ratings = await listRatingsUseCase.execute({ restaurant_id });

    return response.status(201).json(ratings);
  }
}
export { ListRatingsController };
