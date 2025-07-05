import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DynamicPropertiesPanel } from '../editor/panels/DynamicPropertiesPanel';
import { BlockRenderer, BlockData } from '../editor/blocks';
import { blockDefinitions, getCategories, getBlocksByCategory } from '@/config/blockDefinitions';
import { Type, Image, ArrowRight, CheckCircle, Target, Play } from 'lucide-react';

// Mock de dados para demonstração
const mockBlocks: BlockData[] = [
  {
    id: '1',
    type: 'header',
    properties: {
      title: 'Meu Título Incrível',
      subtitle: 'Este é um subtítulo interessante',
      titleSize: 'large',
      alignment: 'center'
    }
  },
  {
    id: '2',
    type: 'text',
    properties: {
      content: 'Este é um parágrafo de exemplo para demonstrar o sistema schema-driven.',
      fontSize: 'medium',
      alignment: 'left'
    }
  },
  {
    id: '3',
    type: 'image',
    properties: {
      src: 'https://via.placeholder.com/600x300?text=Imagem+Demo',
      alt: 'Imagem de demonstração',
      width: 'auto',
      alignment: 'center'
    }
  }
];

const mockFunnelConfig = {
  name: 'Quiz CaktoQuiz - Demonstração',
  description: 'Demonstração do sistema schema-driven',
  isPublished: false,
  theme: 'caktoquiz'
};

// Mapeamento de ícones
const iconMap: { [key: string]: React.ReactNode } = {
  'Type': <Type className="w-4 h-4" />,
  'Image': <Image className="w-4 h-4" />,
  'ArrowRight': <ArrowRight className="w-4 h-4" />,
  'CheckCircle': <CheckCircle className="w-4 h-4" />,
  'Target': <Target className="w-4 h-4" />,
  'Play': <Play className="w-4 h-4" />
};

export const SchemaDrivenDemo: React.FC = () => {
  const [blocks, setBlocks] = useState<BlockData[]>(mockBlocks);
  const [selectedBlockId, setSelectedBlockId] = useState<string>('1');
  const [funnelConfig, setFunnelConfig] = useState(mockFunnelConfig);
  const [activeTab, setActiveTab] = useState('blocks');

  const selectedBlock = blocks.find(b => b.id === selectedBlockId) || blocks[0];

  // Handlers para o painel de propriedades
  const handleBlockPropertyChange = (key: string, value: any) => {
    setBlocks(prev => prev.map(block => 
      block.id === selectedBlockId 
        ? { ...block, properties: { ...block.properties, [key]: value } }
        : block
    ));
  };

  const handleNestedPropertyChange = (path: string, value: any) => {
    const keys = path.split('.');
    setBlocks(prev => prev.map(block => {
      if (block.id !== selectedBlockId) return block;
      
      const newProperties = { ...block.properties };
      let target = newProperties;
      
      for (let i = 0; i < keys.length - 1; i++) {
        if (!target[keys[i]]) target[keys[i]] = {};
        target = target[keys[i]];
      }
      target[keys[keys.length - 1]] = value;
      
      return { ...block, properties: newProperties };
    }));
  };

  const handleFunnelConfigChange = (config: Partial<typeof mockFunnelConfig>) => {
    setFunnelConfig(prev => ({ ...prev, ...config }));
  };

  // Handler para adicionar novo bloco
  const addBlock = (blockType: string) => {
    const definition = blockDefinitions.find(def => def.type === blockType);
    if (!definition) return;

    const defaultProperties: Record<string, any> = {};
    definition.propertiesSchema?.forEach(prop => {
      if (prop.defaultValue !== undefined) {
        if (prop.nestedPath) {
          const keys = prop.nestedPath.split('.');
          let target = defaultProperties;
          for (let i = 0; i < keys.length - 1; i++) {
            if (!target[keys[i]]) target[keys[i]] = {};
            target = target[keys[i]];
          }
          target[keys[keys.length - 1]] = prop.defaultValue;
        } else {
          defaultProperties[prop.key] = prop.defaultValue;
        }
      }
    });

    const newBlock: BlockData = {
      id: `block-${Date.now()}`,
      type: blockType,
      properties: defaultProperties
    };

    setBlocks(prev => [...prev, newBlock]);
    setSelectedBlockId(newBlock.id);
  };

  return (
    <div className="h-screen flex">
      {/* Sidebar Esquerda - Biblioteca de Blocos */}
      <div className="w-80 border-r bg-white">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="border-b p-4">
            <TabsList className="w-full">
              <TabsTrigger value="pages">Páginas</TabsTrigger>
              <TabsTrigger value="blocks">Blocos</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="pages" className="flex-1 p-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Páginas do Funil</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Sistema de páginas seria implementado aqui...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blocks" className="flex-1 overflow-auto">
            <div className="p-4 space-y-4">
              {getCategories().map(category => (
                <div key={category}>
                  <h3 className="text-sm font-medium text-gray-700 mb-2">
                    {category}
                  </h3>
                  <div className="space-y-2">
                    {getBlocksByCategory(category).map(block => (
                      <Card 
                        key={block.id}
                        className="cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => {
                          // Simular seleção de novo bloco
                          const newBlock = {
                            id: Math.random().toString(),
                            type: block.type,
                            order: 1,
                            settings: block.propertiesSchema?.reduce((acc, prop) => {
                              acc[prop.key] = prop.defaultValue || '';
                              return acc;
                            }, {} as any) || {},
                            style: {}
                          };
                          setSelectedBlock(newBlock);
                        }}
                      >
                        <CardContent className="p-3">
                          <div className="flex items-center space-x-3">
                            <div className="text-gray-600">
                              {iconMap[block.icon] || <Target className="w-4 h-4" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <span className="text-sm font-medium">
                                  {block.name}
                                </span>
                                {block.isNew && (
                                  <Badge variant="secondary" className="text-xs">
                                    Novo!
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {block.description}
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Canvas Central */}
      <div className="flex-1 bg-gray-50 p-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Demonstração: Sistema Schema-Driven</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Esta é uma demonstração de como seria o sistema schema-driven. 
                Clique nos blocos da sidebar esquerda para ver como o painel de propriedades 
                se adapta automaticamente.
              </p>
              
              {/* Bloco renderizado */}
              <div 
                className="border-2 border-dashed border-blue-300 p-6 rounded-lg bg-white cursor-pointer hover:border-blue-500 transition-colors"
                onClick={() => console.log('Bloco selecionado:', selectedBlock)}
              >
                <div className="text-center">
                  {selectedBlock.type === 'header' && (
                    <div style={{ textAlign: selectedBlock.settings.alignment }}>
                      <h1 className={`font-bold text-[#432818] mb-2 ${
                        selectedBlock.settings.titleSize === 'small' ? 'text-lg' :
                        selectedBlock.settings.titleSize === 'medium' ? 'text-xl' :
                        'text-3xl'
                      }`}>
                        {selectedBlock.settings.title || 'Título do Cabeçalho'}
                      </h1>
                      {selectedBlock.settings.subtitle && (
                        <p className="text-gray-600">
                          {selectedBlock.settings.subtitle}
                        </p>
                      )}
                    </div>
                  )}
                  
                  {selectedBlock.type === 'text' && (
                    <div style={{ textAlign: selectedBlock.settings.alignment }}>
                      <p className={`text-gray-700 ${
                        selectedBlock.settings.fontSize === 'small' ? 'text-sm' :
                        selectedBlock.settings.fontSize === 'large' ? 'text-lg' :
                        'text-base'
                      }`}>
                        {selectedBlock.settings.content || 'Conteúdo do texto aqui...'}
                      </p>
                    </div>
                  )}
                  
                  {selectedBlock.type === 'image' && (
                    <div style={{ textAlign: selectedBlock.settings.alignment }}>
                      <img
                        src={selectedBlock.settings.src || 'https://via.placeholder.com/400x200?text=Imagem'}
                        alt={selectedBlock.settings.alt || 'Imagem'}
                        style={{ 
                          width: selectedBlock.settings.width || 'auto',
                          maxWidth: '100%'
                        }}
                        className="rounded-lg"
                      />
                    </div>
                  )}
                  
                  {selectedBlock.type === 'button' && (
                    <div className="text-center">
                      <Button
                        className={`${
                          selectedBlock.settings.style === 'primary' ? 'bg-[#B89B7A] hover:bg-[#A1835D] text-white' :
                          selectedBlock.settings.style === 'secondary' ? 'bg-gray-200 hover:bg-gray-300 text-gray-800' :
                          'bg-[#6B5B73] hover:bg-[#5A4A5F] text-white'
                        } ${
                          selectedBlock.settings.size === 'sm' ? 'px-4 py-2 text-sm' :
                          selectedBlock.settings.size === 'lg' ? 'px-8 py-4 text-lg' :
                          'px-6 py-3'
                        } ${
                          selectedBlock.settings.fullWidth ? 'w-full' : ''
                        }`}
                      >
                        {selectedBlock.settings.text || 'Texto do Botão'}
                      </Button>
                    </div>
                  )}
                  
                  {/* Outros tipos de bloco */}
                  {!['header', 'text', 'image', 'button'].includes(selectedBlock.type) && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">
                        Bloco: {selectedBlock.type}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        Renderização seria implementada aqui...
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Sidebar Direita - Painel de Propriedades */}
      <div className="w-80 border-l bg-white">
        <DynamicPropertiesPanel
          selectedBlock={selectedBlock}
          funnelConfig={funnelConfig}
          setFunnelConfig={setFunnelConfig}
          updateBlockSetting={updateBlockSetting}
          updateBlockStyle={updateBlockStyle}
        />
      </div>
    </div>
  );
};
