import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:3333' });

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      return error.response.status.toString();
    }
    return Promise.reject(error);
  }
);

export { api };
