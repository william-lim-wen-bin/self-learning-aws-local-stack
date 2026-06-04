import { Stack, Tiles } from 'braid-design-system';
import { useEffect, useState } from 'react';

import { CreateProductCard } from 'src/components/atoms';
import { PageLayout } from 'src/components/templates';
import {
  createProduct,
  deleteProduct,
  getProducts,
} from 'src/services/productService';
import type { NewProduct, Product } from 'src/types';

import { CreateProductDrawer, ProductCard } from '../molecules';

export const OverviewPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [createProductDrawerOpen, setCreateProductDrawerOpen] =
    useState<boolean>(false);

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

  const handleCreateProduct = async (newProduct: NewProduct) => {
    const createdProduct = await createProduct(newProduct);
    const newProducts = [createdProduct, ...products];
    setProducts(newProducts);
  };

  return (
    <PageLayout pageTitle="Overview Page">
      <CreateProductDrawer
        open={createProductDrawerOpen}
        onClose={() => setCreateProductDrawerOpen(false)}
        onCreate={handleCreateProduct}
      />

      <Stack space="gutter">
        <CreateProductCard onClick={() => setCreateProductDrawerOpen(true)} />

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
      </Stack>
    </PageLayout>
  );
};
