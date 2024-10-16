import axios from 'axios';

const shopApi = axios.create({
  baseURL: import.meta.env.VITE_SHOP_API_URL,
});

shopApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default shopApi;
