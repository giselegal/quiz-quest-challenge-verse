
import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface ConnectionStatus {
  connected: boolean;
  tablesFound: string[];
  error?: string;
  details?: {
    quizzes: number;
    questions: number;
    participants: number;
    styleTypes: number;
  };
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
        
        // Test basic connection with quizzes
        const { data: quizzes, error: quizzesError } = await supabase
          .from('quizzes')
          .select('id, title')
          .limit(1);

        if (quizzesError) {
          throw quizzesError;
        }

        // Test other critical tables
        const [questionsResult, participantsResult, styleTypesResult] = await Promise.allSettled([
          supabase.from('quiz_questions').select('id').limit(1),
          supabase.from('quiz_participants').select('id').limit(1),
          supabase.from('style_types').select('id').limit(1)
        ]);

        const tableTests = [
          { name: 'quiz_questions', result: questionsResult },
          { name: 'quiz_participants', result: participantsResult }, 
          { name: 'style_types', result: styleTypesResult }
        ];

        const successfulTables = ['quizzes'];
        const details = {
          quizzes: quizzes?.length || 0,
          questions: 0,
          participants: 0,
          styleTypes: 0
        };

        tableTests.forEach(({ name, result }) => {
          if (result.status === 'fulfilled' && !result.value.error) {
            successfulTables.push(name);
            
            switch (name) {
              case 'quiz_questions':
                details.questions = result.value.data?.length || 0;
                break;
              case 'quiz_participants':
                details.participants = result.value.data?.length || 0;
                break;
              case 'style_types':
                details.styleTypes = result.value.data?.length || 0;
                break;
            }
          }
        });

        setStatus({
          connected: true,
          tablesFound: successfulTables,
          details
        });

        console.log('✅ Supabase conectado com sucesso!');
        console.log('📊 Tabelas encontradas:', successfulTables);

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
          {status.details && (
            <div className="mt-2 p-2 bg-green-100 rounded text-xs">
              <p>Detalhes das tabelas:</p>
              <ul className="mt-1">
                <li>Quizzes: {status.details.quizzes} registro(s)</li>
                <li>Questões: {status.details.questions} registro(s)</li>
                <li>Participantes: {status.details.participants} registro(s)</li>
                <li>Tipos de Estilo: {status.details.styleTypes} registro(s)</li>
              </ul>
            </div>
          )}
        </div>
      )}
      
      {status.error && (
        <div className="text-sm text-red-600 mt-2">
          <p><strong>Erro:</strong> {status.error}</p>
          <p className="text-xs mt-1">Verifique se as tabelas existem e as políticas RLS estão configuradas.</p>
        </div>
      )}
    </div>
  );
};
