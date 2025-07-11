import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/admin" className="text-xl font-bold text-gray-900">
                Admin
              </Link>
              <div className="hidden md:flex space-x-4">
                <Link to="/admin">
                  <Button 
                    variant={isActive('/admin') ? 'default' : 'ghost'}
                    size="sm"
                  >
                    Dashboard
                  </Button>
                </Link>
                <Link to="/admin/quiz">
                  <Button 
                    variant={isActive('/admin/quiz') ? 'default' : 'ghost'}
                    size="sm"
                  >
                    Quiz
                  </Button>
                </Link>
                <Link to="/admin/settings">
                  <Button 
                    variant={isActive('/admin/settings') ? 'default' : 'ghost'}
                    size="sm"
                  >
                    Configurações
                  </Button>
                </Link>
                <Link to="/admin/sync">
                  <Button 
                    variant={isActive('/admin/sync') ? 'default' : 'ghost'}
                    size="sm"
                  >
                    Sync
                  </Button>
                </Link>
                <Link to="/admin/ab-tests">
                  <Button 
                    variant={isActive('/admin/ab-tests') ? 'default' : 'ghost'}
                    size="sm"
                  >
                    A/B Tests
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <Link to="/">
                <Button variant="outline" size="sm">
                  Voltar ao Site
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {children}
        </div>
      </main>
    </div>
  );
};