
import React, { ReactNode } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <nav className="w-64 bg-white shadow-sm">
          <div className="p-4">
            <h2 className="text-lg font-semibold">Admin Panel</h2>
          </div>
        </nav>
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
