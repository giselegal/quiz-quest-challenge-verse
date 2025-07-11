
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export function SupabaseConnectionTest() {
  const [status, setStatus] = useState<'connecting' | 'connected' | 'error'>('connecting');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const testConnection = async () => {
      try {
        const { data, error: supabaseError } = await supabase
          .from('quizzes')
          .select('count')
          .limit(1);
        
        if (supabaseError) {
          throw supabaseError;
        }
        
        setStatus('connected');
      } catch (err) {
        console.error('Supabase connection error:', err);
        setError(err instanceof Error ? err.message : 'Connection failed');
        setStatus('error');
      }
    };

    testConnection();
  }, []);

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Supabase Connection Test</h2>
      
      {status === 'connecting' && (
        <div className="text-blue-600">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
          Connecting to Supabase...
        </div>
      )}
      
      {status === 'connected' && (
        <div className="text-green-600">
          ✅ Connected to Supabase successfully!
        </div>
      )}
      
      {status === 'error' && (
        <div className="text-red-600">
          ❌ Connection failed: {error}
        </div>
      )}
    </div>
  );
}
