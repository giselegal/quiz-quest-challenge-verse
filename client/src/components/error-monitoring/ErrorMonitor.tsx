import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertTriangle, CheckCircle, XCircle, RefreshCw } from 'lucide-react';
import { performHealthCheck } from '@/utils/telemetry-blocker';

interface HealthStatus {
  endpoint: string;
  status: number;
  ok: boolean;
  error?: string;
}

interface ErrorMonitorProps {
  showInDevelopment?: boolean;
}

export const ErrorMonitor: React.FC<ErrorMonitorProps> = ({ 
  showInDevelopment = true 
}) => {
  const [healthStatus, setHealthStatus] = useState<HealthStatus[]>([]);
  const [isChecking, setIsChecking] = useState(false);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  const runHealthCheck = async () => {
    setIsChecking(true);
    try {
      const results = await performHealthCheck();
      setHealthStatus(results);
      setLastCheck(new Date());
    } catch (error) {
      console.error('Health check failed:', error);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    // Only show in development or when explicitly requested
    if (process.env.NODE_ENV === 'development' && showInDevelopment) {
      runHealthCheck();
      
      // Check every 30 seconds
      const interval = setInterval(runHealthCheck, 30000);
      return () => clearInterval(interval);
    }
  }, [showInDevelopment]);

  // Don't render in production unless explicitly requested
  if (process.env.NODE_ENV === 'production' && !showInDevelopment) {
    return null;
  }

  const getStatusIcon = (status: HealthStatus) => {
    if (status.ok) return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (status.status === 0) return <XCircle className="h-4 w-4 text-red-500" />;
    return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
  };

  const getStatusBadge = (status: HealthStatus) => {
    if (status.ok) return <Badge variant="default" className="bg-green-100 text-green-800">OK</Badge>;
    if (status.status === 0) return <Badge variant="destructive">Error</Badge>;
    return <Badge variant="secondary">{status.status}</Badge>;
  };

  return (
    <Card className="fixed bottom-4 right-4 w-80 z-50 bg-background/95 backdrop-blur-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center justify-between">
          <span>System Status</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={runHealthCheck}
            disabled={isChecking}
          >
            <RefreshCw className={`h-3 w-3 ${isChecking ? 'animate-spin' : ''}`} />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {healthStatus.map((status, index) => (
          <div key={index} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              {getStatusIcon(status)}
              <span className="font-mono">{status.endpoint}</span>
            </div>
            {getStatusBadge(status)}
          </div>
        ))}
        
        {lastCheck && (
          <div className="text-xs text-muted-foreground mt-2 pt-2 border-t">
            Last check: {lastCheck.toLocaleTimeString()}
          </div>
        )}
        
        {healthStatus.length === 0 && !isChecking && (
          <div className="text-xs text-muted-foreground">
            Click refresh to check system health
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ErrorMonitor;
