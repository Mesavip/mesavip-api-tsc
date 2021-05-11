import { Request, Response } from 'express';

import { ListFilesUseCase } from './ListFilesUseCase';

class ListFilesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { restaurant_id, type } = request.params;

    console.log({ restaurant_id, type });

    const listFilesUseCase = new ListFilesUseCase();
    const files = await listFilesUseCase.execute({ restaurant_id, type });

    return response.status(201).json(files);
  }
}
export { ListFilesController };
