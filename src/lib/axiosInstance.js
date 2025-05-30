import axios from 'axios';
import Router from 'next/router';
import { useAuthStore } from '@/store/auth';

const axiosInstance = axios.create({
  baseURL:  process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      useAuthStore.getState().logout();
      Router.push('/');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
