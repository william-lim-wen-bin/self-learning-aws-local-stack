import { hydrateRoot } from 'react-dom/client';

import { App } from './components/App';
import type { ClientContext } from './types';

export default ({ environment }: ClientContext) => {
  hydrateRoot(
    document.getElementById('app')!,
    <App environment={environment} />,
  );
};
