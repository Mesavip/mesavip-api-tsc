import { Request, Response } from 'express';

import { DeleteFilesUseCase } from './DeleteFilesUseCase';

class DeleteFilesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const restaurant_id = request.user.id;
    const { type } = request.params;

    const deleteFilesUseCase = new DeleteFilesUseCase();
    await deleteFilesUseCase.execute({ restaurant_id, type });

    return response.status(201).send();
  }
}
export { DeleteFilesController };
