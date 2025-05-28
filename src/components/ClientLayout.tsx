
import React from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="client-layout">
      {children}
    </div>
  );
}
