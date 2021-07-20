import axios from 'axios';

const BACKEND_URL = 'https://7.react.pages.academy/six-cities';
const TIMEOUT = 5000;

const HttpCode = {
  UNAUTHORIZED: 401,
};

export const createApi = (onUnauthorized) => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: TIMEOUT,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    const {response}= err;

    if (response.status === HttpCode.UNAUTHORIZED) {
      onUnauthorized();
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token') || '';
    config.headers['X-Token'] = token;
    return config;
  });

  return api;
};
