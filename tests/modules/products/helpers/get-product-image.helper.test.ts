import { getProductImage } from '@/modules/products/helpers';

describe('Tests in get-product-image helper', () => {
  test('Should return a string with a correct image URL format', () => {
    const imgName = 'test.jpg';
    const expectedUrl = `${import.meta.env.VITE_SHOP_API_URL}/files/product/${imgName}`;
    const imgUrl = 'https://image-placeholder.com/images/test.png';

    const resultUrl1 = getProductImage(imgName);
    const resultUrl2 = getProductImage(imgUrl);

    expect(resultUrl1).toBe(expectedUrl);
    expect(resultUrl2).toBe(imgUrl);
  });
});
