import { Box, Card, IconAdd, Text } from 'braid-design-system';

interface CreateProductCardProps {
  onClick: () => void;
}

export const CreateProductCard = ({ onClick }: CreateProductCardProps) => (
  <Box onClick={onClick} cursor="pointer">
    <Card>
      <Text icon={<IconAdd />} tone="brandAccent" align="center">
        Add a new product
      </Text>
    </Card>
  </Box>
);
