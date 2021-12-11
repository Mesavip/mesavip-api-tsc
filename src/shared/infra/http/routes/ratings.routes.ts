import { Router } from 'express';
import { CreateRatings } from '../../../../modules/ratings/CreateRating';
import { ListRatings } from '../../../../modules/ratings/ListRatings';

const ratingsRoutes = Router();

const listRatings = new ListRatings();
const createRatings = new CreateRatings();

ratingsRoutes.get('/list/:restaurant_id', listRatings.execute);
ratingsRoutes.post('/create', createRatings.execute);

export { ratingsRoutes };
