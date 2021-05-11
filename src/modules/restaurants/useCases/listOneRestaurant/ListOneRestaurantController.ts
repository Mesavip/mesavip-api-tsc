import { Request, Response } from 'express';

import { ListOneRestaurantUseCase } from './ListOneRestaurantUseCase';

class ListOneRestaurantController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { restaurant_id } = request.params;

    const listOneRestaurantUseCase = new ListOneRestaurantUseCase();
    const restaurant = await listOneRestaurantUseCase.execute({
      restaurant_id,
    });

    return response.status(201).json(restaurant);
  }
}
export { ListOneRestaurantController };
