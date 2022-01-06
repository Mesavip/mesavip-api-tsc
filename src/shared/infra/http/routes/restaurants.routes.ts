import { Router } from 'express';

import { ListAllRestaurants } from '../../../../modules/restaurants/ListAllRestaurants';
import { ListAvailableHours } from '../../../../modules/restaurants/ListAvailableHours';
import { ListRestaurantById } from '../../../../modules/restaurants/ListRestaurantById';

const restaurantsRoutes = Router();

const listRestaurantById = new ListRestaurantById();
const listAllRestaurants = new ListAllRestaurants();
const listAvailableHours = new ListAvailableHours();

restaurantsRoutes.get('/:name?', listAllRestaurants.execute);
restaurantsRoutes.get('/list-by-id/:restaurant_id', listRestaurantById.execute);

restaurantsRoutes.get(
  '/available-hours/:restaurant_id/:date',
  listAvailableHours.execute
);

export { restaurantsRoutes };
