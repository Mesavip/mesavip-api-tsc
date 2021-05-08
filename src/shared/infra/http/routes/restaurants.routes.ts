import { Router } from 'express';

import { UploadFilesController } from '../../../../modules/restaurants/useCases/uploadFiles/UploadFilesController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const restaurantsRoutes = Router();

const uploadFilesController = new UploadFilesController();

restaurantsRoutes.post(
  '/files/upload',
  ensureAuthenticated,
  uploadFilesController.handle
);

export { restaurantsRoutes };
