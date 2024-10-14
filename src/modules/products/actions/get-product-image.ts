export const getProductImage = (imageName: string): string => {
  return imageName.includes('http')
    ? imageName
    : `${import.meta.env.VITE_SHOP_API_URL}/files/product/${imageName}`;
};
