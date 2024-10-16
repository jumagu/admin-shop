import { isAxiosError } from 'axios';
import shopApi from '@/apis/shop.api';
import type { CheckAuthResponse } from '../interfaces';

export const checkAuth = async (): Promise<CheckAuthResponse | undefined> => {
  const token = localStorage.getItem('token');

  if (!token) return;

  try {
    const res = await shopApi.get<CheckAuthResponse>('/auth/check-status');

    if (res.status !== 200) throw new Error('Something went wrong. Please log in again.');

    return res.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      if (error.response.data.message === 'User is inactive, talk with an admin') {
        throw new Error('Your account is inactive. Please contact support.');
      } else {
        throw new Error('Your session has expired. Please log in again.');
      }
    } else if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Internal Server Error.');
    }
  }
};
