import { Box, PageBlock, Stack, Strong, Text } from 'braid-design-system';

import type { Environment } from 'src/types';

interface LayoutProps {
  environment: Environment;
  children: React.ReactNode;
}
export default ({ environment, children }: LayoutProps) => (
  <Stack space="gutter">
    <Box padding="xsmall" background="promote">
      <Text align="center" size="small">
        You are running on <Strong>{environment}</Strong>
      </Text>
    </Box>
    <PageBlock width="medium">{children}</PageBlock>
  </Stack>
);
