import 'braid-design-system/reset';

import { BraidProvider } from 'braid-design-system';
import seekJobs from 'braid-design-system/themes/seekJobs';
import { StrictMode } from 'react';

import type { Environment } from 'src/types';

import Layout from './templates/Layout/Layout';
import OverviewPage from 'src/pages/OverviewPage';

interface AppProps {
  environment: Environment;
}

export const App = ({ environment }: AppProps) => (
  <StrictMode>
    <BraidProvider theme={seekJobs}>
      <Layout environment={environment}>
        <OverviewPage />
      </Layout>
    </BraidProvider>
  </StrictMode>
);
