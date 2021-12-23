import axios, { AxiosResponse } from 'axios';

const loginUrl = '/login';

const login = (username: FormDataEntryValue | null, password: FormDataEntryValue | null, rememberMe?: boolean) => {
  return axios.post(loginUrl, {
    email: username,
    password
  }).then((res: AxiosResponse) => {
    if (res.data.accessToken) {
      if (rememberMe) {
        localStorage.setItem('user', JSON.stringify(res.data));
      } else {
        sessionStorage.setItem('user', JSON.stringify(res.data));
      }
    }
    return res.data;
  })
};

const logout = () => {
  if (localStorage.getItem('user')) {
    localStorage.removeItem('user');
  }
  if (sessionStorage.getItem('user')) {
    sessionStorage.removeItem('user');
  }
}

const getCurrentUser = () => {
  const userStr = localStorage.getItem('user') || sessionStorage.getItem('user');
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
}

const AuthService = {
  login,
  logout,
  getCurrentUser
};

export default AuthService;