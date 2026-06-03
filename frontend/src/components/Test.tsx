import { Tiles } from 'braid-design-system';
import { useEffect, useState } from 'react';
import { deleteProduct, getProducts } from 'src/services/productService';
import type { Product } from 'src/types';
import ProductCard from './atoms/ProductCard/ProductCard';

export const Test = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId: string) => {
    await deleteProduct(productId);
    const newProducts = products.filter(
      (product) => product.productId !== productId,
    );
    setProducts(newProducts);
  };

  return (
    <Tiles
      space="gutter"
      columns={{ mobile: 1, tablet: 2, desktop: 3, wide: 4 }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.productId}
          product={product}
          onDelete={handleDeleteProduct}
        />
      ))}
    </Tiles>
  );
};
