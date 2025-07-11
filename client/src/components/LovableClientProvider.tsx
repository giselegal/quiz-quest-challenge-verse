
import React, { ReactNode } from 'react';

interface LovableClientProviderProps {
  children: ReactNode;
}

export const LovableClientProvider: React.FC<LovableClientProviderProps> = ({ children }) => {
  return <>{children}</>;
};
