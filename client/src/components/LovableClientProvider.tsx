
import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

interface LovableClientProviderProps {
  children: ReactNode;
}

const LovableClientProvider: React.FC<LovableClientProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default LovableClientProvider;
