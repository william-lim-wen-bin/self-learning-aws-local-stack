import 'braid-design-system/reset';

import { BraidProvider } from 'braid-design-system';
import seekJobs from 'braid-design-system/themes/seekJobs';
import { StrictMode } from 'react';

import type { Environment } from 'src/types';

import { NextSteps } from './NextSteps';
import { Test } from './Test';
import Layout from './templates/Layout/Layout';

interface AppProps {
  environment: Environment;
}

export const App = ({ environment }: AppProps) => (
  <StrictMode>
    <BraidProvider theme={seekJobs}>
      <Layout environment={environment}>
        <Test />
      </Layout>
      <NextSteps environment={environment} />
    </BraidProvider>
  </StrictMode>
);
