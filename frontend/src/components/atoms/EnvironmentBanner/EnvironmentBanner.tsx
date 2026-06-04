import { Box, Text, Strong } from 'braid-design-system';

import type { Environment } from 'src/types';

interface EnvironmentBannerProps {
  environment: Environment;
}

export const EnvironmentBanner = ({ environment }: EnvironmentBannerProps) => (
  <Box padding="xsmall" background="brandAccent">
    <Text align="center" size="small">
      You are running on <Strong>{environment}</Strong>
    </Text>
  </Box>
);
