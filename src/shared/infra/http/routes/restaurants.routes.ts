import { Router } from 'express';

import { CreateReservationsController } from '../../../../modules/restaurants/useCases/createReservations/CreateReservationsController';
import { DeleteReservationController } from '../../../../modules/restaurants/useCases/deleteReservation/DeleteReservationController';
import { ListAllRestaurantsController } from '../../../../modules/restaurants/useCases/listAllRestaurants/ListAllRestaurantsController';
import { ListAvailableTablesController } from '../../../../modules/restaurants/useCases/listAvailableTables/ListAvailableTablesController';
import { ListHoursController } from '../../../../modules/restaurants/useCases/listHours/ListHoursController';
import { ListOneRestaurantController } from '../../../../modules/restaurants/useCases/listOneRestaurant/ListOneRestaurantController';
import { ListRatingsController } from '../../../../modules/restaurants/useCases/listRatings/ListRatingsController';
import { ListReservationsController } from '../../../../modules/restaurants/useCases/listReservations/ListReservationsController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const restaurantsRoutes = Router();

const listOneRestaurantController = new ListOneRestaurantController();
const deleteReservationController = new DeleteReservationController();
const listReservationsController = new ListReservationsController();
const listAllRestaurantsController = new ListAllRestaurantsController();
const listAvailableTablesController = new ListAvailableTablesController();
const createReservationsController = new CreateReservationsController();
const listRatingsController = new ListRatingsController();
const listHoursController = new ListHoursController();

restaurantsRoutes.get('/', listAllRestaurantsController.handle);
restaurantsRoutes.get('/:restaurant_id', listOneRestaurantController.handle);
restaurantsRoutes.get('/ratings/:restaurant_id', listRatingsController.handle);
restaurantsRoutes.get('/hours/:restaurant_id', listHoursController.handle);

restaurantsRoutes.delete(
  '/reservations/delete/:reservation_id',
  ensureAuthenticated,
  deleteReservationController.handle
);
restaurantsRoutes.get(
  '/reservations/list/:client_id',
  ensureAuthenticated,
  listReservationsController.handle
);
restaurantsRoutes.post(
  '/reservations/create/:restaurant_id/:hour_id',
  ensureAuthenticated,
  createReservationsController.handle
);
restaurantsRoutes.get(
  '/tables/available/:restaurant_id',
  listAvailableTablesController.handle
);

export { restaurantsRoutes };
