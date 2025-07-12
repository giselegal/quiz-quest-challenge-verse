import React from 'react';
import { useLocation } from 'wouter';
import QuizCover from '../components/lovable/QuizCover.lovable';
import QuizQuestion from '../components/lovable/QuizQuestion.lovable';
import QuizLogic from '../components/lovable/QuizLogic.lovable';

export default function LovableDemoPage() {
  const [location] = useLocation();
  const isLovableMode = location.includes('lovable=true') || location.includes('/admin');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header de demonstração */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold text-gray-900">
              🎨 Demonstração Lovable - Quiz Quest
            </h1>
            <div className="flex items-center space-x-4">
              {isLovableMode && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  ✨ Modo Editor Ativo
                </span>
              )}
              <span className="text-sm text-gray-500">
                Porta: 5000
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Componentes editáveis */}
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        
        {/* Instruções */}
        <div className="mb-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h2 className="text-lg font-medium text-blue-900 mb-2">
            🔧 Como usar este demo
          </h2>
          <div className="text-blue-700 space-y-2">
            <p>• <strong>Modo Normal:</strong> <a href="http://localhost:5000/demo" className="underline">http://localhost:5000/demo</a></p>
            <p>• <strong>Modo Lovable:</strong> <a href="http://localhost:5000/demo?lovable=true" className="underline">http://localhost:5000/demo?lovable=true</a></p>
            <p>• <strong>Admin:</strong> <a href="http://localhost:5000/admin" className="underline">http://localhost:5000/admin</a></p>
          </div>
        </div>

        {/* Status de componentes */}
        <div className="mb-8 bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            📦 Componentes Lovable Disponíveis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'QuizCover', status: '✅' },
              { name: 'QuizQuestion', status: '✅' },
              { name: 'QuizLogic', status: '✅' },
              { name: 'ResultPageEditor', status: '✅' }
            ].map(comp => (
              <div key={comp.name} className="border rounded-lg p-4 text-center">
                <div className="text-2xl mb-2">{comp.status}</div>
                <div className="font-medium">{comp.name}</div>
                <div className="text-sm text-gray-500">Editável</div>
              </div>
            ))}
          </div>
        </div>

        {/* Demonstração dos componentes */}
        <div className="space-y-12">
          
          {/* QuizCover Demo */}
          <section className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                🏠 QuizCover Component
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Capa do quiz com logo, título e call-to-action
              </p>
            </div>
            <div className="p-6">
              <QuizCover />
            </div>
          </section>

          {/* QuizQuestion Demo */}
          <section className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                ❓ QuizQuestion Component
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                Pergunta individual com opções customizáveis
              </p>
            </div>
            <div className="p-6">
              <QuizQuestion />
            </div>
          </section>

          {/* Console Debug */}
          <section className="bg-gray-900 rounded-lg shadow text-white">
            <div className="p-6 border-b border-gray-700">
              <h3 className="text-lg font-medium">
                🐛 Debug Console
              </h3>
              <p className="text-sm text-gray-300 mt-1">
                Abra o console do navegador (F12) para ver os logs do Lovable
              </p>
            </div>
            <div className="p-6">
              <pre className="text-sm text-green-400">
{`// Console logs esperados:
🎨 Lovable: Componente QuizCover registrado
🎨 Lovable: Componente QuizQuestion registrado  
🎨 Lovable: Componente QuizLogic registrado
🎨 Lovable: Modo editor ativado
🎨 Lovable: Provider ativo no modo editor`}
              </pre>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
