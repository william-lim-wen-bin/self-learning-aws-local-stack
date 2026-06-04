import { Box, Card, IconAdd, Text } from 'braid-design-system';

import type { NewProduct } from 'src/types';

interface CreateProductCardProps {
  onCreate: (newProduct: NewProduct) => void;
}

export const CreateProductCard = ({ onCreate }: CreateProductCardProps) => (
  <Box
    onClick={() =>
      onCreate({
        productName: `Product ${Math.random().toString(36).substring(2, 15)}`,
        productPrice: Math.floor(Math.random() * 1000),
      })
    }
    cursor="pointer"
  >
    <Card>
      <Text icon={<IconAdd />} tone="info">
        Add a new product
      </Text>
    </Card>
  </Box>
);
