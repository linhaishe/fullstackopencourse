import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MsgProvider } from './MsgContext.tsx';
import './index.css';
import App from './app.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <MsgProvider>
      <App />
    </MsgProvider>
  </QueryClientProvider>
);
