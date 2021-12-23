import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
const { REACT_APP_SERVER_URL } = process.env;

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = REACT_APP_SERVER_URL;

const setupAxiosInterceptors = (onUnauthenticated: Function) => {
  const onRequestSuccess = (config: AxiosRequestConfig) => {
    const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      config.headers!.Authorization = `Bearer ${user.accessToken}`;
    }
    return config;
  };
  const onResponseSuccess = (response: AxiosResponse) => response;
  const onResponseError = (err: AxiosError) => {
    const status = err.response ? err.response.status : 0;
    if (status === 403 || status === 401) {
      onUnauthenticated();
    }
    return Promise.reject(err);
  };
  axios.interceptors.request.use(onRequestSuccess);
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxiosInterceptors;
