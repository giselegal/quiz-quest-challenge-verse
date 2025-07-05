import React from 'react';
import { useDynamicComponent } from '../hooks/usePageConfig';

// Importar componentes reais com caminhos corretos
import { Header } from './result/Header';
import { Card } from './ui/card';
import { Button } from './ui/button';
import Testimonials from './quiz-result/sales/Testimonials';
import SecondaryStylesSection from './quiz-result/SecondaryStylesSection';
import MotivationSection from './result/MotivationSection';
import BonusSection from './result/BonusSection';
import GuaranteeSection from './result/GuaranteeSection';
import MentorSection from './result/MentorSection';
import SecurePurchaseElement from './result/SecurePurchaseElement';
import BeforeAfterTransformation from './result/BeforeAfterTransformation';
import FixedIntroImage from './ui/FixedIntroImage';

// Importar blocos de quiz reutilizáveis
import { 
  QuizQuestionBlock, 
  QuizProgressBlock, 
  QuizNavigationBlock, 
  QuizTransitionBlock,
  QuizIntroBlock,
  StartButtonBlock,
  QuizBenefitsBlock 
} from './blocks/quiz';

// Componentes básicos
import { Progress } from './ui/progress';
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

  // Usar any para props flexíveis
  const dynamicProps = props as any;

  // Renderizar componente baseado no tipo
  const renderComponent = () => {
    switch (componentType) {
      // COMPONENTES REAIS - RESULTPAGE
      case 'Header':
        return (
          <Header 
            primaryStyle={dynamicProps.primaryStyle}
            logoHeight={dynamicProps.logoHeight}
            logo={dynamicProps.logo}
            logoAlt={dynamicProps.logoAlt}
            userName={dynamicProps.userName}
          />
        );

      case 'Card':
        return (
          <Card className={dynamicProps.className}>
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
        return <SecondaryStylesSection secondaryStyles={dynamicProps.secondaryStyles || []} />;

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
            src={dynamicProps.src}
            alt={dynamicProps.alt}
            width={dynamicProps.width}
            height={dynamicProps.height}
            className={dynamicProps.className}
          />
        );

      case 'Button':
        return (
          <Button
            className={dynamicProps.className}
            style={dynamicProps.style}
            onClick={dynamicProps.onClick}
          >
            {dynamicProps.children}
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
          <div className={dynamicProps.className || "bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 text-white text-center"}>
            <p className="text-sm opacity-90 mb-2">{dynamicProps.title || 'Oferta por tempo limitado'}</p>
            <div className="mb-4">
              <span className="text-sm">5x de</span>
              <span className="text-4xl font-bold mx-2">{dynamicProps.installments || 'R$ 8,83'}</span>
            </div>
            <p className="text-lg">ou à vista <strong>{dynamicProps.fullPrice || 'R$ 39,90'}</strong></p>
            <p className="text-sm mt-2 opacity-75">{dynamicProps.savings || '77% OFF - Economia de R$ 135,10'}</p>
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
              {dynamicProps.title || 'Descubra Seu Estilo Predominante'}
            </h1>
            <p className="text-lg text-[#6B5B73] max-w-2xl mx-auto">
              {dynamicProps.subtitle || 'Tenha finalmente um guarda-roupa que funciona 100%'}
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
          <div className={`text-${dynamicProps.alignment || 'center'} py-6`}>
            <h1 className={`font-bold mb-2 ${
              dynamicProps.titleSize === 'small' ? 'text-2xl' :
              dynamicProps.titleSize === 'medium' ? 'text-3xl' : 'text-4xl'
            }`}>
              {dynamicProps.title || 'Título'}
            </h1>
            {dynamicProps.subtitle && (
              <p className="text-lg text-gray-600">{dynamicProps.subtitle}</p>
            )}
          </div>
        );

      case 'TextBlock':
        return (
          <div className={`text-${dynamicProps.alignment || 'left'} py-4`}>
            <p className={`${
              dynamicProps.fontSize === 'small' ? 'text-sm' :
              dynamicProps.fontSize === 'large' ? 'text-lg' : 'text-base'
            }`}>
              {dynamicProps.content || 'Texto do bloco'}
            </p>
          </div>
        );

      case 'ImageBlock':
        return (
          <div className={`text-${dynamicProps.alignment || 'center'} py-4`}>
            <img
              src={dynamicProps.src || 'https://via.placeholder.com/400x300?text=Imagem'}
              alt={dynamicProps.alt || 'Imagem'}
              style={{ width: dynamicProps.width || '100%' }}
              className="max-w-full h-auto"
            />
          </div>
        );

      case 'ButtonBlock':
        return (
          <div className="text-center py-4">
            <Button
              className={`${
                dynamicProps.size === 'sm' ? 'px-4 py-2' :
                dynamicProps.size === 'lg' ? 'px-8 py-4 text-lg' : 'px-6 py-3'
              } ${dynamicProps.fullWidth ? 'w-full' : ''}`}
              variant={dynamicProps.style === 'secondary' ? 'secondary' : 'default'}
            >
              {dynamicProps.text || 'Botão'}
            </Button>
          </div>
        );

      // BLOCOS DE QUIZ REUTILIZÁVEIS
      case 'QuizIntroBlock':
        return (
          <QuizIntroBlock
            blockId={blockId}
            title={dynamicProps.title}
            subtitle={dynamicProps.subtitle}
            namePlaceholder={dynamicProps.namePlaceholder}
            buttonTextEmpty={dynamicProps.buttonTextEmpty}
            buttonTextFilled={dynamicProps.buttonTextFilled}
            privacyText={dynamicProps.privacyText}
            footerText={dynamicProps.footerText}
            logoUrl={dynamicProps.logoUrl}
            logoAlt={dynamicProps.logoAlt}
            logoWidth={dynamicProps.logoWidth}
            logoHeight={dynamicProps.logoHeight}
            introImageUrl={dynamicProps.introImageUrl}
            introImageAlt={dynamicProps.introImageAlt}
            colors={dynamicProps.colors}
            onStart={dynamicProps.onStart}
            disabled={dynamicProps.disabled}
            required={dynamicProps.required}
            maxLength={dynamicProps.maxLength}
            maxWidth={dynamicProps.maxWidth}
            backgroundGradient={dynamicProps.backgroundGradient}
            className={dynamicProps.className}
            style={dynamicProps.style}
          />
        );

      case 'StartButtonBlock':
        return (
          <StartButtonBlock
            blockId={blockId}
            text={dynamicProps.text}
            icon={dynamicProps.icon}
            loadingText={dynamicProps.loadingText}
            disabled={dynamicProps.disabled}
            loading={dynamicProps.loading}
            size={dynamicProps.size}
            variant={dynamicProps.variant}
            fullWidth={dynamicProps.fullWidth}
            alignment={dynamicProps.alignment}
            colors={dynamicProps.colors}
            onClick={dynamicProps.onClick}
            href={dynamicProps.href}
            target={dynamicProps.target}
            enableHoverEffect={dynamicProps.enableHoverEffect}
            enablePulseEffect={dynamicProps.enablePulseEffect}
            className={dynamicProps.className}
            style={dynamicProps.style}
          />
        );

      case 'QuizBenefitsBlock':
        return (
          <QuizBenefitsBlock
            blockId={blockId}
            title={dynamicProps.title}
            subtitle={dynamicProps.subtitle}
            benefits={dynamicProps.benefits}
            showIcons={dynamicProps.showIcons}
            iconType={dynamicProps.iconType}
            layout={dynamicProps.layout}
            alignment={dynamicProps.alignment}
            spacing={dynamicProps.spacing}
            colors={dynamicProps.colors}
            maxWidth={dynamicProps.maxWidth}
            columns={dynamicProps.columns}
            className={dynamicProps.className}
            style={dynamicProps.style}
          />
        );

      case 'QuizQuestionBlock':
        return (
          <QuizQuestionBlock
            blockId={blockId}
            question={dynamicProps.question || 'Qual é a sua pergunta?'}
            description={dynamicProps.description}
            options={dynamicProps.options || []}
            multipleSelection={dynamicProps.multipleSelection || false}
            maxSelections={dynamicProps.maxSelections || 1}
            required={dynamicProps.required || false}
            alignment={dynamicProps.alignment || 'center'}
            optionLayout={dynamicProps.optionLayout || 'grid'}
            showImages={dynamicProps.showImages !== false}
            onAnswer={dynamicProps.onAnswer}
            selectedAnswers={dynamicProps.selectedAnswers || []}
            disabled={dynamicProps.disabled || false}
          />
        );

      case 'QuizProgressBlock':
        return (
          <QuizProgressBlock
            blockId={blockId}
            currentQuestion={dynamicProps.currentQuestion || 1}
            totalQuestions={dynamicProps.totalQuestions || 10}
            showPercentage={dynamicProps.showPercentage !== false}
            showNumbers={dynamicProps.showNumbers !== false}
            progressBarStyle={dynamicProps.progressBarStyle || 'linear'}
            color={dynamicProps.color || '#B89B7A'}
            backgroundColor={dynamicProps.backgroundColor || '#F3E8E6'}
            animated={dynamicProps.animated !== false}
            alignment={dynamicProps.alignment || 'center'}
          />
        );

      case 'QuizNavigationBlock':
        return (
          <QuizNavigationBlock
            blockId={blockId}
            showBackButton={dynamicProps.showBackButton !== false}
            showNextButton={dynamicProps.showNextButton !== false}
            showResetButton={dynamicProps.showResetButton || false}
            backButtonText={dynamicProps.backButtonText || 'Voltar'}
            nextButtonText={dynamicProps.nextButtonText || 'Próxima'}
            resetButtonText={dynamicProps.resetButtonText || 'Reiniciar'}
            disableBack={dynamicProps.disableBack || false}
            disableNext={dynamicProps.disableNext || false}
            alignment={dynamicProps.alignment || 'space-between'}
            buttonStyle={dynamicProps.buttonStyle || 'primary'}
            size={dynamicProps.size || 'md'}
            onBack={dynamicProps.onBack}
            onNext={dynamicProps.onNext}
            onReset={dynamicProps.onReset}
            currentQuestion={dynamicProps.currentQuestion}
            totalQuestions={dynamicProps.totalQuestions}
            isFirstQuestion={dynamicProps.isFirstQuestion}
            isLastQuestion={dynamicProps.isLastQuestion}
          />
        );

      case 'QuizTransitionBlock':
        return (
          <QuizTransitionBlock
            blockId={blockId}
            title={dynamicProps.title || 'Perfeito!'}
            subtitle={dynamicProps.subtitle}
            message={dynamicProps.message || 'Suas respostas estão sendo processadas...'}
            image={dynamicProps.image}
            imageAlt={dynamicProps.imageAlt}
            showAnimation={dynamicProps.showAnimation !== false}
            animationType={dynamicProps.animationType || 'celebration'}
            showContinueButton={dynamicProps.showContinueButton !== false}
            continueButtonText={dynamicProps.continueButtonText || 'Continuar'}
            autoAdvance={dynamicProps.autoAdvance || false}
            autoAdvanceDelay={dynamicProps.autoAdvanceDelay || 3000}
            onContinue={dynamicProps.onContinue}
            onAutoAdvance={dynamicProps.onAutoAdvance}
            loading={dynamicProps.loading || false}
          />
        );

      // FALLBACK
      default:
        return (
          <div className="p-4 border border-gray-300 rounded bg-gray-50">
            <p className="text-sm text-gray-600">
              Componente: {componentType}
            </p>
            {dynamicProps.title && <h3 className="font-medium">{dynamicProps.title}</h3>}
            {dynamicProps.content && <p className="text-sm">{dynamicProps.content}</p>}
            {dynamicProps.text && <p className="text-sm">{dynamicProps.text}</p>}
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
