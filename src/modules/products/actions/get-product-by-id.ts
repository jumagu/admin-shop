import shopApi from '@/apis/shop.api';
import { getProductImage } from '../helpers';
import type { Product } from '../interfaces/product.interface';

export const getProductById = async (productId: string): Promise<Product> => {
  try {
    const res = await shopApi.get<Product>(`/products/${productId}`);

    if (res.status !== 200) throw new Error();

    return {
      ...res.data,
      images: res.data.images.map(getProductImage),
    };
  } catch {
    throw new Error('An error occurred while fetching the product.');
  }
};
