import type { AssertionError } from 'assert';
import { getProductById, getProducts } from '@/modules/products/actions';

describe('Tests in get-product-by-id server action', () => {
  test('Should return undefined if product does not exists', async () => {
    try {
      const product = await getProductById('ABC-123');
      expect(product).toBeUndefined();
    } catch (error) {
      expect((error as Error).message).toBe('An error occurred while fetching the product.');
    }
  });

  test('Should return a valid product', async () => {
    try {
      const products = await getProducts();
      const product = await getProductById(products[0].id);
      expect(product).toEqual(products[0]);
    } catch (error) {
      expect((error as AssertionError).generatedMessage).toBeUndefined();
    }
  });
});
