import { Router } from 'express';

import { DeleteFilesController } from '../../../../modules/restaurants/useCases/deleteFiles/DeleteFilesController';
import { ListFilesController } from '../../../../modules/restaurants/useCases/listFiles/ListFilesController';
import { UploadFilesController } from '../../../../modules/restaurants/useCases/uploadFiles/UploadFilesController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const filesRoutes = Router();

const uploadFilesController = new UploadFilesController();
const listFilesController = new ListFilesController();
const deleteFilesController = new DeleteFilesController();

filesRoutes.post('/upload', ensureAuthenticated, uploadFilesController.handle);
filesRoutes.get(
  '/list/:restaurant_id/:type',
  ensureAuthenticated,
  listFilesController.handle
);
filesRoutes.delete(
  '/delete/:type',
  ensureAuthenticated,
  deleteFilesController.handle
);

export { filesRoutes };
