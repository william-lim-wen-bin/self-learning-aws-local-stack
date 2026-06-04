import 'braid-design-system/reset';

import { BraidProvider } from 'braid-design-system';
import seekJobs from 'braid-design-system/themes/seekJobs';
import { StrictMode } from 'react';

import OverviewPage from 'src/pages/OverviewPage';
import type { Environment } from 'src/types';

import { AppLayout } from './templates/AppLayout/AppLayout';

interface AppProps {
  environment: Environment;
}

export const App = ({ environment }: AppProps) => (
  <StrictMode>
    <BraidProvider theme={seekJobs}>
      <AppLayout environment={environment}>
        <OverviewPage />
      </AppLayout>
    </BraidProvider>
  </StrictMode>
);
