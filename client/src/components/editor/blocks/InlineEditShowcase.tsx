import React, { useState } from 'react';
import { InlineEditText } from './InlineEditText';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

/**
 * Componente showcase para demonstrar todas as funcionalidades
 * da edição inline moderna e intuitiva
 */
export const InlineEditShowcase: React.FC = () => {
  const [data, setData] = useState({
    title: 'Título Principal',
    subtitle: 'Subtítulo descritivo',
    description: 'Esta é uma descrição mais longa que pode ser editada inline. Clique para editar este texto e veja como funciona a edição multilinha.',
    label: 'Campo de entrada',
    badge: 'NOVO',
    progress: '75%',
    category: 'Categoria'
  });

  const updateData = (key: string, value: string) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          🎨 Showcase: Sistema de Edição Inline Moderno
        </CardTitle>
        <p className="text-center text-gray-600">
          Clique em qualquer elemento para editar inline
        </p>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Títulos e Headers */}
        <section>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">📝 Títulos e Headers</h3>
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
            <InlineEditText
              value={data.title}
              onSave={(value: string) => updateData('title', value)}
              placeholder="Clique para editar título"
              as="h1"
              className="text-3xl font-bold text-center text-blue-600"
              autoSelect={true}
            />
            
            <InlineEditText
              value={data.subtitle}
              onSave={(value: string) => updateData('subtitle', value)}
              placeholder="Clique para editar subtítulo"
              as="h2"
              className="text-xl text-center text-gray-600"
              autoSelect={true}
            />
          </div>
        </section>

        {/* Texto Multilinha */}
        <section>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">📄 Texto Multilinha</h3>
          <div className="p-4 bg-gray-50 rounded-lg">
            <InlineEditText
              value={data.description}
              onSave={(value: string) => updateData('description', value)}
              placeholder="Clique para editar descrição..."
              as="p"
              className="text-gray-700 leading-relaxed"
              multiline={true}
              autoSelect={true}
            />
          </div>
        </section>

        {/* Componentes de UI */}
        <section>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">🎯 Componentes de UI</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Badge Editável */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-3">Badge Editável:</h4>
              <Badge variant="secondary" className="cursor-pointer">
                <InlineEditText
                  value={data.badge}
                  onSave={(value: string) => updateData('badge', value)}
                  placeholder="Badge"
                  as="span"
                  className="text-xs font-medium"
                  autoSelect={true}
                />
              </Badge>
            </div>

            {/* Label de Campo */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-3">Label de Campo:</h4>
              <div className="space-y-2">
                <InlineEditText
                  value={data.label}
                  onSave={(value: string) => updateData('label', value)}
                  placeholder="Label do campo"
                  as="label"
                  className="text-sm font-medium text-gray-700"
                  autoSelect={true}
                />
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Campo de exemplo"
                  disabled
                />
              </div>
            </div>

            {/* Progresso */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-3">Indicador de Progresso:</h4>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Progresso:</span>
                <InlineEditText
                  value={data.progress}
                  onSave={(value: string) => updateData('progress', value)}
                  placeholder="0%"
                  as="span"
                  className="text-sm font-medium text-blue-600"
                  validateOnSave={(value) => /^\d+%$/.test(value)}
                  autoSelect={true}
                />
              </div>
            </div>

            {/* Categoria */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <h4 className="font-medium mb-3">Categoria:</h4>
              <InlineEditText
                value={data.category}
                onSave={(value: string) => updateData('category', value)}
                placeholder="Nome da categoria"
                as="span"
                className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                autoSelect={true}
              />
            </div>
          </div>
        </section>

        {/* Funcionalidades Avançadas */}
        <section>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">⚡ Funcionalidades Avançadas</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium mb-2 text-blue-800">✅ Recursos Implementados:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Auto-seleção de texto</li>
                <li>• Ctrl+Enter para salvar (textarea)</li>
                <li>• Escape para cancelar</li>
                <li>• Validação customizada</li>
                <li>• Prevenção de eventos</li>
                <li>• Suporte a SSR</li>
                <li>• Múltiplas tags HTML</li>
              </ul>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium mb-2 text-green-800">🎯 Casos de Uso:</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Títulos e subtítulos</li>
                <li>• Descrições longas</li>
                <li>• Labels de formulário</li>
                <li>• Badges e categorias</li>
                <li>• Indicadores de progresso</li>
                <li>• Metadados diversos</li>
                <li>• Questões de quiz</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Demonstração de Estados */}
        <section>
          <h3 className="text-lg font-semibold mb-4 text-gray-800">🔄 Estados do Sistema</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <h4 className="font-medium mb-2">Estado Normal</h4>
              <InlineEditText
                value="Clique para editar"
              onSave={() => {}}
                placeholder="Placeholder"
                as="p"
                className="text-gray-700 border-2 border-dashed border-gray-300 p-2 rounded"
              />
            </div>

            <div className="p-4 bg-gray-100 rounded-lg text-center">
              <h4 className="font-medium mb-2">Estado Desabilitado</h4>
              <InlineEditText
                value="Texto desabilitado"
              onSave={() => {}}
                placeholder="Não editável"
                as="p"
                className="text-gray-500 p-2 rounded"
                disabled={true}
              />
            </div>

            <div className="p-4 bg-yellow-50 rounded-lg text-center">
              <h4 className="font-medium mb-2">Com Validação</h4>
              <InlineEditText
                value="teste@email.com"
                onSave={() => {}}
                placeholder="Email válido"
                as="p"
                className="text-yellow-700 p-2 rounded border border-yellow-300"
                validateOnSave={(value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)}
              />
            </div>
          </div>
        </section>

        {/* Ações */}
        <section className="text-center pt-6 border-t">
          <Button 
            onClick={() => console.log('Estado atual:', data)}
            className="mr-4"
          >
            Ver Estado Atual
          </Button>
          <Button 
            variant="outline"
            onClick={() => setData({
              title: 'Título Principal',
              subtitle: 'Subtítulo descritivo', 
              description: 'Esta é uma descrição mais longa que pode ser editada inline.',
              label: 'Campo de entrada',
              badge: 'NOVO',
              progress: '75%',
              category: 'Categoria'
            })}
          >
            Resetar Dados
          </Button>
        </section>
      </CardContent>
    </Card>
  );
};

export default InlineEditShowcase;
