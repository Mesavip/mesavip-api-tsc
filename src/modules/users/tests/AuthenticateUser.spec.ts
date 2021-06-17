import { api } from '../../../config/axios';

describe('Authenticate User', () => {
  it('should be able to authenticate an user', async () => {
    const user = {
      email: 'client@gmail.com',
      password: '123456',
    };

    const response = await api
      .post('users/signin', user)
      .then((response) => response.data);

    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('user');
  });

  it('should not be able to authenticate an nonexistent user', async () => {
    const user = {
      email: 'false@gmail.com',
      password: '123456',
    };

    const response = await api
      .post('users/signin', user)
      .then((response) => response);

    expect(response).toBe('401');
  });

  it('should not be able to authenticate with incorrect password', async () => {
    const user = {
      email: 'client@gmail.com',
      password: 'incorrect password',
    };

    const response = await api
      .post('users/signin', user)
      .then((response) => response);

    expect(response).toBe('401');
  });
});
