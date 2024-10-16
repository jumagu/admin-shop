import type { User } from './user.interface';

export interface LoginResponse {
  user: User;
  token: string;
}

export interface RegisterResponse {
  user: User;
  token: string;
}

export interface CheckAuthResponse {
  user: User;
  token: string;
}
