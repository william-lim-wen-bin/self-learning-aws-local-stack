export interface Product {
  productId: string;
  productName: string;
  productPrice: number;
  productDescription?: string;
}

export interface NewProduct {
  productName: string;
  productPrice: number;
  productDescription?: string;
}
