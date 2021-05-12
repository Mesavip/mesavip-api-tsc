import { Request, Response } from 'express';

import { UploadFilesUseCase } from './UploadFilesUseCase';

class UploadFilesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { type, transformation } = request.body;
    const { id } = request.user;
    const { tempFilePath } = (request as any).files.file;

    const uploadFilesUseCase = new UploadFilesUseCase();
    const files = await uploadFilesUseCase.execute({
      user_id: id,
      type,
      transformation,
      tempFilePath,
    });

    return response.status(201).json(files);
  }
}
export { UploadFilesController };
