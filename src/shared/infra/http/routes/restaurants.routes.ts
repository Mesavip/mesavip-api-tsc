import { Router } from 'express';

import { ListAllRestaurantsUseCase } from '../../../../modules/restaurants/useCases/ListAllRestaurantsUseCase';
import { ListAvailableTablesController } from '../../../../modules/restaurants/useCases/listAvailableTables/ListAvailableTablesController';
import { ListHoursController } from '../../../../modules/restaurants/useCases/listHours/ListHoursController';
import { ListOneRestaurantController } from '../../../../modules/restaurants/useCases/listOneRestaurant/ListOneRestaurantController';
import { ListRatingsController } from '../../../../modules/restaurants/useCases/listRatings/ListRatingsController';
// import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const restaurantsRoutes = Router();

const listOneRestaurantController = new ListOneRestaurantController();
const listAllRestaurantsUseCase = new ListAllRestaurantsUseCase();
const listAvailableTablesController = new ListAvailableTablesController();
const listRatingsController = new ListRatingsController();
const listHoursController = new ListHoursController();

restaurantsRoutes.get('/', listAllRestaurantsUseCase.execute);
restaurantsRoutes.get('/:restaurant_id', listOneRestaurantController.handle);
restaurantsRoutes.get('/ratings/:restaurant_id', listRatingsController.handle);
restaurantsRoutes.get('/hours/:restaurant_id', listHoursController.handle);

restaurantsRoutes.get(
  '/tables/available/:restaurant_id',
  listAvailableTablesController.handle
);

export { restaurantsRoutes };
