import { Router } from 'express';

import { ListAllRestaurants } from '../../../../modules/restaurants/ListAllRestaurants';
import { ListAvailableHours } from '../../../../modules/restaurants/ListAvailableHours';
import { ListOneRestaurant } from '../../../../modules/restaurants/ListOneRestaurant';

const restaurantsRoutes = Router();

const listOneRestaurant = new ListOneRestaurant();
const listAllRestaurants = new ListAllRestaurants();
const listAvailableHours = new ListAvailableHours();

restaurantsRoutes.get('/:name?', listAllRestaurants.execute);
restaurantsRoutes.get('/list-by-id/:restaurant_id', listOneRestaurant.execute);

restaurantsRoutes.get(
  '/available-hours/:restaurant_id/:date',
  listAvailableHours.execute
);

export { restaurantsRoutes };
