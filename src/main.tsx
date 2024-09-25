import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AppProviders } from './context/AppProviders.tsx';

createRoot(document.getElementById('root')!).render(
  <AppProviders>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </AppProviders>
);
