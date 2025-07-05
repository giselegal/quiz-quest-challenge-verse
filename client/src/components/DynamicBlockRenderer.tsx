import React from 'react';
import { useDynamicComponent } from '../hooks/usePageConfig';

// Importar componentes reais
import { Header } from '../result/Header';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import Testimonials from '../quiz-result/sales/Testimonials';
import SecondaryStylesSection from '../quiz-result/SecondaryStylesSection';
import MotivationSection from '../result/MotivationSection';
import BonusSection from '../result/BonusSection';
import GuaranteeSection from '../result/GuaranteeSection';
import MentorSection from '../result/MentorSection';
import SecurePurchaseElement from '../result/SecurePurchaseElement';
import BeforeAfterTransformation from '../result/BeforeAfterTransformation';
import FixedIntroImage from '../ui/FixedIntroImage';

// Componentes básicos
import { Progress } from '../ui/progress';
import { CheckCircle, Star, Gift, Lock, Shield, Award, Clock, ArrowRight } from 'lucide-react';

interface DynamicBlockRendererProps {
  pageId: string;
  blockId: string;
  fallback?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const DynamicBlockRenderer: React.FC<DynamicBlockRendererProps> = ({
  pageId,
  blockId,
  fallback = null,
  className = '',
  style = {}
}) => {
  const { componentType, props, isConfigured, rawBlock } = useDynamicComponent(pageId, blockId);

  if (!isConfigured) {
    return fallback || <div className="p-4 border-dashed border-2 border-gray-300 text-gray-500 text-center">
      Bloco não configurado: {blockId}
    </div>;
  }

  // Renderizar componente baseado no tipo
  const renderComponent = () => {
    switch (componentType) {
      // COMPONENTES REAIS - RESULTPAGE
      case 'Header':
        return (
          <Header 
            primaryStyle={props.primaryStyle}
            logoHeight={props.logoHeight}
            logo={props.logo}
            logoAlt={props.logoAlt}
            userName={props.userName}
          />
        );

      case 'Card':
        return (
          <Card className={props.className}>
            {rawBlock?.settings?.children?.map((child: any, index: number) => (
              <DynamicBlockRenderer 
                key={child.id || index}
                pageId={pageId}
                blockId={child.id}
                fallback={<div>Child component: {child.type}</div>}
              />
            ))}
            {!rawBlock?.settings?.children && (
              <div className="p-6 mb-10 bg-white shadow-md border border-[#B89B7A]/20 rounded-lg">
                <div className="text-center mb-8">
                  <div className="max-w-md mx-auto mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-[#8F7A6A]">Seu estilo predominante</span>
                      <span className="text-[#aa6b5d] font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-2 bg-[#F3E8E6]" />
                  </div>
                </div>
              </div>
            )}
          </Card>
        );

      case 'SecondaryStylesSection':
        return <SecondaryStylesSection secondaryStyles={props.secondaryStyles || []} />;

      case 'BeforeAfterTransformation':
        return <BeforeAfterTransformation />;

      case 'MotivationSection':
        return <MotivationSection />;

      case 'BonusSection':
        return <BonusSection />;

      case 'Testimonials':
        return <Testimonials />;

      case 'GuaranteeSection':
        return <GuaranteeSection />;

      case 'MentorSection':
        return <MentorSection />;

      case 'SecurePurchaseElement':
        return <SecurePurchaseElement />;

      // COMPONENTES REAIS - QUIZOFFERPAGE
      case 'FixedIntroImage':
        return (
          <FixedIntroImage
            src={props.src}
            alt={props.alt}
            width={props.width}
            height={props.height}
            className={props.className}
          />
        );

      case 'Button':
        return (
          <Button
            className={props.className}
            style={props.style}
            onClick={props.onClick}
          >
            {props.children}
          </Button>
        );

      // COMPONENTES CUSTOMIZADOS BASEADOS NOS TIPOS REAIS
      case 'CountdownTimer':
        return (
          <div className="flex flex-col items-center py-6">
            <p className="text-[#432818] font-semibold mb-2 flex items-center">
              <Clock className="w-4 h-4 mr-1 text-[#B89B7A]" />
              Esta oferta expira em:
            </p>
            <div className="flex items-center justify-center gap-1">
              <div className="bg-[#432818] text-white px-3 py-2 rounded-md text-lg font-mono font-bold shadow-sm">01</div>
              <span className="text-[#B89B7A] font-bold text-xl">:</span>
              <div className="bg-[#432818] text-white px-3 py-2 rounded-md text-lg font-mono font-bold shadow-sm">59</div>
              <span className="text-[#B89B7A] font-bold text-xl">:</span>
              <div className="bg-[#432818] text-white px-3 py-2 rounded-md text-lg font-mono font-bold shadow-sm">42</div>
            </div>
          </div>
        );

      case 'PricingSection':
        return (
          <div className={props.className || "bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 text-white text-center"}>
            <p className="text-sm opacity-90 mb-2">{props.title || 'Oferta por tempo limitado'}</p>
            <div className="mb-4">
              <span className="text-sm">5x de</span>
              <span className="text-4xl font-bold mx-2">{props.installments || 'R$ 8,83'}</span>
            </div>
            <p className="text-lg">ou à vista <strong>{props.fullPrice || 'R$ 39,90'}</strong></p>
            <p className="text-sm mt-2 opacity-75">{props.savings || '77% OFF - Economia de R$ 135,10'}</p>
          </div>
        );

      case 'SectionTitle':
        return (
          <div className="py-6 text-center">
            <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-200 mb-6">
              <Award className="w-4 h-4 text-green-600" />
              <span className="text-sm font-semibold text-green-700">3000+ mulheres transformadas</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-[#432818] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
              {props.title || 'Descubra Seu Estilo Predominante'}
            </h1>
            <p className="text-lg text-[#6B5B73] max-w-2xl mx-auto">
              {props.subtitle || 'Tenha finalmente um guarda-roupa que funciona 100%'}
            </p>
          </div>
        );

      case 'FaqSectionNew':
        return (
          <div className="py-6">
            <h2 className="text-2xl font-bold text-[#432818] text-center mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>
              Perguntas Frequentes
            </h2>
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-[#432818] mb-2">Como funciona o quiz?</h4>
                <p className="text-gray-700 text-sm">É muito simples! Você responde algumas perguntas sobre suas preferências e recebe seu resultado personalizado.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-[#432818] mb-2">Quanto tempo demora?</h4>
                <p className="text-gray-700 text-sm">O quiz leva apenas 5 minutos para ser concluído.</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-[#432818] mb-2">O material é digital?</h4>
                <p className="text-gray-700 text-sm">Sim, você recebe tudo por email imediatamente após a compra.</p>
              </div>
            </div>
          </div>
        );

      // COMPONENTES BÁSICOS DO EDITOR
      case 'HeaderBlock':
        return (
          <div className={`text-${props.alignment || 'center'} py-6`}>
            <h1 className={`font-bold mb-2 ${
              props.titleSize === 'small' ? 'text-2xl' :
              props.titleSize === 'medium' ? 'text-3xl' : 'text-4xl'
            }`}>
              {props.title || 'Título'}
            </h1>
            {props.subtitle && (
              <p className="text-lg text-gray-600">{props.subtitle}</p>
            )}
          </div>
        );

      case 'TextBlock':
        return (
          <div className={`text-${props.alignment || 'left'} py-4`}>
            <p className={`${
              props.fontSize === 'small' ? 'text-sm' :
              props.fontSize === 'large' ? 'text-lg' : 'text-base'
            }`}>
              {props.content || 'Texto do bloco'}
            </p>
          </div>
        );

      case 'ImageBlock':
        return (
          <div className={`text-${props.alignment || 'center'} py-4`}>
            <img
              src={props.src || 'https://via.placeholder.com/400x300?text=Imagem'}
              alt={props.alt || 'Imagem'}
              style={{ width: props.width || '100%' }}
              className="max-w-full h-auto"
            />
          </div>
        );

      case 'ButtonBlock':
        return (
          <div className="text-center py-4">
            <Button
              className={`${
                props.size === 'sm' ? 'px-4 py-2' :
                props.size === 'lg' ? 'px-8 py-4 text-lg' : 'px-6 py-3'
              } ${props.fullWidth ? 'w-full' : ''}`}
              variant={props.style === 'secondary' ? 'secondary' : 'default'}
            >
              {props.text || 'Botão'}
            </Button>
          </div>
        );

      case 'QuestionBlock':
        return (
          <div className="py-6">
            <div className="space-y-6">
              <h3 className="text-xl md:text-2xl font-semibold text-[#432818] text-center leading-relaxed">
                {props.question || 'Qual é a sua pergunta?'}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                {(props.options || []).map((option: any, index: number) => (
                  <div
                    key={index}
                    className="border-2 border-[#B89B7A]/30 hover:border-[#B89B7A] hover:bg-[#f9f4ef] rounded-xl transition-all duration-200 cursor-pointer group p-4"
                  >
                    <div className="flex items-start gap-3">
                      <span className="font-bold text-[#B89B7A] text-lg min-w-[24px]">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <span className="text-[#432818] text-sm leading-relaxed">
                        {option.text || `Opção ${String.fromCharCode(65 + index)}`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      // FALLBACK
      default:
        return (
          <div className="p-4 border border-gray-300 rounded bg-gray-50">
            <p className="text-sm text-gray-600">
              Componente: {componentType}
            </p>
            {props.title && <h3 className="font-medium">{props.title}</h3>}
            {props.content && <p className="text-sm">{props.content}</p>}
            {props.text && <p className="text-sm">{props.text}</p>}
          </div>
        );
    }
  };

  return (
    <div 
      className={className}
      style={style}
      data-block-id={blockId}
      data-component-type={componentType}
    >
      {renderComponent()}
    </div>
  );
};

export default DynamicBlockRenderer;
