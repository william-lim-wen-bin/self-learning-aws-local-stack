import { Button, Drawer, IconAdd, Stack, TextField } from 'braid-design-system';
import { useState } from 'react';
import type { NewProduct } from 'src/types';

interface CreateProductDrawerProps {
  open?: boolean;
  onClose?: () => void;
  onCreate?: (newProduct: NewProduct) => void;
}

export const CreateProductDrawer = ({
  open = false,
  onClose = () => {},
  onCreate,
}: CreateProductDrawerProps) => {
  const [productName, setProductName] = useState<string>('');
  const [productNameError, setProductNameError] = useState<string>('');

  const [productPrice, setProductPrice] = useState<string>('');
  const [productPriceError, setProductPriceError] = useState<string>('');

  const handleCreate = () => {
    setProductNameError('');
    setProductPriceError('');

    if (!productName) {
      setProductNameError('Product name is required');
      return;
    }

    if (!productPrice) {
      setProductPriceError('Product price is required');
      return;
    }

    const productPriceNum = Number(productPrice);
    if (productPriceNum <= 0) {
      setProductPriceError('Product price must be greater than 0');
      return;
    }

    onCreate?.({ productName, productPrice: productPriceNum });
    onClose?.();
  };

  return (
    <Drawer title="Create Product" width="small" open={open} onClose={onClose}>
      <Stack space="xxlarge">
        <Stack space="gutter">
          <TextField
            label="Product Name"
            type="text"
            placeholder="Apple"
            value={productName}
            tone={productNameError ? 'critical' : 'neutral'}
            message={productNameError}
            onChange={(e) => setProductName(e.target.value)}
            onClear={() => setProductName('')}
          />
          <TextField
            label="Product Price"
            prefix="RM"
            type="number"
            value={productPrice}
            tone={productPriceError ? 'critical' : 'neutral'}
            message={productPriceError}
            onChange={(e) => setProductPrice(e.target.value)}
            onClear={() => setProductPrice('')}
          />
        </Stack>

        <Button tone="formAccent" icon={<IconAdd />} onClick={handleCreate}>
          Create
        </Button>
      </Stack>
    </Drawer>
  );
};
