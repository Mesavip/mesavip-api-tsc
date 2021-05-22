import { Router } from 'express';

import { DeleteFilesUseCase } from '../../../../modules/restaurants/useCases/files/DeleteFilesUseCase';
import { ListFilesUseCase } from '../../../../modules/restaurants/useCases/files/ListFilesUseCase';
import { UploadFilesUseCase } from '../../../../modules/restaurants/useCases/files/UploadFilesUseCase';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const filesRoutes = Router();

const uploadFilesUseCase = new UploadFilesUseCase();
const listFilesUseCase = new ListFilesUseCase();
const deleteFilesUseCase = new DeleteFilesUseCase();

filesRoutes.post('/upload', ensureAuthenticated, uploadFilesUseCase.execute);
filesRoutes.get('/list/:restaurant_id/:type', listFilesUseCase.execute);
filesRoutes.delete(
  '/delete/:type',
  ensureAuthenticated,
  deleteFilesUseCase.execute
);

export { filesRoutes };
