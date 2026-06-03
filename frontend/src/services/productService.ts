import { mapToProducts } from 'src/mappers/productMapper';
import type { NewProduct, Product } from 'src/types';

const BASE_API_URL =
  'https://we1wv95vhu.execute-api.localhost.localstack.cloud:4566/prod/';

export const getProducts = async (): Promise<Product[]> => {
  const response = await fetch(`${BASE_API_URL}/products`);
  const products = await mapToProducts(response);
  return products;
};

export const deleteProduct = async (productId: string): Promise<void> => {
  await fetch(`${BASE_API_URL}/product`, {
    method: 'DELETE',
    body: JSON.stringify({ productId }),
  });
};

export const createProduct = async (
  newProduct: NewProduct,
): Promise<void> => {
  await fetch(`${BASE_API_URL}/create-product`, {
    method: 'POST',
    body: JSON.stringify(newProduct),
  });
};
