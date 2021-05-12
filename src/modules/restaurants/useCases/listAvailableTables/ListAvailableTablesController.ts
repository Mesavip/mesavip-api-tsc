import { Request, Response } from 'express';

import { ListAvailableTablesUseCase } from './ListAvailableTablesUseCase';

class ListAvailableTablesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { restaurant_id } = request.params;

    const listAvailableTablesUseCase = new ListAvailableTablesUseCase();
    const availableTables = await listAvailableTablesUseCase.execute({
      restaurant_id,
    });

    return response.status(201).json(availableTables);
  }
}
export { ListAvailableTablesController };
