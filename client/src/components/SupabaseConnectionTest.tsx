
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export const SupabaseConnectionTest: React.FC = () => {
  const [connectionStatus, setConnectionStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [tableStatuses, setTableStatuses] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Test basic connection
        const { data, error } = await supabase.from('quizzes').select('count').limit(1);
        
        if (error) {
          console.error('Supabase connection error:', error);
          setConnectionStatus('error');
          return;
        }

        setConnectionStatus('connected');

        // Test each table
        const tables = ['quizzes', 'quiz_questions', 'question_options', 'style_types'];
        const statuses: { [key: string]: boolean } = {};

        for (const table of tables) {
          try {
            const { error: tableError } = await supabase.from(table).select('*').limit(1);
            statuses[table] = !tableError;
          } catch (err) {
            statuses[table] = false;
          }
        }

        setTableStatuses(statuses);
      } catch (error) {
        console.error('Connection test failed:', error);
        setConnectionStatus('error');
      }
    };

    testConnection();
  }, []);

  const getStatusIcon = (status: 'loading' | 'connected' | 'error') => {
    switch (status) {
      case 'loading':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'connected':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-500" />;
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          {getStatusIcon(connectionStatus)}
          Supabase Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs">Connection</span>
          <Badge variant={connectionStatus === 'connected' ? 'default' : 'destructive'}>
            {connectionStatus}
          </Badge>
        </div>
        
        {Object.entries(tableStatuses).map(([table, status]) => (
          <div key={table} className="flex items-center justify-between">
            <span className="text-xs">{table}</span>
            <Badge variant={status ? 'default' : 'destructive'}>
              {status ? 'OK' : 'Error'}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
