import { Router } from 'express';
import { ListRatingById } from '@modules/ratings/ListRatingById';
import { CreateRatings } from '@modules/ratings/CreateRating';
import { ListAllRestaurantReviews } from '@modules/ratings/ListAllRestaurantReviews';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const ratingsRoutes = Router();

const createRatings = new CreateRatings();
const listRatingById = new ListRatingById();
const listAllRestaurantReviews = new ListAllRestaurantReviews();

ratingsRoutes.get(
  '/list-by-id/:reservation_id',
  ensureAuthenticated,
  listRatingById.execute
);
ratingsRoutes.post('/create', ensureAuthenticated, createRatings.execute);

ratingsRoutes.get(
  '/list-all-restaurant-reviews/:restaurant_id',
  listAllRestaurantReviews.execute
);

export { ratingsRoutes };
