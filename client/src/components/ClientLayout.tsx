
import React from 'react';
import LovableClientProvider from './LovableClientProvider';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <LovableClientProvider>
      {children}
    </LovableClientProvider>
  );
}
