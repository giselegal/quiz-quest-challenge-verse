
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ConnectionStatus {
  connected: boolean;
  tablesFound: string[];
  error?: string;
}

export const SupabaseConnectionTest: React.FC = () => {
  const [status, setStatus] = useState<ConnectionStatus>({
    connected: false,
    tablesFound: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testConnection = async () => {
      try {
        console.log('🔍 Testando conexão Supabase...');
        
        // Test basic connection
        const { data: quizzes, error: quizzesError } = await supabase
          .from('quizzes')
          .select('id, title')
          .limit(1);

        if (quizzesError) {
          throw quizzesError;
        }

        // Test other tables
        const tables = ['quiz_questions', 'quiz_participants', 'style_types', 'participant_answers'];
        const tableTests = await Promise.allSettled(
          tables.map(async (table) => {
            const { error } = await supabase
              .from(table)
              .select('*')
              .limit(1);
            
            if (error) throw new Error(`${table}: ${error.message}`);
            return table;
          })
        );

        const successfulTables = tableTests
          .filter((result): result is PromiseFulfilledResult<string> => result.status === 'fulfilled')
          .map(result => result.value);

        setStatus({
          connected: true,
          tablesFound: ['quizzes', ...successfulTables]
        });

        console.log('✅ Supabase conectado com sucesso!');
        console.log('📊 Tabelas encontradas:', ['quizzes', ...successfulTables]);

      } catch (error) {
        console.error('❌ Erro na conexão Supabase:', error);
        setStatus({
          connected: false,
          tablesFound: [],
          error: error instanceof Error ? error.message : 'Erro desconhecido'
        });
      } finally {
        setLoading(false);
      }
    };

    testConnection();
  }, []);

  if (loading) {
    return (
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-blue-700">Testando conexão Supabase...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 border rounded-lg ${
      status.connected 
        ? 'bg-green-50 border-green-200' 
        : 'bg-red-50 border-red-200'
    }`}>
      <div className="flex items-center space-x-2 mb-2">
        <div className={`w-3 h-3 rounded-full ${
          status.connected ? 'bg-green-500' : 'bg-red-500'
        }`}></div>
        <span className={`font-medium ${
          status.connected ? 'text-green-700' : 'text-red-700'
        }`}>
          Supabase: {status.connected ? 'Conectado' : 'Desconectado'}
        </span>
      </div>
      
      {status.connected && (
        <div className="text-sm text-green-600">
          <p>Tabelas acessíveis: {status.tablesFound.length}</p>
          <ul className="list-disc list-inside mt-1">
            {status.tablesFound.map(table => (
              <li key={table}>{table}</li>
            ))}
          </ul>
        </div>
      )}
      
      {status.error && (
        <div className="text-sm text-red-600 mt-2">
          <p><strong>Erro:</strong> {status.error}</p>
        </div>
      )}
    </div>
  );
};
