import {
  Button,
  Card,
  IconExperience,
  Spread,
  Stack,
  Text,
} from 'braid-design-system';

import type { Product } from 'src/types';

interface ProductCardProps {
  product: Product;
  onDelete: (productId: string) => void;
}

export const ProductCard = ({ product, onDelete }: ProductCardProps) => (
  <Card>
    <Spread space="large" direction="vertical">
      <Stack space="large" align="center">
        <IconExperience size="large" tone="brandAccent" />

        <Stack space="small">
          <Text size="large" weight="strong" maxLines={2}>
            {product.productName}
          </Text>
          <Text maxLines={1}>$ {product.productPrice}</Text>
        </Stack>
      </Stack>

      <Button size="small" tone="formAccent">
        View Product
      </Button>
    </Spread>

    {/* <Spread space="gutter" alignY="center">
      <IconExperience size="large" tone="formAccent" />
      <Text>{product.productName}</Text>
      <OverflowMenu label="Options">
        <MenuItem onClick={() => onDelete(product.productId)} tone="critical">
          Delete
        </MenuItem>
      </OverflowMenu>
    </Spread> */}
  </Card>
);
