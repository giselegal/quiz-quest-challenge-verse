import React from 'react';
import { useDynamicComponent } from '@/hooks/usePageConfig';

// Importar componentes reais
import { Header } from '@/components/result/Header';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Testimonials from '@/components/quiz-result/sales/Testimonials';
import SecondaryStylesSection from '@/components/quiz-result/SecondaryStylesSection';
import MotivationSection from '@/components/result/MotivationSection';
import BonusSection from '@/components/result/BonusSection';
import GuaranteeSection from '@/components/result/GuaranteeSection';
import MentorSection from '@/components/result/MentorSection';
import SecurePurchaseElement from '@/components/result/SecurePurchaseElement';
import BeforeAfterTransformation from '@/components/result/BeforeAfterTransformation';
import FixedIntroImage from '@/components/ui/FixedIntroImage';

// Componentes básicos
import { Progress } from '@/components/ui/progress';
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
    // === SUPORTE ESPECIAL PARA COMPONENT-REFERENCE ===
    if (componentType === 'component-reference') {
      const { componentPath, componentName, props: componentProps } = props;
      
      // Mapear componentes reais do projeto
      const componentMap: Record<string, React.ComponentType<any>> = {
        'BeforeAfterTransformation': BeforeAfterTransformation,
        'MotivationSection': MotivationSection,
        'BonusSection': BonusSection,
        'Testimonials': Testimonials,
        'GuaranteeSection': GuaranteeSection,
        'MentorSection': MentorSection,
        'SecurePurchaseElement': SecurePurchaseElement,
        'SecondaryStylesSection': SecondaryStylesSection
      };
      
      const Component = componentMap[componentName];
      if (Component) {
        return <Component {...(componentProps || {})} />;
      }
      
      // Fallback se componente não encontrado
      return (
        <div className="p-4 border border-red-300 bg-red-50 rounded-lg text-red-700">
          ⚠️ Componente não encontrado: {componentName}
        </div>
      );
    }

    switch (componentType) {
      // COMPONENTES REAIS - RESULTPAGE
      case 'header-component-real':
        return (
          <Header 
            primaryStyle={props.primaryStyle}
            logoHeight={props.logoHeight}
            logo={props.logo}
            logoAlt={props.logoAlt}
            userName={props.userName}
          />
        );

      case 'card-component-real':
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

      case 'secondary-styles-component-real':
        return <SecondaryStylesSection secondaryStyles={props.secondaryStyles || []} />;

      case 'before-after-component-real':
        return <BeforeAfterTransformation />;

      case 'motivation-component-real':
        return <MotivationSection />;

      case 'bonus-component-real':
        return <BonusSection />;

      case 'testimonials-component-real':
        return <Testimonials />;

      case 'guarantee-component-real':
        return <GuaranteeSection />;

      case 'mentor-component-real':
        return <MentorSection />;

      case 'secure-purchase-component-real':
        return <SecurePurchaseElement />;

      // COMPONENTES REAIS - QUIZOFFERPAGE
      case 'fixed-intro-image-component-real':
        return (
          <FixedIntroImage
            src={props.src}
            alt={props.alt}
            width={props.width}
            height={props.height}
            className={props.className}
          />
        );

      case 'button-component-real':
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
      case 'countdown-timer-component-real':
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

      case 'pricing-section-component-real':
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

      case 'section-title-component-real':
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

      case 'faq-section-component-real':
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

      case 'ProgressBlock':
        return (
          <div className="py-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-[#8F7A6A]">{props.label || 'Progresso'}</span>
              {props.showPercentage && (
                <span className="text-[#aa6b5d] font-medium">{props.value || 0}%</span>
              )}
            </div>
            <Progress value={props.value || 0} className="h-2 bg-[#F3E8E6]" />
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
                    key={option.id || index}
                    className="border-2 border-[#B89B7A]/30 hover:border-[#B89B7A] hover:bg-[#f9f4ef] rounded-xl transition-all duration-200 cursor-pointer group p-4"
                  >
                    {option.imageUrl && (
                      <div className="mb-3">
                        <img 
                          src={option.imageUrl} 
                          alt={option.text}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      </div>
                    )}
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

      // ETAPAS ESPECÍFICAS DO FUNIL - COMPONENTES PERSONALIZADOS

      // ETAPA 1: Quiz Introdução
      case 'quiz-intro-etapa-1':
        return (
          <div className="min-h-screen bg-gradient-to-br from-[#f9f4ef] to-white flex items-center justify-center p-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <img 
                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"
                alt="Logo Gisele Galvão"
                className="h-16 mx-auto mb-8"
              />
              <h1 className="text-3xl md:text-5xl font-bold text-[#432818] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                <span className="text-[#B89B7A]">Chega</span> de um guarda-roupa lotado e da sensação de que nada combina com você.
              </h1>
              <p className="text-lg md:text-xl text-[#6B5B73] max-w-3xl mx-auto leading-relaxed">
                Em poucos minutos, descubra seu Estilo Predominante — e aprenda a montar looks que realmente refletem sua essência, com praticidade e confiança.
              </p>
              <img 
                src="https://res.cloudinary.com/dqljyf76t/image/upload/v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up.webp"
                alt="Descubra seu estilo predominante"
                className="w-full max-w-2xl mx-auto rounded-xl shadow-lg"
              />
              <div className="max-w-md mx-auto space-y-4">
                <input 
                  type="text"
                  placeholder="Digite seu nome aqui..."
                  className="w-full px-6 py-4 text-lg border-2 border-[#B89B7A]/30 rounded-xl focus:border-[#B89B7A] focus:outline-none"
                />
                <button className="w-full bg-[#B89B7A] hover:bg-[#aa6b5d] text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105">
                  Quero Descobrir meu Estilo Agora!
                </button>
              </div>
              <p className="text-sm text-gray-500">Seus dados estão seguros conosco.</p>
            </div>
          </div>
        );

      // ETAPAS 2-11: Questões principais específicas
      case 'quiz-questao-principal':
        return (
          <div className="min-h-screen bg-white flex flex-col">
            <div className="flex-1 max-w-4xl mx-auto w-full p-6 flex flex-col justify-center">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#8F7A6A]">{props.progressLabel || 'Questão 1 de 10'}</span>
                  <span className="text-[#aa6b5d] font-medium">{props.progressValue || 5}%</span>
                </div>
                <div className="w-full bg-[#F3E8E6] rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${props.progressValue || 5}%` }}
                  />
                </div>
              </div>

              {/* Questão */}
              <div className="space-y-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#432818] text-center leading-relaxed" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {props.question || 'Qual o seu tipo de roupa favorita?'}
                </h2>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {(props.options || []).map((option: any, index: number) => (
                    <div
                      key={option.id || index}
                      className="border-2 border-[#B89B7A]/30 hover:border-[#B89B7A] hover:bg-[#f9f4ef] rounded-xl transition-all duration-200 cursor-pointer group overflow-hidden"
                    >
                      {option.imageUrl && (
                        <div className="aspect-video bg-gray-100">
                          <img 
                            src={option.imageUrl} 
                            alt={option.text}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <div className="flex items-start gap-3">
                          <span className="font-bold text-[#B89B7A] text-lg min-w-[24px]">
                            {String.fromCharCode(65 + index)}.
                          </span>
                          <span className="text-[#432818] text-sm leading-relaxed">
                            {option.text || `Opção ${String.fromCharCode(65 + index)}`}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {props.multipleSelection && (
                  <p className="text-center text-sm text-[#8F7A6A]">
                    Selecione até {props.maxSelections || 3} opções
                  </p>
                )}
              </div>
            </div>
          </div>
        );

      // ETAPA 12: Transição Principal
      case 'quiz-transicao-principal':
        return (
          <div className="min-h-screen bg-gradient-to-br from-[#f9f4ef] to-white flex items-center justify-center p-4">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#8F7A6A]">Progresso</span>
                  <span className="text-[#aa6b5d] font-medium">60%</span>
                </div>
                <div className="w-full bg-[#F3E8E6] rounded-full h-2">
                  <div className="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] h-2 rounded-full w-[60%]" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#432818] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                {props.title || 'Ótimo! Agora vamos conhecer você melhor'}
              </h1>
              <p className="text-lg text-[#6B5B73] max-w-2xl mx-auto leading-relaxed">
                {props.message || 'As próximas perguntas vão nos ajudar a personalizar ainda mais seu resultado.'}
              </p>
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#B89B7A]"></div>
              </div>
            </div>
          </div>
        );

      // ETAPAS 13-18: Questões estratégicas
      case 'quiz-questao-estrategica':
        return (
          <div className="min-h-screen bg-white flex flex-col">
            <div className="flex-1 max-w-3xl mx-auto w-full p-6 flex flex-col justify-center">
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#8F7A6A]">{props.progressLabel || 'Questão estratégica 1 de 6'}</span>
                  <span className="text-[#aa6b5d] font-medium">{props.progressValue || 65}%</span>
                </div>
                <div className="w-full bg-[#F3E8E6] rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${props.progressValue || 65}%` }}
                  />
                </div>
              </div>

              {/* Questão Estratégica */}
              <div className="space-y-8">
                <h2 className="text-2xl md:text-3xl font-bold text-[#432818] text-center leading-relaxed" style={{ fontFamily: 'Playfair Display, serif' }}>
                  {props.question || 'Qual é sua faixa etária?'}
                </h2>

                <div className="space-y-3 max-w-2xl mx-auto">
                  {(props.options || []).map((option: any, index: number) => (
                    <div
                      key={option.id || index}
                      className="border-2 border-[#B89B7A]/30 hover:border-[#B89B7A] hover:bg-[#f9f4ef] rounded-xl transition-all duration-200 cursor-pointer p-4"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-[#B89B7A] text-lg">
                          {String.fromCharCode(65 + index)}.
                        </span>
                        <span className="text-[#432818] text-base">
                          {option.text || `Opção ${String.fromCharCode(65 + index)}`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <button className="bg-[#B89B7A] hover:bg-[#aa6b5d] text-white font-bold py-3 px-8 rounded-xl transition-all duration-200">
                    Continuar
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      // ETAPA 19: Transição Final
      case 'quiz-transicao-final':
        return (
          <div className="min-h-screen bg-gradient-to-br from-[#f9f4ef] to-white flex items-center justify-center p-4">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[#8F7A6A]">Finalizando</span>
                  <span className="text-[#aa6b5d] font-medium">95%</span>
                </div>
                <div className="w-full bg-[#F3E8E6] rounded-full h-2">
                  <div className="bg-gradient-to-r from-[#B89B7A] to-[#aa6b5d] h-2 rounded-full w-[95%]" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-[#432818] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                Preparando seu resultado personalizado...
              </h1>
              <p className="text-lg text-[#6B5B73] max-w-2xl mx-auto leading-relaxed">
                Estamos analisando suas respostas e criando um guia exclusivo para você.
              </p>
              <div className="flex flex-col items-center space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B89B7A]"></div>
                <p className="text-sm text-[#8F7A6A] animate-pulse">
                  Analisando suas preferências...
                </p>
              </div>
            </div>
          </div>
        );

      // ETAPA 20: Resultado completo
      case 'quiz-resultado-completo':
        return (
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto p-6 space-y-8">
              {/* Header do Resultado */}
              <div className="bg-white rounded-xl shadow-md p-8 text-center">
                <img 
                  src="https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp"
                  alt="Logo Gisele Galvão"
                  className="h-16 mx-auto mb-6"
                />
                <h1 className="text-3xl md:text-4xl font-bold text-[#432818] mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Parabéns, {props.userName || 'Seu Nome'}!
                </h1>
                <h2 className="text-2xl text-[#B89B7A] font-semibold mb-6">
                  Você descobriu seu Estilo Predominante
                </h2>

                {/* Card do Estilo */}
                <div className="max-w-md mx-auto mb-8">
                  <div className="bg-gradient-to-br from-[#f9f4ef] to-[#f0e6d6] rounded-xl p-6 border border-[#B89B7A]/20">
                    <img 
                      src={props.styleImage || "https://res.cloudinary.com/dqljyf76t/image/upload/v1744735330/14_l2nprc.webp"}
                      alt={props.styleName || "Estilo Elegante"}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <h3 className="text-2xl font-bold text-[#432818] mb-2">
                      {props.styleName || 'Estilo Elegante'}
                    </h3>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-[#8F7A6A]">Compatibilidade</span>
                      <span className="text-[#aa6b5d] font-medium">92%</span>
                    </div>
                    <Progress value={92} className="h-3 bg-white" />
                  </div>
                </div>
              </div>

              {/* Características do Estilo */}
              <div className="bg-white rounded-xl shadow-md p-8">
                <h3 className="text-2xl font-bold text-[#432818] mb-6 text-center">
                  Características do seu estilo
                </h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#f9f4ef] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Star className="w-8 h-8 text-[#B89B7A]" />
                    </div>
                    <h4 className="font-semibold text-[#432818] mb-2">Sofisticação</h4>
                    <p className="text-sm text-gray-600">Elegância refinada e moderna</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#f9f4ef] rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-[#B89B7A]" />
                    </div>
                    <h4 className="font-semibold text-[#432818] mb-2">Qualidade</h4>
                    <p className="text-sm text-gray-600">Peças de alta qualidade e duráveis</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#f9f4ef] rounded-full flex items-center justify-center mx-auto mb-4">
                      <Award className="w-8 h-8 text-[#B89B7A]" />
                    </div>
                    <h4 className="font-semibold text-[#432818] mb-2">Versatilidade</h4>
                    <p className="text-sm text-gray-600">Looks para todas as ocasiões</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      // ETAPA 21: Oferta Especial
      case 'quiz-oferta-especial':
        return (
          <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto p-6 space-y-8">
              {/* Header da Oferta */}
              <div className="text-center py-8">
                <div className="inline-flex items-center gap-2 bg-green-50 px-4 py-2 rounded-full border border-green-200 mb-6">
                  <Award className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-semibold text-green-700">3000+ mulheres transformadas</span>
                </div>
                <h1 className="text-3xl md:text-5xl font-bold text-[#432818] mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>
                  Descubra Seu Estilo Predominante
                </h1>
                <p className="text-lg text-[#6B5B73] max-w-2xl mx-auto">
                  Tenha finalmente um guarda-roupa que funciona 100%
                </p>
              </div>

              {/* Imagem Principal */}
              <div className="text-center">
                <img 
                  src="https://res.cloudinary.com/dqljyf76t/image/upload/v1746838118/20250509_2137_Desordem_e_Reflex%C3%A3o_simple_compose_01jtvszf8sfaytz493z9f16rf2_z1c2up.webp"
                  alt="Transforme seu guarda-roupa"
                  className="w-full max-w-2xl mx-auto rounded-xl shadow-lg"
                />
              </div>

              {/* Countdown Timer */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="text-center">
                  <p className="text-[#432818] font-semibold mb-4 flex items-center justify-center">
                    <Clock className="w-5 h-5 mr-2 text-[#B89B7A]" />
                    Esta oferta expira em:
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="bg-[#432818] text-white px-4 py-3 rounded-lg text-xl font-mono font-bold">01</div>
                    <span className="text-[#B89B7A] font-bold text-2xl">:</span>
                    <div className="bg-[#432818] text-white px-4 py-3 rounded-lg text-xl font-mono font-bold">59</div>
                    <span className="text-[#B89B7A] font-bold text-2xl">:</span>
                    <div className="bg-[#432818] text-white px-4 py-3 rounded-lg text-xl font-mono font-bold">42</div>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-8 text-white text-center">
                <p className="text-sm opacity-90 mb-2">Oferta por tempo limitado</p>
                <div className="mb-4">
                  <span className="text-sm">5x de</span>
                  <span className="text-5xl font-bold mx-3">R$ 8,83</span>
                </div>
                <p className="text-xl mb-2">ou à vista <strong>R$ 39,90</strong></p>
                <p className="text-sm opacity-75">77% OFF - Economia de R$ 135,10</p>
              </div>

              {/* CTA */}
              <div className="text-center">
                <button className="bg-[#4CAF50] hover:bg-green-600 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 w-full max-w-md">
                  QUERO DESCOBRIR MEU ESTILO AGORA
                </button>
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