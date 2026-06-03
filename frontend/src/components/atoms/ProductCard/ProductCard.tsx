import {
  Card,
  MenuItem,
  OverflowMenu,
  Spread,
  Text,
} from 'braid-design-system';

import type { Product } from 'src/types';

interface ProductCardProps {
  product: Product;
  onDelete: (productId: string) => void;
}

export default ({ product, onDelete }: ProductCardProps) => (
  <Card>
    <Spread space="gutter">
      <Text>{product.productName}</Text>
      <OverflowMenu label="Options">
        <MenuItem onClick={() => onDelete(product.productId)} tone="critical">
          Delete
        </MenuItem>
      </OverflowMenu>
    </Spread>
  </Card>
);
