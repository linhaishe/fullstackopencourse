import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MsgProvider } from './context/MsgContext.tsx';
import { UserProvider } from './context/UserContext.tsx';
import './index.css';
import App from './app.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <UserProvider>
      <MsgProvider>
        <App />
      </MsgProvider>
    </UserProvider>
  </QueryClientProvider>
);
