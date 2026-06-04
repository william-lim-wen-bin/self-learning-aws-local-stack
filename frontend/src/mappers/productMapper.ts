import type { Product } from 'src/types';

import mapToBaseResponse from './baseMapper';

interface ProductsPayload {
  products: Product[];
}

export const mapToProducts = async (response: Response): Promise<Product[]> => {
  const responseData = await mapToBaseResponse<ProductsPayload>(response);

  if (responseData.__typename === 'ErrorResponse') {
    return [];
  }

  return responseData.data.products;
};

interface CreateProductPayload {
  productId: string;
}

export const mapToCreateProduct = async (
  response: Response,
): Promise<CreateProductPayload> => {
  const responseData = await mapToBaseResponse<CreateProductPayload>(response);

  if (responseData.__typename === 'ErrorResponse') {
    return { productId: '' };
  }

  return responseData.data;
};
