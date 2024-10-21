import AxiosMockAdapter from 'axios-mock-adapter';
import shopApi from '@/apis/shop.api';

const shopApiMock = new AxiosMockAdapter(shopApi);
shopApiMock.onGet('/test').reply(200, { data: 'test' });

describe('Tests in shopApi', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('Should be configured with the correct baseURL', () => {
    expect(shopApi.defaults.baseURL).toBe(import.meta.env.VITE_SHOP_API_URL);
  });

  test('Request interceptors should be configured correctly (token exists)', async () => {
    const token = 'ABC-123';
    localStorage.setItem('token', token);

    const res = await shopApi.get('/test');

    expect(res.config.headers.Authorization).toBe(`Bearer ${token}`);
  });

  test('Request interceptors should be configured correctly (token does not exists)', async () => {
    const res = await shopApi.get('/test');
    expect(res.config.headers.Authorization).toBeUndefined();
  });
});
