import { PageBlock, Stack } from 'braid-design-system';
import { EnvironmentBanner } from 'src/components/atoms';

import type { Environment } from 'src/types';

interface AppLayoutProps {
  environment: Environment;
  children: React.ReactNode;
}

export const AppLayout = ({ environment, children }: AppLayoutProps) => (
  <Stack space="xxlarge">
    <EnvironmentBanner environment={environment} />
    <PageBlock width="medium">{children}</PageBlock>
  </Stack>
);
