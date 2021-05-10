import { Router } from 'express';

import { ListRatingsController } from '../../../../modules/restaurants/useCases/listRatings/ListRatingsController';
import { UploadFilesController } from '../../../../modules/restaurants/useCases/uploadFiles/UploadFilesController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const restaurantsRoutes = Router();

const uploadFilesController = new UploadFilesController();
const listRatingsController = new ListRatingsController();

restaurantsRoutes.post(
  '/files/upload',
  ensureAuthenticated,
  uploadFilesController.handle
);

restaurantsRoutes.get(
  '/ratings/:restaurant_id',
  ensureAuthenticated,
  listRatingsController.handle
);

export { restaurantsRoutes };
