import { Router } from 'express';

import { ListAllRestaurants } from '../../../../modules/restaurants/ListAllRestaurants';
import { ListAvailableHours } from '../../../../modules/restaurants/ListAvailableHours';
import { ListOneRestaurant } from '../../../../modules/restaurants/ListOneRestaurant';
// import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const restaurantsRoutes = Router();

const listOneRestaurant = new ListOneRestaurant();
const listAllRestaurants = new ListAllRestaurants();
const listAvailableHours = new ListAvailableHours();

restaurantsRoutes.get('/', listAllRestaurants.execute);
restaurantsRoutes.get('/:restaurant_id', listOneRestaurant.execute);

restaurantsRoutes.get(
  '/available-hours/:restaurant_id/:date',
  listAvailableHours.execute
);

export { restaurantsRoutes };
