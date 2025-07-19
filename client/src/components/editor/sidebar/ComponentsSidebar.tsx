import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Type, 
  Image, 
  ListChecks, 
  MessageSquare, 
  DollarSign, 
  Shield, 
  MousePointer,
  Layout,
  Award,
  Gift,
  LayoutTemplate,
  Quote,
  ImagePlus,
  HelpCircle,
  Trophy
} from 'lucide-react';
import { EditorBlock } from '@/types/editor';

interface ComponentsSidebarProps {
  onComponentSelect: (type: EditorBlock['type']) => void;
}

export const ComponentsSidebar: React.FC<ComponentsSidebarProps> = ({ 
  onComponentSelect 
}) => {
  const components = [
    // === COMPONENTES BÁSICOS ===
    { type: 'header', label: 'Cabeçalho', icon: LayoutTemplate },
    { type: 'text', label: 'Texto', icon: Type },
    { type: 'image', label: 'Imagem', icon: Image },
    { type: 'button', label: 'Botão', icon: MousePointer },
    { type: 'spacer', label: 'Espaçador', icon: Layout },
    { type: 'form-input', label: 'Input Formulário', icon: Type },
    { type: 'list', label: 'Lista', icon: ListChecks },
    
    // === COMPONENTES DE RESULTADO ===
    { type: 'result-header', label: 'Cabeçalho Resultado', icon: LayoutTemplate },
    { type: 'result-description', label: 'Descrição Resultado', icon: Type },
    
    // === COMPONENTES DE OFERTA ===
    { type: 'product-offer', label: 'Oferta Produto', icon: DollarSign },
    { type: 'urgency-timer', label: 'Timer Urgência', icon: MousePointer },
    
    // === COMPONENTES ESPECIAIS ===
    { type: 'faq-section', label: 'Seção FAQ', icon: HelpCircle },
    { type: 'testimonials', label: 'Depoimentos', icon: MessageSquare },
    { type: 'guarantee', label: 'Garantia', icon: Shield },
    { type: 'video-player', label: 'Player de Vídeo', icon: Image },
    
    // === COMPONENTES INLINE ESSENCIAIS ===
    { type: 'text-inline', label: 'Texto Inline', icon: Type },
    { type: 'heading-inline', label: 'Título Inline', icon: Type },
    { type: 'button-inline', label: 'Botão Inline', icon: MousePointer },
    { type: 'badge-inline', label: 'Badge Inline', icon: Award },
    { type: 'progress-inline', label: 'Progresso Inline', icon: Trophy },
    { type: 'image-display-inline', label: 'Imagem Display Inline', icon: Image },
    { type: 'style-card-inline', label: 'Card Estilo Inline', icon: Award },
    { type: 'result-card-inline', label: 'Card Resultado Inline', icon: Award },
    { type: 'result-header-inline', label: 'Header Resultado Inline', icon: LayoutTemplate },
    { type: 'before-after-inline', label: 'Antes/Depois Inline', icon: Image },
    { type: 'bonus-list-inline', label: 'Lista Bônus Inline', icon: Gift },
    { type: 'step-header-inline', label: 'Header Etapa Inline', icon: LayoutTemplate },
    { type: 'testimonial-card-inline', label: 'Card Depoimento Inline', icon: MessageSquare },
    { type: 'countdown-inline', label: 'Countdown Inline', icon: MousePointer },
    { type: 'stat-inline', label: 'Estatística Inline', icon: Trophy },
    { type: 'pricing-card-inline', label: 'Card Preço Inline', icon: DollarSign },
    
    // === COMPONENTES QUIZ ===
    { type: 'quiz-intro-header', label: 'Header Intro Quiz', icon: LayoutTemplate },
    { type: 'vertical-canvas-header', label: 'Header Canvas Vertical', icon: LayoutTemplate },
    { type: 'loading-animation', label: 'Animação Loading', icon: Trophy },
    { type: 'options-grid', label: 'Grid Opções', icon: Layout },
    { type: 'quiz-question', label: 'Questão Quiz', icon: HelpCircle },
    { type: 'quiz-progress', label: 'Progresso Quiz', icon: Trophy },
    
    // === COMPONENTES ETAPA 20/21 ===
    { type: 'quiz-offer-pricing-inline', label: 'Preço Oferta Quiz Inline', icon: DollarSign },
    { type: 'divider-inline', label: 'Divisor Inline', icon: Layout },
    
    // === COMPONENTES ETAPA 21 ESPECÍFICOS ===
    { type: 'hero-badge-inline', label: 'Badge Hero Inline', icon: Award },
    { type: 'hero-title-inline', label: 'Título Hero Inline', icon: Type },
    { type: 'problem-list-inline', label: 'Lista Problemas Inline', icon: ListChecks },
    { type: 'highlight-box-inline', label: 'Caixa Destaque Inline', icon: Award },
    { type: 'product-card-inline', label: 'Card Produto Inline', icon: Gift },
    { type: 'price-highlight-inline', label: 'Destaque Preço Inline', icon: DollarSign },
    { type: 'cta-button-inline', label: 'Botão CTA Inline', icon: MousePointer },
    { type: 'trust-elements-inline', label: 'Elementos Confiança Inline', icon: Shield },
    { type: 'countdown-timer-inline', label: 'Timer Countdown Inline', icon: MousePointer },
    { type: 'guarantee-seal-inline', label: 'Selo Garantia Inline', icon: Shield },
    { type: 'faq-item-inline', label: 'Item FAQ Inline', icon: HelpCircle },
    { type: 'section-header-inline', label: 'Header Seção Inline', icon: LayoutTemplate },
    { type: 'sticky-header-inline', label: 'Header Fixo Inline', icon: LayoutTemplate },
    
    // === COMPONENTES ESTRATÉGICOS ===
    { type: 'strategic-question-image', label: 'Questão Estratégica Imagem', icon: Image },
    { type: 'strategic-question-main', label: 'Questão Estratégica Principal', icon: HelpCircle },
    { type: 'strategic-question-inline', label: 'Questão Estratégica Inline', icon: HelpCircle },
    
    // === BLOCOS QUIZ ESPECÍFICOS ===
    { type: 'QuizQuestionBlock', label: 'Bloco Questão Quiz', icon: HelpCircle },
    { type: 'QuestionMultipleBlock', label: 'Bloco Questão Múltipla', icon: HelpCircle },
    { type: 'StrategicQuestionBlock', label: 'Bloco Questão Estratégica', icon: HelpCircle },
    { type: 'QuizTransitionBlock', label: 'Bloco Transição Quiz', icon: Layout },

    
    // === MAPEAMENTOS ADICIONAIS ===
    { type: 'quiz-title', label: 'Título Quiz', icon: Type },
    { type: 'quiz-name-input', label: 'Input Nome Quiz', icon: Type },
    { type: 'quiz-result-header', label: 'Header Resultado Quiz', icon: LayoutTemplate },
    { type: 'quiz-result-card', label: 'Card Resultado Quiz', icon: Award },
    { type: 'quiz-offer-title', label: 'Título Oferta Quiz', icon: Type },
    { type: 'quiz-offer-countdown', label: 'Countdown Oferta Quiz', icon: MousePointer },
    { type: 'quiz-offer-faq', label: 'FAQ Oferta Quiz', icon: HelpCircle },

    // === COMPONENTES MODULARES ORIGINAIS (mantidos) ===
    { type: 'hero-section', label: 'Seção Hero', icon: Quote },
    { type: 'bonus-carousel', label: 'Carrossel de Bônus', icon: ImagePlus },
    { type: 'headline', label: 'Título', icon: Type },
    { type: 'benefits', label: 'Benefícios', icon: ListChecks },
    { type: 'pricing', label: 'Preço', icon: DollarSign },
    { type: 'cta', label: 'Botão CTA', icon: MousePointer },
    { type: 'quiz-result-display', label: 'Display Resultado Quiz', icon: Trophy },
    { type: 'style-result', label: 'Resultado do Estilo', icon: Award },
    { type: 'secondary-styles', label: 'Estilos Secundários', icon: Layout },
    { type: 'bonus', label: 'Bônus', icon: Gift },
    
    // === NOVOS COMPONENTES MODULARES ===
    { type: 'result-page-header', label: 'Cabeçalho Resultado', icon: Layout },
    { type: 'style-result-card', label: 'Card Resultado Estilo', icon: Award },
    { type: 'result-cta', label: 'CTA Resultado', icon: MousePointer },
    { type: 'offer-header', label: 'Cabeçalho Oferta', icon: Layout },
    { type: 'product-showcase', label: 'Vitrine Produtos', icon: Gift },
    { type: 'offer-cta', label: 'CTA Oferta', icon: DollarSign }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-playfair text-lg text-[#432818]">Componentes</h2>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {components.map((component) => (
            <Button
              key={component.type}
              variant="ghost"
              className="w-full justify-start text-[#8F7A6A] hover:text-[#432818] hover:bg-[#FAF9F7]"
              onClick={() => onComponentSelect(component.type as EditorBlock['type'])}
            >
              <component.icon className="w-4 h-4 mr-2" />
              {component.label}
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
