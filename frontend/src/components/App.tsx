import 'braid-design-system/reset';

import { BraidProvider, PageBlock } from 'braid-design-system';
import seekJobs from 'braid-design-system/themes/seekJobs';
import { StrictMode } from 'react';

import { NextSteps } from './NextSteps';
import type { Environment } from 'src/types';
import { Test } from './Test';

interface AppProps {
  environment: Environment;
}

export const App = ({ environment }: AppProps) => (
  <StrictMode>
    <BraidProvider theme={seekJobs}>
      <PageBlock>
        <Test />
      </PageBlock>
      <NextSteps environment={environment} />
    </BraidProvider>
  </StrictMode>
);
