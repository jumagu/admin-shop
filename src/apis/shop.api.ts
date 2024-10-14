import axios from 'axios';

const shopApi = axios.create({
  baseURL: import.meta.env.VITE_SHOP_API_URL,
});

export default shopApi;
