import { Router } from 'express';

import { DeleteFiles } from '../../../../modules/files/DeleteFiles';
import { ListFiles } from '../../../../modules/files/ListFiles';
import { UploadFiles } from '../../../../modules/files/UploadFiles';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const filesRoutes = Router();

const uploadFiles = new UploadFiles();
const listFiles = new ListFiles();
const deleteFiles = new DeleteFiles();

filesRoutes.post('/upload', ensureAuthenticated, uploadFiles.execute);
filesRoutes.get('/list/:restaurant_id/:type', listFiles.execute);
filesRoutes.delete('/delete/:type', ensureAuthenticated, deleteFiles.execute);

export { filesRoutes };
