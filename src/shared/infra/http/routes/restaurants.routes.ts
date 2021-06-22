import { Router } from 'express';

import { ListAllRestaurants } from '../../../../modules/restaurants/ListAllRestaurants';
import { ListAvailableHours } from '../../../../modules/restaurants/ListAvailableHours';
import { ListHours } from '../../../../modules/restaurants/ListHours';
import { ListOneRestaurant } from '../../../../modules/restaurants/ListOneRestaurant';
import { ListRatings } from '../../../../modules/restaurants/ListRatings';
// import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const restaurantsRoutes = Router();

const listOneRestaurant = new ListOneRestaurant();
const listAllRestaurants = new ListAllRestaurants();
const listAvailableHours = new ListAvailableHours();
const listRatings = new ListRatings();
const listHours = new ListHours();

restaurantsRoutes.get('/', listAllRestaurants.execute);
restaurantsRoutes.get('/:restaurant_id', listOneRestaurant.execute);
restaurantsRoutes.get('/ratings/:restaurant_id', listRatings.execute);
restaurantsRoutes.get('/hours/:restaurant_id', listHours.execute);

restaurantsRoutes.get(
  '/available-hours/:restaurant_id/:date',
  listAvailableHours.execute
);

export { restaurantsRoutes };
