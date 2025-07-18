import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { blockDefinitions } from '@/config/blockDefinitionsOptimized';
import { 
  Type, Image, ArrowRight, CheckCircle, Target, Play, Star, FileText, ShoppingCart, Clock, 
  MessageSquare, HelpCircle, Shield, Video, AlertTriangle, Zap, Volume2, RotateCcw, Loader, 
  BarChart3, Quote, FormInput, List, TrendingUp, Grid, FileCode, BookOpen, Palette, Sparkles, 
  Gift, Award, Layers, Users, Brain, Crown, Heart, Mic, GalleryHorizontalEnd, RotateCw, 
  Blocks, Layout, MousePointer, Package, CircleDollarSign, ArrowRightLeft, Rows3, RefreshCw,
  MessageCircle, ShoppingBag, User, Settings
} from 'lucide-react';interface SchemaDrivenComponentsSidebarProps {
  onComponentSelect: (type: string) => void;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  funnelPages?: Array<{ id: string; name: string; title?: string; order?: number; blocks?: any[] }>;
  currentPageId?: string;
  setCurrentPage?: (pageId: string) => void;
}

// Funções auxiliares locais
const getCategories = (): string[] => {
  const categorySet = new Set(blockDefinitions.map(block => block.category || 'Sem Categoria'));
  const categories = Array.from(categorySet);
  // Ordem específica das categorias para melhor UX
  const priorityOrder = ['Quiz', 'Básicos', 'Layout', 'Vendas', 'Avançados', 'Inline', 'Sem Categoria'];
  return categories.sort((a, b) => {
    const aIndex = priorityOrder.indexOf(a);
    const bIndex = priorityOrder.indexOf(b);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return a.localeCompare(b);
  });
};

const getBlocksByCategory = (category: string) => 
  blockDefinitions.filter(block => (block.category || 'Sem Categoria') === category);

// Mapeamento de ícones completo
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
  'Gift': <Gift className="w-4 h-4" />,
  'Award': <Award className="w-4 h-4" />,
  'Layers': <Layers className="w-4 h-4" />,
  'Users': <Users className="w-4 h-4" />,
  'Brain': <Brain className="w-4 h-4" />,
  'Crown': <Crown className="w-4 h-4" />,
  'Heart': <Heart className="w-4 h-4" />,
  'Mic': <Mic className="w-4 h-4" />,
  'GalleryHorizontalEnd': <GalleryHorizontalEnd className="w-4 h-4" />,
  'RotateCw': <RotateCw className="w-4 h-4" />,
  'Blocks': <Blocks className="w-4 h-4" />,
  'Layout': <Layout className="w-4 h-4" />,

  'MousePointer': <MousePointer className="w-4 h-4" />,
  'Package': <Package className="w-4 h-4" />,
  'CircleDollarSign': <CircleDollarSign className="w-4 h-4" />,
  'ArrowRightLeft': <ArrowRightLeft className="w-4 h-4" />,
  'Rows3': <Rows3 className="w-4 h-4" />,
  'RefreshCw': <RefreshCw className="w-4 h-4" />,
  'MessageCircle': <MessageCircle className="w-4 h-4" />,
  'ShoppingBag': <ShoppingBag className="w-4 h-4" />,
  'User': <User className="w-4 h-4" />,
  'Settings': <Settings className="w-4 h-4" />
};

// Função para obter ícone da página baseado no tipo/conteúdo
const getPageIcon = (page: any) => {
  const name = page.name?.toLowerCase() || page.title?.toLowerCase() || '';
  
  if (name.includes('intro') || name.includes('início')) return <Play className="w-4 h-4" />;
  if (name.includes('questão') || name.includes('pergunta')) return <HelpCircle className="w-4 h-4" />;
  if (name.includes('transição')) return <ArrowRight className="w-4 h-4" />;
  if (name.includes('resultado')) return <Award className="w-4 h-4" />;
  if (name.includes('oferta') || name.includes('venda')) return <ShoppingCart className="w-4 h-4" />;
  if (name.includes('estratégica')) return <Brain className="w-4 h-4" />;
  
  return <FileText className="w-4 h-4" />;
};

export const SchemaDrivenComponentsSidebar: React.FC<SchemaDrivenComponentsSidebarProps> = ({
  onComponentSelect,
  activeTab = 'pages',
  onTabChange,
  funnelPages = [],
  currentPageId,
  setCurrentPage
}) => {
  const categories = getCategories();
  const allBlocks = blockDefinitions;

  return (
    <div className="h-full flex flex-col">
      <div className="p-2 sm:p-4 border-b border-gray-200">
        <h2 className="font-playfair text-base sm:text-lg text-[#432818]">Biblioteca</h2>
        <div className="flex items-center justify-between text-xs text-gray-600 mt-1">
          <span>{funnelPages.length} páginas</span>
          <span>•</span>
          <span>{allBlocks.length} blocos</span>
          <span>•</span>
          <span>{categories.length} categorias</span>
        </div>
      </div>
      
      <Tabs value={activeTab} onValueChange={onTabChange} className="flex-1 flex flex-col min-h-0">
        <div className="border-b border-gray-200 px-2 sm:px-4 py-2 flex-shrink-0">
          <TabsList className="w-full">
            <TabsTrigger value="pages" className="flex-1 text-xs sm:text-sm">Páginas</TabsTrigger>
            <TabsTrigger value="blocks" className="flex-1 text-xs sm:text-sm">Blocos</TabsTrigger>
          </TabsList>
        </div>
        
        {/* ABA PÁGINAS */}
        <TabsContent value="pages" className="flex-1 p-0 m-0 data-[state=active]:flex data-[state=active]:flex-col overflow-hidden">
          <ScrollArea className="flex-1">
            <div className="p-2 sm:p-3 space-y-1 sm:space-y-2">
              {funnelPages.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <Target className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-sm">Nenhuma página encontrada</p>
                  <p className="text-xs mt-1">Crie um novo funil para começar</p>
                </div>
              ) : (
                funnelPages
                  .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                  .map((page, index) => (
                    <Button
                      key={page.id}
                      variant="ghost"
                      className={`w-full justify-start px-2 sm:px-3 py-2 sm:py-2.5 h-auto text-left rounded-md hover:bg-gray-50 transition-colors ${
                        page.id === currentPageId 
                          ? 'bg-[#B89B7A]/10 border border-[#B89B7A]/20 text-[#432818]' 
                          : 'hover:bg-gray-50'
                      }`}
                      onClick={() => setCurrentPage && setCurrentPage(page.id)}
                    >
                      <div className="flex items-start space-x-2 sm:space-x-3 w-full">
                        <div className={`mt-0.5 flex-shrink-0 ${
                          page.id === currentPageId ? 'text-[#B89B7A]' : 'text-gray-400'
                        }`}>
                          {getPageIcon(page)}
                        </div>
                        <div className="flex flex-col items-start flex-1 min-w-0">
                          <div className="flex items-center space-x-2 w-full">
                            <span className="font-medium text-xs sm:text-sm text-[#432818] truncate flex-1">
                              {page.name || page.title || `Página ${page.order || index + 1}`}
                            </span>
                            <Badge 
                              variant="outline" 
                              className="text-xs bg-gray-50 text-gray-600 border-gray-200 hidden sm:inline-flex"
                            >
                              {page.order || index + 1}
                            </Badge>
                          </div>
                          {page.title && page.name !== page.title && (
                            <span className="text-xs text-gray-500 truncate w-full mt-0.5 hidden sm:block">
                              {page.title}
                            </span>
                          )}
                          {page.blocks && (
                            <span className="text-xs text-gray-400 mt-0.5 hidden sm:block">
                              {page.blocks.length} bloco{page.blocks.length !== 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                      </div>
                    </Button>
                  ))
              )}
            </div>
          </ScrollArea>
        </TabsContent>
        
        {/* ABA BLOCOS */}
        <TabsContent value="blocks" className="flex-1 p-0 m-0 data-[state=active]:flex data-[state=active]:flex-col overflow-hidden">
          <ScrollArea className="flex-1">
            <div className="p-2 sm:p-4 space-y-3 sm:space-y-4">
              {categories.map(category => {
                const categoryBlocks = getBlocksByCategory(category);
                
                return (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xs sm:text-sm font-medium text-gray-700">
                        {category}
                      </h3>
                      <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600">
                        {categoryBlocks.length}
                      </Badge>
                    </div>
                    <div className="space-y-0.5 sm:space-y-1">
                      {categoryBlocks.map((block, blockIndex) => (
                        <Button
                          key={`${block.type}-${blockIndex}`}
                          variant="ghost"
                          className="w-full justify-start p-2 sm:p-3 h-auto hover:bg-[#FAF9F7] transition-colors group"
                          onClick={() => onComponentSelect(block.type)}
                        >
                          <div className="flex items-start space-x-2 sm:space-x-3 w-full">
                            <div className="text-[#B89B7A] mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform">
                              {iconMap[block.icon || 'Type'] || <Type className="w-3 h-3 sm:w-4 sm:h-4" />}
                            </div>
                            <div className="text-left flex-1 min-w-0">
                              <div className="flex items-center justify-between w-full">
                                <span className="font-medium text-xs sm:text-sm text-[#432818] truncate">
                                  {block.name}
                                </span>
                                <div className="flex items-center space-x-1">
                                  {block.isNew && (
                                    <Badge variant="secondary" className="text-xs bg-[#B89B7A]/10 text-[#B89B7A] border-[#B89B7A]/20 hidden sm:inline-flex">
                                      Novo
                                    </Badge>
                                  )}
                                </div>
                              </div>
                              <p className="text-xs text-gray-500 mt-0.5 line-clamp-2 hidden sm:block">
                                {block.description || 'Componente sem descrição'}
                              </p>
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
      
      {/* Footer com estatísticas */}
      <div className="border-t border-gray-200 p-2 sm:p-3 bg-gray-50/50">
        <div className="text-xs text-gray-500 text-center">
          {activeTab === 'pages' ? (
            <span>
              Página ativa: {currentPageId ? funnelPages.find(p => p.id === currentPageId)?.name || 'Não encontrada' : 'Nenhuma'}
            </span>
          ) : (
            <span>
              Total de componentes disponíveis: {allBlocks.length}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default SchemaDrivenComponentsSidebar;