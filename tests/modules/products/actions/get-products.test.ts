import { getProducts } from '@/modules/products/actions';

describe('Tests in get-product server action', async () => {
  const products = await getProducts();

  test('Should return a list of products on success status', () => {
    expect(products).toHaveLength(10);
    expect(products[0]).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        title: expect.any(String),
        price: expect.any(Number),
        description: expect.any(String),
        slug: expect.any(String),
        stock: expect.any(Number),
        sizes: expect.any(Array),
        gender: expect.any(String),
        tags: expect.any(Array),
        images: expect.any(Array),
        user: expect.any(Object),
      }),
    );
  });

  test('Returned products should have a correctly formatted image', () => {
    products.forEach((product) =>
      product.images.forEach((img) => {
        expect(img).toContain(`${import.meta.env.VITE_SHOP_API_URL}/files/product`);
      }),
    );
  });
});
