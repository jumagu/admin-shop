import shopApi from '@/apis/shop.api';
import { getProductImage } from '../helpers';
import type { Product } from '../interfaces/product.interface';

export const getProducts = async (page: number = 1, limit: number = 10): Promise<Product[]> => {
  try {
    const res = await shopApi.get<Product[]>('/products', {
      params: {
        limit,
        offset: page * limit,
      },
    });

    if (res.status !== 200) throw new Error();

    return res.data.map((product) => ({
      ...product,
      images: product.images.map(getProductImage),
    }));
  } catch {
    throw new Error('An error occurred while fetching products.');
  }
};
