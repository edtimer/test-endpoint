/* eslint-disable no-console */
import axios from 'axios';
import { toast } from 'react-toastify';

export const BASE_URL = 'http://localhost:8000/api';
// export const BASE_URL = 'https://backend.foxmy.cc/api';

const client = axios.create({
  baseURL: `${BASE_URL}`,
});

const redirectToAfterTwoSeconds = (path) => {
  setTimeout(() => {
    if (window.location.href !== path) window.location.href = path;
  }, 2000);
};

client.interceptors.request.use(
  (config) => {
    // pre-request phase
    const userLocalStorageItem = localStorage.getItem('accessToken');
    const accessToken = userLocalStorageItem ? JSON.parse(userLocalStorageItem) : null;

    // token setting
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }

    return config;
  },
  (error) => {
    console.log('request error');
    console.log(error);
    return Promise.reject(error);
  },
);


client.interceptors.response.use(
  (response) => response,
  (error) => {
    // erorr state
    // tracking axios failing
    if (error.response?.status === 401) {
      toast.error('You are Un-Authorized to access this Data, will be redirect to home page');
      // unauthroized
      redirectToAfterTwoSeconds('/login');
    }

    if (error.response?.status === 404) {
      toast.error('Data was not found, will be redirect to home page');

      // not found
      redirectToAfterTwoSeconds('/');
    }

    return Promise.reject(error);
  },
);

const request = ({ endpoint, method, data }) => {
  const requestInfo = {
    method,
    data,
    url: `${endpoint}`,
  };

  return client(requestInfo);
};

export default request;
