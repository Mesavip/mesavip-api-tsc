import { Router } from 'express';
import { ListRatingById } from '@modules/ratings/ListRatingById';
import { CreateRatings } from '../../../../modules/ratings/CreateRating';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const ratingsRoutes = Router();

const createRatings = new CreateRatings();
const listRatingById = new ListRatingById();

ratingsRoutes.get(
  '/list-by-id/:reservation_id',
  ensureAuthenticated,
  listRatingById.execute
);
ratingsRoutes.post('/create', ensureAuthenticated, createRatings.execute);

export { ratingsRoutes };
