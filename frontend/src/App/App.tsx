import 'braid-design-system/reset';

import { BraidProvider } from 'braid-design-system';
import seekJobs from 'braid-design-system/themes/seekJobs';
import { StrictMode } from 'react';

import { NextSteps } from './NextSteps';
import type { Environment } from 'src/types';

interface AppProps {
  environment: Environment;
}

export const App = ({ environment }: AppProps) => (
  <StrictMode>
    <BraidProvider theme={seekJobs}>
      <NextSteps environment={environment} />
    </BraidProvider>
  </StrictMode>
);
