describe('Tests in main.ts', () => {
  test('Test enviroment should be configured correctly', () => {
    expect(import.meta.env.MODE).toBe('test');
    expect(import.meta.env.VITE_SHOP_API_URL).toBe('http://localhost:3000/api');
  });
});
