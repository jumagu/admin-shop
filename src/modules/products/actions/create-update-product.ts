import shopApi from '@/apis/shop.api';
import { getProductImage } from '../helpers';
import type { Product } from '../interfaces/product.interface';
import { isAxiosError } from 'axios';

interface CreateUpdateResponse {
  msg: 'updated' | 'created';
  product: Product;
}

type ProductSubmit = Partial<Omit<Product, 'images'> & { images: (string | File)[] }>;

export const createUpdateProduct = async (
  product: ProductSubmit,
): Promise<CreateUpdateResponse> => {
  const uploadedImages = await uploadImages(product.images ?? []);

  const cleanedProduct = cleanProduct({ ...product, images: uploadedImages });

  try {
    if (product.id && product.id.length) {
      const updatedProduct = await updateProduct(product.id, cleanedProduct);

      return {
        msg: 'updated',
        product: updatedProduct,
      };
    } else {
      const createdProduct = await createProduct(cleanedProduct);

      return {
        msg: 'created',
        product: createdProduct,
      };
    }
  } catch (error) {
    throw error;
  }
};

const updateProduct = async (productId: string, product: Partial<Product>): Promise<Product> => {
  try {
    const res = await shopApi.patch<Product>(`/products/${productId}`, product);

    if (res.status !== 200) throw new Error('Oops! could not update the product. Try again later.');

    return {
      ...res.data,
      images: res.data.images.map(getProductImage),
    };
  } catch (error) {
    return handleProductCreationUpdateError(error, product, 'updating');
  }
};

const createProduct = async (product: Partial<Product>): Promise<Product> => {
  try {
    const res = await shopApi.post<Product>(`/products`, product);

    if (res.status !== 201) throw new Error('Oops! could not create the product. Try again later.');

    return {
      ...res.data,
      images: res.data.images.map(getProductImage),
    };
  } catch (error) {
    return handleProductCreationUpdateError(error, product, 'creating');
  }
};

const cleanProduct = (product: Partial<Product>): Partial<Product> => {
  const images: string[] =
    product.images?.map((img) => (img.startsWith('http') ? (img.split('/').pop() ?? '') : img)) ??
    [];

  product.images = images;

  delete product.id;
  delete product.user;

  return product;
};

const uploadImages = async (images: (string | File)[]): Promise<string[]> => {
  const imgsToUpload = images.filter((img) => img instanceof File);
  const currentImages = images.filter((img) => typeof img === 'string');

  const uploadromises = imgsToUpload.map(async (imgFile) => {
    try {
      const formData = new FormData();
      formData.append('file', imgFile);

      const res = await shopApi.post<{ secureUrl: string }>('/files/product', formData);

      return res.data.secureUrl;
    } catch (error) {
      console.log(error);
      throw error;
    }
  });

  return [...currentImages, ...(await Promise.all(uploadromises))];
};

const handleProductCreationUpdateError = (
  error: unknown,
  product: Partial<Product>,
  operation: 'creating' | 'updating' = 'creating',
): never => {
  if (isAxiosError(error) && error.status === 400) {
    const errorMessage = error.response?.data.message;
    if (errorMessage === `Key (title)=(${product.title}) already exists.`) {
      throw new Error(`A product with the title "${product.title}" already exists.`);
    } else if (errorMessage === `Key (slug)=(${product.slug}) already exists.`) {
      throw new Error(`A product with the slug "${product.slug}" already exists.`);
    } else {
      throw new Error('One or more fields have errors or incorrect format.');
    }
  } else if (error instanceof Error) {
    throw error;
  } else {
    throw new Error(`An error occurred while ${operation} the product.`);
  }
};
