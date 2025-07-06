import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { blockDefinitions, getCategories, getBlocksByCategory } from '@/config/blockDefinitions';
import { Type, Image, ArrowRight, CheckCircle, Target, Play, Star, FileText, ShoppingCart, Clock, MessageSquare, HelpCircle, Shield, Video, AlertTriangle, Zap, Volume2, RotateCcw, Loader, BarChart3, Quote, FormInput, List, TrendingUp, Grid, FileCode, BookOpen, Palette, Sparkles, Gift } from 'lucide-react';
import { BlocksDebugTest } from '../debug/BlocksDebugTest';

interface SchemaDrivenComponentsSidebarProps {
  onComponentSelect: (type: string) => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

// Mapeamento de ícones
const iconMap: { [key: string]: React.ReactNode } = {
  'Type': <Type className="w-4 h-4" />,
  'Image': <Image className="w-4 h-4" />,
  'ArrowRight': <ArrowRight className="w-4 h-4" />,
  'CheckCircle': <CheckCircle className="w-4 h-4" />,
  'Target': <Target className="w-4 h-4" />,
  'Play': <Play className="w-4 h-4" />,
  'Star': <Star className="w-4 h-4" />,
  'FileText': <FileText className="w-4 h-4" />,
  'ShoppingCart': <ShoppingCart className="w-4 h-4" />,
  'Clock': <Clock className="w-4 h-4" />,
  'MessageSquare': <MessageSquare className="w-4 h-4" />,
  'HelpCircle': <HelpCircle className="w-4 h-4" />,
  'Shield': <Shield className="w-4 h-4" />,
  'Video': <Video className="w-4 h-4" />,
  'AlertTriangle': <AlertTriangle className="w-4 h-4" />,
  'Zap': <Zap className="w-4 h-4" />,
  'Volume2': <Volume2 className="w-4 h-4" />,
  'RotateCcw': <RotateCcw className="w-4 h-4" />,
  'Loader': <Loader className="w-4 h-4" />,
  'BarChart3': <BarChart3 className="w-4 h-4" />,
  'Quote': <Quote className="w-4 h-4" />,
  'FormInput': <FormInput className="w-4 h-4" />,
  'List': <List className="w-4 h-4" />,
  'TrendingUp': <TrendingUp className="w-4 h-4" />,
  'Grid': <Grid className="w-4 h-4" />,
  'FileCode': <FileCode className="w-4 h-4" />,
  'BookOpen': <BookOpen className="w-4 h-4" />,
  'Palette': <Palette className="w-4 h-4" />,
  'Sparkles': <Sparkles className="w-4 h-4" />,
  'Gift': <Gift className="w-4 h-4" />
};

export const SchemaDrivenComponentsSidebar: React.FC<SchemaDrivenComponentsSidebarProps> = ({ 
  onComponentSelect,
  activeTab = 'blocks',
  onTabChange
}) => {
  // Debug: Verificar se os blocos estão sendo carregados
  const categories = getCategories();
  const allBlocks = blockDefinitions;
  
  console.log('DEBUG - Total categories:', categories.length, categories);
  console.log('DEBUG - Total blocks:', allBlocks.length);
  
  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-playfair text-lg text-[#432818]">Biblioteca</h2>
      </div>
      
      {/* Debug Component */}
      <BlocksDebugTest />
      
      <Tabs value={activeTab} onValueChange={onTabChange} className="flex-1 flex flex-col">
        <div className="border-b px-4 py-2">
          <TabsList className="w-full">
            <TabsTrigger value="pages" className="flex-1">Páginas</TabsTrigger>
            <TabsTrigger value="blocks" className="flex-1">Blocos</TabsTrigger>
          </TabsList>
        </div>
        
        <TabsContent value="pages" className="flex-1 p-4">
          <div className="text-center text-gray-500 py-8">
            <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p className="text-sm">
              Sistema de páginas<br />
              será implementado aqui
            </p>
          </div>
        </TabsContent>

        <TabsContent value="blocks" className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-4 space-y-4">
              {(() => {
                console.log('DEBUG - Rendering blocks tab, categories:', categories);
                return getCategories().map(category => {
                  const categoryBlocks = getBlocksByCategory(category);
                  console.log(`DEBUG - Category "${category}" has ${categoryBlocks.length} blocks`);
                  
                  return (
                    <div key={category}>
                      <h3 className="text-sm font-medium text-gray-700 mb-2 px-1">
                        {category}
                      </h3>
                      <div className="space-y-1">
                        {categoryBlocks.map(block => (
                          <Button
                            key={block.id}
                            variant="ghost"
                            className="w-full justify-start p-3 h-auto hover:bg-[#FAF9F7] transition-colors"
                            onClick={() => onComponentSelect(block.type)}
                          >
                            <div className="flex items-start space-x-3 w-full">
                              <div className="text-[#B89B7A] mt-0.5">
                                {iconMap[block.icon] || <Type className="w-4 h-4" />}
                              </div>
                              <div className="text-left flex-1 min-w-0">
                                <div className="flex items-center space-x-2">
                                  <span className="font-medium text-sm text-[#432818] truncate">
                                    {block.name}
                                  </span>
                                  {block.isNew && (
                                    <Badge variant="secondary" className="text-xs bg-[#B89B7A]/10 text-[#B89B7A] border-[#B89B7A]/20">
                                      Novo
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
                                  {block.description}
                                </p>
                              </div>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  );
                });
              })()}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};
