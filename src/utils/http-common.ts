import axios, { AxiosRequestHeaders } from 'axios';

const { REACT_APP_SERVER_URL } = process.env;
const authHeader = () => {
  const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
  const header: AxiosRequestHeaders = { 'Content-type': 'application/json' };
  if (userStr) {
    const user = JSON.parse(userStr);
    if (user && user.accessToken) {
      header['Authorization'] = 'Bearer ' + user.accessToken;
    }
  }
  return header;
}

export default axios.create({
  baseURL: REACT_APP_SERVER_URL,
  headers: authHeader()
});