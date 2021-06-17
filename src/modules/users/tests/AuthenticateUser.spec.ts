import { api } from '../../../config/axios';

describe('Authenticate User', () => {
  it('should be able to authenticate the user [Check if it has Token and User properties]', async () => {
    const userToBeAuthenticated = {
      email: 'client@gmail.com',
      password: '123456',
    };

    const response = await api
      .post('users/signin', userToBeAuthenticated)
      .then((response) => response.data);

    expect(response).toHaveProperty('token');
    expect(response).toHaveProperty('user');
  });
});
