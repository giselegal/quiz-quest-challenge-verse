
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  FileQuestion, 
  FlaskConical, 
  Settings, 
  Palette, 
  BarChart3,
  LogOut,
  User,
  RefreshCw
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Quiz', href: '/admin/quiz', icon: FileQuestion },
    { name: 'Testes A/B', href: '/admin/ab-tests', icon: FlaskConical },
    { name: 'Criativos', href: '/admin/criativos', icon: Palette },
    { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
    { name: 'Sincronização', href: '/admin/sync', icon: RefreshCw },
    { name: 'Configurações', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-900">
            Painel Administrativo
          </h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-gray-500" />
              <span className="text-sm text-gray-700">
                {user?.email || 'Usuário'}
              </span>
            </div>
            <Button
              onClick={logout}
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-4">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-[#B89B7A] text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
