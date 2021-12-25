import { Router } from 'express';

import { CancelReservation } from '../../../../modules/reservations/CancelReservation';
import { CreateReservations } from '../../../../modules/reservations/CreateReservations';
import { ListReservations } from '../../../../modules/reservations/ListReservations';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const resevationsRoutes = Router();

const cancelReservation = new CancelReservation();
const listReservations = new ListReservations();
const createReservations = new CreateReservations();

resevationsRoutes.delete(
  '/cancel/:reservation_id',
  ensureAuthenticated,
  cancelReservation.execute
);
resevationsRoutes.get(
  '/list-past',
  ensureAuthenticated,
  listReservations.listPastReservations
);
resevationsRoutes.get(
  '/list-following',
  ensureAuthenticated,
  listReservations.listFollowingReservations
);
resevationsRoutes.post(
  '/create',
  ensureAuthenticated,
  createReservations.execute
);

export { resevationsRoutes };
