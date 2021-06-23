import { Router } from 'express';

import { ListRatings } from '../../../../modules/ratings/ListRatings';

const ratingsRoutes = Router();

const listRatings = new ListRatings();

ratingsRoutes.get('/list/:restaurant_id', listRatings.execute);

export { ratingsRoutes };
