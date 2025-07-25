// React Context and Hooks for MCP Integration

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { MCPAdapter, SupabaseProvider, SQLiteProvider } from '../lib/mcp-adapter';
import { MCPServiceFactory, MCPFunnelService, MCPQuizService, MCPAnalyticsService } from '../services/mcp-services';

// Environment configuration
interface MCPConfig {
  environment: 'development' | 'staging' | 'production';
  primaryProvider: 'supabase' | 'sqlite';
  fallbackProvider?: 'supabase' | 'sqlite';
  
  supabase?: {
    url: string;
    key: string;
  };
  
  sqlite?: {
    path: string;
    mode?: string;
  };
}

// Context interface
interface MCPContextValue {
  services: {
    funnel: MCPFunnelService;
    quiz: MCPQuizService;
    analytics: MCPAnalyticsService;
  };
  adapter: MCPAdapter;
  isInitialized: boolean;
  isHealthy: boolean;
  error: string | null;
  config: MCPConfig;
  
  // Utility methods
  reinitialize: () => Promise<void>;
  checkHealth: () => Promise<boolean>;
}

// Create context
const MCPContext = createContext<MCPContextValue | null>(null);

// Provider component
interface MCPProviderProps {
  children: ReactNode;
  config?: Partial<MCPConfig>;
}

export const MCPProvider: React.FC<MCPProviderProps> = ({ children, config: userConfig }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isHealthy, setIsHealthy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [adapter, setAdapter] = useState<MCPAdapter | null>(null);
  const [services, setServices] = useState<MCPContextValue['services'] | null>(null);

  // Default configuration
  const defaultConfig: MCPConfig = {
    environment: (process.env.NODE_ENV as any) || 'development',
    primaryProvider: process.env.NODE_ENV === 'production' ? 'supabase' : 'sqlite',
    fallbackProvider: process.env.NODE_ENV === 'production' ? 'sqlite' : 'supabase',
    
    supabase: {
      url: process.env.REACT_APP_SUPABASE_URL || 'https://pwtjuuhchtbzttrzoutw.supabase.co',
      key: process.env.REACT_APP_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
    },
    
    sqlite: {
      path: process.env.REACT_APP_SQLITE_PATH || './dev.db',
      mode: 'WAL'
    }
  };

  const config: MCPConfig = { ...defaultConfig, ...userConfig };

  // Initialize MCP
  const initialize = async () => {
    try {
      setError(null);
      setIsInitialized(false);

      // Create providers
      const providers: { [key: string]: any } = {};
      
      if (config.supabase) {
        providers.supabase = new SupabaseProvider({
          url: config.supabase.url,
          key: config.supabase.key
        });
      }
      
      if (config.sqlite) {
        providers.sqlite = new SQLiteProvider({
          path: config.sqlite.path,
          mode: config.sqlite.mode
        });
      }

      // Create adapter with primary and fallback
      const primary = providers[config.primaryProvider];
      const fallback = config.fallbackProvider ? providers[config.fallbackProvider] : undefined;

      if (!primary) {
        throw new Error(`Primary provider ${config.primaryProvider} not configured`);
      }

      const mcpAdapter = new MCPAdapter({
        primary,
        fallback,
        logger: console // In production, use a proper logger
      });

      // Initialize adapter
      await mcpAdapter.initialize();

      // Create service factory
      const serviceFactory = new MCPServiceFactory(mcpAdapter);
      await serviceFactory.initialize();

      // Create services
      const mcpServices = {
        funnel: serviceFactory.createFunnelService(),
        quiz: serviceFactory.createQuizService(),
        analytics: serviceFactory.createAnalyticsService()
      };

      // Health check
      const healthy = await mcpAdapter.healthCheck();

      setAdapter(mcpAdapter);
      setServices(mcpServices);
      setIsHealthy(healthy);
      setIsInitialized(true);

      console.log('✅ MCP initialized successfully', {
        primary: config.primaryProvider,
        fallback: config.fallbackProvider,
        healthy
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error';
      setError(errorMessage);
      setIsInitialized(false);
      setIsHealthy(false);
      
      console.error('❌ MCP initialization failed:', errorMessage);
    }
  };

  // Health check
  const checkHealth = async (): Promise<boolean> => {
    if (!adapter) return false;
    
    try {
      const healthy = await adapter.healthCheck();
      setIsHealthy(healthy);
      return healthy;
    } catch (err) {
      setIsHealthy(false);
      return false;
    }
  };

  // Reinitialize
  const reinitialize = async () => {
    setIsInitialized(false);
    await initialize();
  };

  // Initialize on mount
  useEffect(() => {
    initialize();
  }, []);

  // Periodic health checks
  useEffect(() => {
    if (!isInitialized) return;

    const healthCheckInterval = setInterval(async () => {
      await checkHealth();
    }, 30000); // Check every 30 seconds

    return () => clearInterval(healthCheckInterval);
  }, [isInitialized]);

  const contextValue: MCPContextValue = {
    services: services || {
      funnel: null as any,
      quiz: null as any,
      analytics: null as any
    },
    adapter: adapter as any,
    isInitialized,
    isHealthy,
    error,
    config,
    reinitialize,
    checkHealth
  };

  return (
    <MCPContext.Provider value={contextValue}>
      {children}
    </MCPContext.Provider>
  );
};

// Hook to use MCP context
export const useMCP = (): MCPContextValue => {
  const context = useContext(MCPContext);
  
  if (!context) {
    throw new Error('useMCP must be used within an MCPProvider');
  }
  
  return context;
};

// Hook for funnel operations
export const useFunnelService = () => {
  const { services, isInitialized, error } = useMCP();
  
  return {
    funnelService: services.funnel,
    isReady: isInitialized && !error,
    error
  };
};

// Hook for quiz operations
export const useQuizService = () => {
  const { services, isInitialized, error } = useMCP();
  
  return {
    quizService: services.quiz,
    isReady: isInitialized && !error,
    error
  };
};

// Hook for analytics operations
export const useAnalyticsService = () => {
  const { services, isInitialized, error } = useMCP();
  
  return {
    analyticsService: services.analytics,
    isReady: isInitialized && !error,
    error
  };
};

// Hook for combined operations
export const useMCPServices = () => {
  const { services, isInitialized, isHealthy, error, reinitialize, checkHealth } = useMCP();
  
  return {
    services,
    isReady: isInitialized && !error,
    isHealthy,
    error,
    
    // Utility methods
    reinitialize,
    checkHealth,
    
    // Quick access to services
    funnel: services.funnel,
    quiz: services.quiz,
    analytics: services.analytics
  };
};

// Status component for debugging
export const MCPStatus: React.FC<{ showDetails?: boolean }> = ({ showDetails = false }) => {
  const { isInitialized, isHealthy, error, config } = useMCP();
  
  const getStatusColor = () => {
    if (error) return 'text-red-500';
    if (!isInitialized) return 'text-yellow-500';
    if (!isHealthy) return 'text-orange-500';
    return 'text-green-500';
  };

  const getStatusText = () => {
    if (error) return `Error: ${error}`;
    if (!isInitialized) return 'Initializing...';
    if (!isHealthy) return 'Unhealthy';
    return 'Ready';
  };

  return (
    <div className="mcp-status">
      <div className={`flex items-center gap-2 ${getStatusColor()}`}>
        <div className="w-2 h-2 rounded-full bg-current"></div>
        <span className="text-sm font-medium">MCP: {getStatusText()}</span>
      </div>
      
      {showDetails && (
        <div className="mt-2 text-xs text-gray-600">
          <div>Environment: {config.environment}</div>
          <div>Primary: {config.primaryProvider}</div>
          {config.fallbackProvider && (
            <div>Fallback: {config.fallbackProvider}</div>
          )}
        </div>
      )}
    </div>
  );
};

// Error boundary for MCP operations
interface MCPErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class MCPErrorBoundary extends React.Component<
  { children: ReactNode; fallback?: ReactNode },
  MCPErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): MCPErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('MCP Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="mcp-error-boundary p-4 border border-red-300 rounded-lg bg-red-50">
          <h3 className="text-red-800 font-semibold">MCP Error</h3>
          <p className="text-red-600 text-sm mt-1">
            {this.state.error?.message || 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-2 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Utility hook for async operations with error handling
export const useMCPOperation = <T,>(
  operation: () => Promise<T>,
  dependencies: any[] = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await operation();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    execute();
  }, dependencies);

  return {
    data,
    loading,
    error,
    refetch: execute
  };
};

export default MCPProvider;