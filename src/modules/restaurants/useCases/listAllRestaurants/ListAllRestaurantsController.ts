import { Request, Response } from 'express';

import { ListAllRestaurantsUseCase } from './ListAllRestaurantsUseCase';

class ListAllRestaurantsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listOneRestaurantsUseCase = new ListAllRestaurantsUseCase();
    const restaurants = await listOneRestaurantsUseCase.execute();

    return response.status(201).json(restaurants);
  }
}
export { ListAllRestaurantsController };
