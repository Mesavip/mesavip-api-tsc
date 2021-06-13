import { Router } from 'express';

import { AuthenticateUser } from '../../../../modules/users/AuthenticateUser';
import { CreateUser } from '../../../../modules/users/CreateUser';

const usersRoutes = Router();

const createUser = new CreateUser();
const authenticateUser = new AuthenticateUser();

usersRoutes.post('/create', createUser.execute);
usersRoutes.post('/login', authenticateUser.execute);

export { usersRoutes };
