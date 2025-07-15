import React from 'react';
import { OptionsGridBlock } from '@/components/editor/blocks/OptionsGridBlock';
import { UniversalBlockRenderer } from '@/components/editor/blocks/UniversalBlockRenderer';

const TestOptionsGrid = () => {
  const testBlock = {
    id: 'test-options-grid',
    type: 'options-grid',
    properties: {
      title: 'Teste de Seleção de Opções',
      options: [
        {
          id: 'opcao-1',
          text: 'A) <strong>Primeira opção</strong> de teste',
          value: 'opcao-1',
          imageUrl: '',
          category: 'teste'
        },
        {
          id: 'opcao-2', 
          text: 'B) <strong>Segunda opção</strong> de teste',
          value: 'opcao-2',
          imageUrl: '',
          category: 'teste'
        },
        {
          id: 'opcao-3',
          text: 'C) <strong>Terceira opção</strong> de teste', 
          value: 'opcao-3',
          imageUrl: '',
          category: 'teste'
        }
      ],
      columns: 2,
      showImages: false,
      multipleSelection: false,
      maxSelections: 1,
      minSelections: 1,
      validationMessage: 'Selecione uma opção',
      gridGap: 16,
      selectedOptions: []
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          🧪 Teste de OptionsGridBlock - Callbacks Debug
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Teste Direto (sem UniversalBlockRenderer):
          </h2>
          
          <OptionsGridBlock
            block={testBlock}
            isSelected={false}
            isEditing={false}
            onClick={() => console.log('🖱️ Block clicked')}
            onPropertyChange={(key, value) => {
              console.log('🎯 TESTE DIRETO - onPropertyChange:', { key, value });
              alert(`Callback funcionou! ${key}: ${JSON.stringify(value)}`);
            }}
            className="mb-8"
          />
          
          <hr className="my-8" />
          
          <h2 className="text-xl font-semibold mb-4">
            Teste via UniversalBlockRenderer:
          </h2>
          
          <UniversalBlockRenderer
            block={testBlock}
            isSelected={false}
            onClick={() => console.log('🖱️ UniversalBlock clicked')}
            onSaveInline={(blockId, updates) => {
              console.log('💾 TESTE VIA RENDERER - onSaveInline:', { blockId, updates });
              alert(`UniversalRenderer funcionou! Block: ${blockId}, Updates: ${JSON.stringify(updates)}`);
            }}
            disabled={false}
          />
        </div>
        
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 mb-2">
            🔍 Instruções de Teste:
          </h3>
          <ul className="text-blue-700 space-y-1">
            <li>1. Abra o Console do Navegador (F12)</li>
            <li>2. Clique em qualquer opção nos grids acima</li>
            <li>3. Verifique se aparecem logs no console</li>
            <li>4. Verifique se aparecem alertas na tela</li>
            <li>5. Compare o comportamento entre os dois testes</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TestOptionsGrid;
