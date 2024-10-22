import fs from 'fs';
import path from 'path';

import shopApi from '@/apis/shop.api';
import { login } from '@/modules/auth/actions';
import { createUpdateProduct, getProducts } from '@/modules/products/actions';
import { type Product, Gender } from '@/modules/products/interfaces/product.interface';

describe('Tests in create-update-product server action', () => {
  beforeAll(async () => {
    try {
      const loginData = await login('test1@google.com', 'Abc123');
      localStorage.setItem('token', loginData.token);
    } catch (error) {
      throw error;
    }
  });

  test('Should create a new product', async () => {
    const product: Partial<Product> = {
      id: undefined,
      title: 'Test Product',
      price: 120,
      description: 'Sunt ex aute in officia pariatur magna officia laboris sunt anim magna.',
      slug: 'test_product',
      stock: 1000,
      sizes: [],
      gender: Gender.Women,
      tags: [],
      images: [],
      user: undefined,
    };

    const res = await createUpdateProduct(product);

    expect(res.msg).toEqual('created');
    expect(res.product).toEqual({
      id: expect.any(String),
      title: 'Test Product',
      price: 120,
      description: 'Sunt ex aute in officia pariatur magna officia laboris sunt anim magna.',
      slug: 'test_product',
      stock: 1000,
      sizes: [],
      gender: Gender.Women,
      tags: [],
      images: [],
      user: expect.any(Object),
    });

    await shopApi.delete(`products/${res.product.id}`);
  });

  test('Should update an existing product', async () => {
    const products = await getProducts();
    const product = products[0];

    const productToUpdate = {
      ...product,
      title: 'Update Test',
      description: 'Deserunt incididunt mollit labore do id est nulla consectetur sit.',
    };

    const res = await createUpdateProduct(productToUpdate);

    expect(res.msg).toEqual('updated');
    expect(res.product).toEqual({ ...productToUpdate });
  });

  test('Should upload the product image', async () => {
    const imgPath = path.join(__dirname, '../../../data', 't-shirt.data.jpg');
    const imgBuffer = fs.readFileSync(imgPath);
    const imgFile = new File([imgBuffer], 't-shirt.data.jpg', { type: 'image/jpg' });

    const product: Partial<Product> = {
      id: undefined,
      title: 'Test Product',
      price: 120,
      description: 'Sunt ex aute in officia pariatur magna officia laboris sunt anim magna.',
      slug: 'test_product',
      stock: 1000,
      sizes: [],
      gender: Gender.Women,
      tags: [],
      images: [imgFile] as never,
      user: undefined,
    };

    const res = await createUpdateProduct(product);

    expect(res.product.images[0]).toBeTypeOf('string');
    expect(res.product.images[0]).toContain(`${import.meta.env.VITE_SHOP_API_URL}/files/product/`);

    await shopApi.delete(`products/${res.product.id}`);
  });
});
