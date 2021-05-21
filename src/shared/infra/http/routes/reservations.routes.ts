import { Router } from 'express';

import { CreateReservationsUseCase } from '../../../../modules/restaurants/useCases/reservations/CreateReservationsUseCase';
import { DeleteReservationUseCase } from '../../../../modules/restaurants/useCases/reservations/DeleteReservationUseCase';
import { ListReservationsUseCase } from '../../../../modules/restaurants/useCases/reservations/ListReservationsUseCase';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const resevationsRoutes = Router();

const deleteReservationUseCase = new DeleteReservationUseCase();
const listReservationsUseCase = new ListReservationsUseCase();
const createReservationsUseCase = new CreateReservationsUseCase();

resevationsRoutes.delete(
  '/delete/:reservation_id',
  ensureAuthenticated,
  deleteReservationUseCase.execute
);
resevationsRoutes.get(
  '/list',
  ensureAuthenticated,
  listReservationsUseCase.execute
);
resevationsRoutes.post(
  '/create/:restaurant_id/:hour_id/:date',
  ensureAuthenticated,
  createReservationsUseCase.execute
);

export { resevationsRoutes };
