import { hydrateRoot } from 'react-dom/client';

import { App } from './components/App';
import type { ClientContext } from './types';

export default ({ environment }: ClientContext) => {
  console.log({ environment, url: process.env.API_URL });
  hydrateRoot(
    document.getElementById('app')!,
    <App environment={environment} />,
  );
};
