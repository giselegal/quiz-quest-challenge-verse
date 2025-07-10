import React from 'react';
import { blockDefinitions, getCategories, getBlocksByCategory } from '@/config/blockDefinitions';

const BlockDefinitionsTest: React.FC = () => {
  const categories = getCategories();
  const modernResultPageBlock = blockDefinitions.find(block => block.type === 'modern-result-page');
  const quizOfferPageBlock = blockDefinitions.find(block => block.type === 'quiz-offer-page');
  
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Teste de Componentes das Etapas 20 e 21</h1>
      
      <div className="space-y-8">
        {/* Resumo das definições */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Resumo das Definições</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p><strong>Total de Blocos:</strong> {blockDefinitions.length}</p>
              <p><strong>Total de Categorias:</strong> {categories.length}</p>
            </div>
            <div>
              <p><strong>Categorias:</strong></p>
              <ul className="list-disc list-inside">
                {categories.map(category => (
                  <li key={category}>{category} ({getBlocksByCategory(category).length})</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bloco da Etapa 20 */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Etapa 20: Página de Resultado Moderna</h2>
          {modernResultPageBlock ? (
            <div className="space-y-2">
              <p><strong>✅ Encontrado:</strong> {modernResultPageBlock.name}</p>
              <p><strong>Tipo:</strong> {modernResultPageBlock.type}</p>
              <p><strong>Categoria:</strong> {modernResultPageBlock.category}</p>
              <p><strong>Ícone:</strong> {modernResultPageBlock.icon}</p>
              <p><strong>Descrição:</strong> {modernResultPageBlock.description}</p>
              <p><strong>Propriedades:</strong> {modernResultPageBlock.propertiesSchema.length} configurações</p>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Propriedades Disponíveis:</h3>
                <ul className="list-disc list-inside text-sm">
                  {modernResultPageBlock.propertiesSchema.map((prop: any, index: number) => (
                    <li key={index}>{prop.label} ({prop.type})</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className="text-red-600">❌ Bloco 'modern-result-page' não encontrado!</p>
          )}
        </div>

        {/* Bloco da Etapa 21 */}
        <div className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Etapa 21: Página de Oferta do Quiz</h2>
          {quizOfferPageBlock ? (
            <div className="space-y-2">
              <p><strong>✅ Encontrado:</strong> {quizOfferPageBlock.name}</p>
              <p><strong>Tipo:</strong> {quizOfferPageBlock.type}</p>
              <p><strong>Categoria:</strong> {quizOfferPageBlock.category}</p>
              <p><strong>Ícone:</strong> {quizOfferPageBlock.icon}</p>
              <p><strong>Descrição:</strong> {quizOfferPageBlock.description}</p>
              <p><strong>Propriedades:</strong> {quizOfferPageBlock.propertiesSchema.length} configurações</p>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Propriedades Disponíveis:</h3>
                <ul className="list-disc list-inside text-sm">
                  {quizOfferPageBlock.propertiesSchema.map((prop: any, index: number) => (
                    <li key={index}>{prop.label} ({prop.type})</li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <p className="text-red-600">❌ Bloco 'quiz-offer-page' não encontrado!</p>
          )}
        </div>

        {/* Blocos por Categoria */}
        <div className="bg-yellow-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Blocos por Categoria</h2>
          {categories.map(category => {
            const categoryBlocks = getBlocksByCategory(category);
            return (
              <div key={category} className="mb-4">
                <h3 className="font-semibold text-lg mb-2">{category} ({categoryBlocks.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {categoryBlocks.map((block, index) => (
                    <div key={index} className="bg-white p-3 rounded shadow-sm">
                      <p className="font-medium">{block.name}</p>
                      <p className="text-sm text-gray-600">{block.type}</p>
                      {(block.type === 'modern-result-page' || block.type === 'quiz-offer-page') && (
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-1">
                          🎯 Etapa {block.type === 'modern-result-page' ? '20' : '21'}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BlockDefinitionsTest;
