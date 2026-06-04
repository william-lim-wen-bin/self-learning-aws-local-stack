import { BASE_API_URL } from 'src/constants';
import { mapToCreateProduct, mapToProducts } from 'src/mappers/productMapper';
import type { NewProduct, Product } from 'src/types';

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
): Promise<Product> => {
  const response = await fetch(`${BASE_API_URL}/create-product`, {
    method: 'POST',
    body: JSON.stringify(newProduct),
  });
  const { productId } = await mapToCreateProduct(response);
  return { productId, ...newProduct };
};
