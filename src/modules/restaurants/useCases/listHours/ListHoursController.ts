import { Request, Response } from 'express';

import { ListHoursUseCase } from './ListHoursUseCase';

class ListHoursController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { restaurant_id } = request.params;

    const listHoursUseCase = new ListHoursUseCase();
    const hours = await listHoursUseCase.execute({ restaurant_id });

    return response.status(201).json(hours);
  }
}
export { ListHoursController };
