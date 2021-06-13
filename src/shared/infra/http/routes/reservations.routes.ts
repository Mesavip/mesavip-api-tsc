import { Router } from 'express';

import { CreateReservations } from '../../../../modules/reservations/CreateReservations';
import { DeleteReservation } from '../../../../modules/reservations/DeleteReservation';
import { ListReservations } from '../../../../modules/reservations/ListReservations';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const resevationsRoutes = Router();

const deleteReservation = new DeleteReservation();
const listReservations = new ListReservations();
const createReservations = new CreateReservations();

resevationsRoutes.delete(
  '/delete/:reservation_id',
  ensureAuthenticated,
  deleteReservation.execute
);
resevationsRoutes.get('/list', ensureAuthenticated, listReservations.execute);
resevationsRoutes.post(
  '/create/:restaurant_id/:hour_id/:date',
  ensureAuthenticated,
  createReservations.execute
);

export { resevationsRoutes };
