import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URI;
const axiosInstance = axios.create({
  withCredentials: true,
  baseURL: `${baseURL}`,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.data.statusCode == 403) {
      // OTP required for login
      if (error.response.data.code == 1017) {
        return Promise.reject(error);
      }
      if (error.response.data.message == 'exception.Forbidden resource') {
        window.location.href = '/403';
      }
    }

    const originalConfig = error.config;
    if (error.response.config.url == '/auth/login') {
      return Promise.reject(error);
    }
    if (error.response.data.code == 1006) {
      if (!originalConfig._retry) {
        originalConfig._retry = true;
        try {
          await axiosInstance.post('/refresh', {}, { withCredentials: true });
          return axiosInstance(originalConfig);
        } catch (error) {
          if (error.response && error.response.data) {
            if (window.location.pathname !== '/login') {
              window.localStorage.setItem(
                'sessionmessage',
                JSON.stringify({ message: 'Your session has expired!', type: 'error' }),
              );
              window.localStorage.removeItem('isLoggedIn');
              window.localStorage.removeItem('profile');
              window.location.href = '/login';
            }
            return Promise.reject(error);
          }
        }
      }
      return {
        ...originalConfig,
        cancelToken: new axios.CancelToken((cancel) => cancel('Cancel repeated request')),
      };
    }

    if (error.response.config.url == '/auth/profile' && error.response.status === 403) {
      return Promise.reject(error);
    }
    if (error.response.config.url == '/twofa/authenticate' && error.response.status === 401) {
      return Promise.reject(error);
    }
    if (error.response.status === 403) {
      // window.location.href = '/403';
      console.log(JSON.stringify(error.response));
    }
    if (error.response.status === 401 || error.response.status === 403) {
      if (!originalConfig._retry) {
        originalConfig._retry = true;
        try {
          await axiosInstance.post('/refresh', {}, { withCredentials: true });
          return axiosInstance(originalConfig);
        } catch (error) {
          if (error.response && error.response.data) {
            if (window.location.pathname !== '/login') {
              window.localStorage.removeItem('isLoggedIn');
              window.location.href = '/login';
            }
            return Promise.reject(error.response.data);
          }
        }
      }
      return {
        ...originalConfig,
        cancelToken: new axios.CancelToken((cancel) => cancel('Cancel repeated request')),
      };
    }
    return Promise.reject(error);
  },
);
export default axiosInstance;
