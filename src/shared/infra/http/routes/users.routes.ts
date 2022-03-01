import { Router } from 'express';

import { AuthenticateUser } from '../../../../modules/users/AuthenticateUser';
import { CreateUser } from '../../../../modules/users/CreateUser';
import { TokenValidation } from '../../../../modules/users/TokenValidation';

const usersRoutes = Router();

const createUser = new CreateUser();
const authenticateUser = new AuthenticateUser();
const tokenValidation = new TokenValidation();

usersRoutes.post('/create', createUser.execute);
usersRoutes.post('/signin', authenticateUser.execute);
usersRoutes.get('/me', tokenValidation.execute);

export { usersRoutes };
