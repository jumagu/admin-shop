import type { User } from '@/modules/auth/interfaces';

export interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  slug: string;
  stock: number;
  sizes: Size[];
  gender: Gender;
  tags: string[];
  images: string[];
  user: User;
}

export enum Size {
  Xs = 'XS',
  S = 'S',
  M = 'M',
  L = 'L',
  Xl = 'XL',
  Xxl = 'XXL',
}

export enum Gender {
  Kid = 'kid',
  Men = 'men',
  Women = 'women',
}
