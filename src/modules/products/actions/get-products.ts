import shopApi from '@/apis/shop.api';
import type { Product } from '../interfaces/product.interface';
import { getProductImage } from './get-product-image';

export const getProducts = async (page: number = 1, limit: number = 10) => {
  try {
    const { data } = await shopApi.get<Product[]>('/products', {
      params: {
        limit,
        offset: page * limit,
      },
    });

    return data.map((product) => ({
      ...product,
      images: product.images.map(getProductImage),
    }));
  } catch (error) {
    console.log(error);
    throw new Error('');
  }
};
