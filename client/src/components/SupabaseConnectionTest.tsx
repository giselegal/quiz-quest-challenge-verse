
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Badge } from '@/components/ui/badge';

export const SupabaseConnectionTest: React.FC = () => {
  const [status, setStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const [details, setDetails] = useState<string>('');

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { data, error } = await supabase.from('quizzes').select('count').limit(1);
        
        if (error) {
          setStatus('error');
          setDetails(error.message);
        } else {
          setStatus('connected');
          setDetails('Database connected successfully');
        }
      } catch (error) {
        setStatus('error');
        setDetails(error instanceof Error ? error.message : 'Unknown error');
      }
    };

    checkConnection();
  }, []);

  const getStatusColor = () => {
    switch (status) {
      case 'connected': return 'bg-green-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  return (
    <div className="p-2 bg-white rounded-md shadow-sm border">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
        <Badge variant="outline" className="text-xs">
          {status === 'checking' ? 'Checking...' : 
           status === 'connected' ? 'Connected' : 'Error'}
        </Badge>
      </div>
      {details && (
        <p className="text-xs text-gray-600 mt-1 truncate" title={details}>
          {details}
        </p>
      )}
    </div>
  );
};
