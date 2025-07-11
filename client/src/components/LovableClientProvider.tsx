import React, { ReactNode } from 'react';

interface LovableClientProviderProps {
  children: ReactNode;
}

const LovableClientProvider: React.FC<LovableClientProviderProps> = ({ children }) => {
  return <>{children}</>;
};

export default LovableClientProvider;