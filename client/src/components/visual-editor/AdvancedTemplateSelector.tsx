// @ts-nocheck
import React, { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Search, 
  Filter, 
  Star, 
  Copy, 
  Download,
  Upload,
  Eye,
  Play,
  Plus,
  BookOpen,
  Zap,
  Target,
  Heart,
  Award,
  ShoppingCart,
  MessageCircle,
  Settings
} from 'lucide-react';

interface BlockData {
  id: string;
  type: string;
  order?: number;
  settings?: Record<string, any>;
  style?: Record<string, any>;
}

interface TemplateData {
  id: string;
  name: string;
  type: string;
  description: string;
  blocks: BlockData[];
  thumbnail?: string;
  category?: string;
  isPremium?: boolean;
  isPopular?: boolean;
}

interface AdvancedTemplateSelectorProps {
  templates: TemplateData[];
  onApplyTemplate: (template: TemplateData) => void;
  onCreatePage: (template: TemplateData) => void;
  currentPageType?: string;
}

// Templates adicionais para demonstração
const additionalTemplates: TemplateData[] = [
  {
    id: 'landing-page-modern',
    name: 'Landing Page Moderna',
    type: 'landing',
    description: 'Landing page moderna com hero section, benefícios e CTA',
    category: 'Marketing',
    isPopular: true,
    blocks: [
      {
        id: 'hero-modern',
        type: 'header',
        order: 1,
        settings: {
          title: 'Transforme Sua Vida Hoje',
          subtitle: 'Descubra o método revolucionário que já mudou milhares de vidas',
          showCTA: true,
          ctaText: 'Quero Começar Agora',
          backgroundImage: true
        }
      },
      {
        id: 'benefits-section',
        type: 'benefits-grid',
        order: 2,
        settings: {
          title: 'Por Que Escolher Nosso Método',
          benefits: [
            { icon: 'target', title: 'Resultados Garantidos', description: 'Metodologia comprovada' },
            { icon: 'zap', title: 'Rápido e Eficaz', description: 'Veja resultados em 30 dias' },
            { icon: 'heart', title: 'Suporte Completo', description: 'Acompanhamento personalizado' }
          ]
        }
      },
      {
        id: 'cta-final',
        type: 'cta-section',
        order: 3,
        settings: {
          title: 'Pronto Para Começar?',
          ctaText: 'Garantir Minha Vaga',
          urgency: true
        }
      }
    ]
  },
  {
    id: 'quiz-intro-premium',
    name: 'Quiz Introdução Premium',
    type: 'intro',
    description: 'Introdução de quiz premium com animações e trust elements',
    category: 'Quiz',
    isPremium: true,
    blocks: [
      {
        id: 'quiz-hero-premium',
        type: 'quiz-intro-section',
        order: 1,
        settings: {
          title: 'Descubra Seu Potencial Oculto',
          subtitle: 'Quiz científico personalizado com mais de 98% de precisão',
          showAnimations: true,
          showTrustBadges: true,
          showSocialProof: true
        }
      },
      {
        id: 'trust-indicators',
        type: 'trust-section',
        order: 2,
        settings: {
          showCertifications: true,
          showTestimonials: true,
          showStats: true
        }
      }
    ]
  },
  {
    id: 'sales-page-complete',
    name: 'Página de Vendas Completa',
    type: 'offer',
    description: 'Página de vendas com todos os elementos persuasivos',
    category: 'Vendas',
    isPopular: true,
    blocks: [
      {
        id: 'offer-hero',
        type: 'offer-header',
        order: 1,
        settings: {
          title: 'Oferta Especial - 70% OFF',
          originalPrice: 497,
          currentPrice: 147,
          countdown: true
        }
      },
      {
        id: 'product-benefits',
        type: 'product-showcase',
        order: 2,
        settings: {
          showFeatures: true,
          showBonuses: true,
          showGuarantee: true
        }
      },
      {
        id: 'testimonials-social',
        type: 'testimonials-component',
        order: 3,
        settings: {
          layout: 'carousel',
          showVideos: true
        }
      },
      {
        id: 'purchase-section',
        type: 'secure-purchase-component',
        order: 4,
        settings: {
          showSecurityBadges: true,
          showPaymentMethods: true,
          showGuarantee: true
        }
      }
    ]
  },
  {
    id: 'result-page-detailed',
    name: 'Página de Resultado Detalhada',
    type: 'result',
    description: 'Resultado completo com análise personalizada e ofertas',
    category: 'Resultado',
    blocks: [
      {
        id: 'result-header-detailed',
        type: 'result-header-component',
        order: 1,
        settings: {
          showPersonalization: true,
          showProgress: true,
          showSharing: true
        }
      },
      {
        id: 'result-analysis',
        type: 'result-analysis-section',
        order: 2,
        settings: {
          showCharts: true,
          showComparison: true,
          showRecommendations: true
        }
      },
      {
        id: 'result-offer',
        type: 'result-offer-section',
        order: 3,
        settings: {
          showPersonalizedOffer: true,
          showDiscount: true,
          showUrgency: true
        }
      }
    ]
  },
  {
    id: 'question-interactive',
    name: 'Questão Interativa Avançada',
    type: 'question',
    description: 'Questão com elementos interativos e gamificação',
    category: 'Quiz',
    isPremium: true,
    blocks: [
      {
        id: 'progress-animated',
        type: 'quiz-progress-bar',
        order: 1,
        settings: {
          animated: true,
          showPercentage: true,
          showStepName: true
        }
      },
      {
        id: 'question-gamified',
        type: 'question-interactive',
        order: 2,
        settings: {
          showImages: true,
          enableHover: true,
          showTooltips: true,
          gamificationElements: true
        }
      },
      {
        id: 'navigation-smart',
        type: 'quiz-navigation-controls',
        order: 3,
        settings: {
          smartValidation: true,
          showProgress: true,
          enableKeyboard: true
        }
      }
    ]
  }
];

// Função para obter ícone da categoria
const getCategoryIcon = (category: string) => {
  switch (category?.toLowerCase()) {
    case 'marketing': return Target;
    case 'quiz': return BookOpen;
    case 'vendas': return ShoppingCart;
    case 'resultado': return Award;
    case 'social': return MessageCircle;
    default: return Settings;
  }
};

export const AdvancedTemplateSelector: React.FC<AdvancedTemplateSelectorProps> = ({
  templates,
  onApplyTemplate,
  onCreatePage,
  currentPageType
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [view, setView] = useState<'grid' | 'list'>('grid');

  // Combinar templates padrão com adicionais
  const allTemplates = [...templates, ...additionalTemplates];

  // Obter categorias únicas
  const categories = ['all', ...new Set(allTemplates.map(t => t.category).filter(Boolean))];

  // Filtrar templates
  const filteredTemplates = allTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesPremium = !showPremiumOnly || template.isPremium;
    
    return matchesSearch && matchesCategory && matchesPremium;
  });

  // Agrupar templates por compatibilidade
  const compatibleTemplates = filteredTemplates.filter(t => 
    !currentPageType || t.type === currentPageType || currentPageType === 'intro'
  );
  const otherTemplates = filteredTemplates.filter(t => 
    currentPageType && t.type !== currentPageType && currentPageType !== 'intro'
  );

  const TemplateCard: React.FC<{ template: TemplateData; isCompatible: boolean }> = ({ 
    template, 
    isCompatible 
  }) => {
    const CategoryIcon = getCategoryIcon(template.category || '');
    
    return (
      <Card className={`
        group cursor-pointer transition-all hover:shadow-md
        ${isCompatible ? 'border-green-200 bg-green-50/50' : 'border-gray-200'}
        ${!isCompatible ? 'opacity-70' : ''}
      `}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-2 flex-1">
              <CategoryIcon className={`h-4 w-4 ${isCompatible ? 'text-green-600' : 'text-gray-600'}`} />
              <CardTitle className="text-sm font-medium truncate">{template.name}</CardTitle>
            </div>
            <div className="flex gap-1">
              {template.isPopular && (
                <Badge variant="secondary" className="text-xs">
                  <Star className="h-3 w-3 mr-1" />
                  Popular
                </Badge>
              )}
              {template.isPremium && (
                <Badge variant="outline" className="text-xs border-yellow-300 text-yellow-700">
                  <Award className="h-3 w-3 mr-1" />
                  Premium
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="space-y-3">
            {/* Descrição */}
            <p className="text-xs text-gray-600 line-clamp-2">{template.description}</p>
            
            {/* Informações do template */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>{template.blocks.length} blocos</span>
              <Badge variant="outline" className="text-xs">
                {template.type}
              </Badge>
            </div>
            
            {/* Preview dos blocos */}
            <div className="space-y-1">
              <p className="text-xs font-medium text-gray-700">Blocos inclusos:</p>
              <div className="flex flex-wrap gap-1">
                {template.blocks.slice(0, 3).map((block, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {block.type.replace(/-/g, ' ').slice(0, 12)}
                    {block.type.length > 12 ? '...' : ''}
                  </Badge>
                ))}
                {template.blocks.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{template.blocks.length - 3}
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Ações */}
            <div className="flex gap-2 pt-2">
              <Button
                size="sm"
                onClick={() => onApplyTemplate(template)}
                className="flex-1 h-7 text-xs"
                disabled={!isCompatible}
              >
                <Copy className="h-3 w-3 mr-1" />
                Aplicar
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onCreatePage(template)}
                className="h-7 text-xs"
              >
                <Plus className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-7 w-7 p-0"
                onClick={() => {
                  // TODO: Implementar preview
                }}
              >
                <Eye className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header com controles */}
      <div className="p-3 border-b space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Templates</h3>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="h-6 text-xs">
              <Upload className="h-3 w-3 mr-1" />
              Importar
            </Button>
            <Button size="sm" variant="outline" className="h-6 text-xs">
              <Download className="h-3 w-3 mr-1" />
              Exportar
            </Button>
          </div>
        </div>
        
        {/* Busca */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-gray-400" />
          <Input
            placeholder="Buscar templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-7 h-8 text-xs"
          />
        </div>

        {/* Filtros */}
        <div className="flex items-center gap-2">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="flex-1 h-7 text-xs border border-gray-300 rounded px-2"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'Todas as categorias' : category}
              </option>
            ))}
          </select>
          
          <Button
            size="sm"
            variant={showPremiumOnly ? "default" : "outline"}
            onClick={() => setShowPremiumOnly(!showPremiumOnly)}
            className="h-7 text-xs"
          >
            <Award className="h-3 w-3 mr-1" />
            Premium
          </Button>
        </div>

        {/* Informações da página atual */}
        {currentPageType && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-2">
            <p className="text-xs text-blue-800">
              <span className="font-medium">Página atual:</span> {currentPageType}
            </p>
            <p className="text-xs text-blue-600 mt-0.5">
              Templates compatíveis aparecem destacados em verde
            </p>
          </div>
        )}
      </div>

      {/* Lista de templates */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-4">
          {filteredTemplates.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Nenhum template encontrado</p>
              <p className="text-xs mt-1">Tente ajustar os filtros de busca</p>
            </div>
          ) : (
            <>
              {/* Templates compatíveis */}
              {compatibleTemplates.length > 0 && (
                <div>
                  <h4 className="text-xs font-medium text-green-700 mb-2 uppercase tracking-wider">
                    ✅ Compatíveis com sua página ({compatibleTemplates.length})
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {compatibleTemplates.map(template => (
                      <TemplateCard
                        key={template.id}
                        template={template}
                        isCompatible={true}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Outros templates */}
              {otherTemplates.length > 0 && (
                <div>
                  <h4 className="text-xs font-medium text-gray-600 mb-2 uppercase tracking-wider">
                    📋 Outros templates ({otherTemplates.length})
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {otherTemplates.map(template => (
                      <TemplateCard
                        key={template.id}
                        template={template}
                        isCompatible={false}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Templates quando não há página atual */}
              {!currentPageType && (
                <div className="grid grid-cols-1 gap-3">
                  {filteredTemplates.map(template => (
                    <TemplateCard
                      key={template.id}
                      template={template}
                      isCompatible={true}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </ScrollArea>

      {/* Footer com dicas */}
      <div className="p-3 border-t bg-gray-50">
        <div className="text-xs text-gray-600 space-y-1">
          <div className="flex items-center gap-2">
            <Play className="h-3 w-3" />
            <span>Dica: Use templates para acelerar a criação de páginas</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-3 w-3" />
            <span>Templates populares são testados e otimizados</span>
          </div>
        </div>
      </div>
    </div>
  );
};
