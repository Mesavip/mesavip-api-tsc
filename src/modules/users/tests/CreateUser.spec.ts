import { api } from '../../../config/axios';
import query from '../../../shared/infra/knex/knex';

describe('Create User', () => {
  beforeAll(() => query('users').delete());

  it('should be able to create an user', async () => {
    const user = {
      name: 'client',
      email: 'client@gmail.com',
      cpf: '123.456.789-00',
      password: '123456',
    };

    const response = await api
      .post('users/create', user)
      .then((response) => response.status.toString());

    expect(response).toBe('201');
  });

  it('should not be able to create an user [cpf already registered]', async () => {
    const user = {
      name: 'client',
      email: 'client2@gmail.com',
      cpf: '123.456.789-00',
      password: '123456',
    };

    const response = await api
      .post('users/create', user)
      .then((response) => response);

    expect(response).toBe('401');
  });

  it('should not be able to create an user [email already registered]', async () => {
    const user = {
      name: 'client',
      email: 'client@gmail.com',
      cpf: '123.456.789-11',
      password: '123456',
    };

    const response = await api
      .post('users/create', user)
      .then((response) => response);

    expect(response).toBe('401');
  });
});
