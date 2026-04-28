import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Router } from '@/router';
import { AppErrorToastProvider } from '@/contexts/app-error-toast';

const queryClient = new QueryClient();

export function FerdShopApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppErrorToastProvider>
        <Router />
      </AppErrorToastProvider>
    </QueryClientProvider>
  );
}
