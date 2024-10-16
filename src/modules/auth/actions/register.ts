import { isAxiosError } from 'axios';
import shopApi from '@/apis/shop.api';
import type { RegisterResponse } from '../interfaces';

export const register = async (
  fullName: string,
  email: string,
  password: string,
): Promise<RegisterResponse> => {
  try {
    const res = await shopApi.post<RegisterResponse>('/auth/register', {
      fullName,
      email,
      password,
    });

    if (res.status !== 201) {
      throw new Error('Something went wrong, please try again later.');
    }

    return res.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 400) {
      if (error.response.data.message === `Key (email)=(${email}) already exists.`) {
        throw new Error(`Email ${email} already exists.`);
      } else {
        throw new Error('One or more fields have errors.');
      }
    } else if (error instanceof Error) {
      throw error;
    } else {
      throw new Error('Internal Server Error.');
    }
  }
};
