import axios, { InternalAxiosRequestConfig } from 'axios';
import { getToken } from 'src/utilities/helper';

const apiUrl = import.meta.env.VITE_API_ENDPOINT || '';

/* Common request config */
axios.defaults.headers.post['Content-Type'] = 'application/json';

/** Public request instance */
const publicRequest = axios.create({
  baseURL: apiUrl,
});

/** Private request instance */
const privateRequest = axios.create({
  baseURL: apiUrl,
});

/* Public request interceptor */
publicRequest.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

/* Private request config */
privateRequest.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getToken();
    if (token) {
      config.headers.set('Authorization', 'Bearer ' + token || '');
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { publicRequest, privateRequest };
