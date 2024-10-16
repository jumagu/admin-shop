import { isAxiosError } from 'axios';
import shopApi from '@/apis/shop.api';
import type { LoginResponse } from '../interfaces';

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const res = await shopApi.post<LoginResponse>('/auth/login', { email, password });

    if (res.status !== 201) {
      throw new Error('Something went wrong, please try again later.');
    }

    return res.data;
  } catch (error) {
    if (isAxiosError(error) && (error.response?.status === 401 || error.response?.status === 400)) {
      throw new Error('Invalid Credentials.');
    } else if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Internal Server Error.');
    }
  }
};
