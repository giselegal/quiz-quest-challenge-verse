/**
 * Biblioteca de Componentes de Funil Reutilizáveis
 * 
 * Esta biblioteca contém componentes React altamente configuráveis e reutilizáveis
 * para construção de funis de vendas, quiz interativos e páginas de conversão.
 * 
 * Cada componente é completamente independente e pode ser usado isoladamente
 * ou em combinação para criar funis complexos.
 */

// Exportar todos os tipos
export * from './types';

// Componentes principais
export { default as IntroPage } from './IntroPage';
export { default as QuizQuestion } from './QuizQuestion';
export { default as LoadingTransition } from './LoadingTransition';
export { default as StyleResultDisplay } from './StyleResultDisplay';
export { default as SalesOffer } from './SalesOffer';
export { default as TestimonialsGrid } from './TestimonialsGrid';
export { default as GuaranteeSection } from './GuaranteeSection';
export { default as FAQSection } from './FAQSection';
export { default as SocialProof } from './SocialProof';

// Componentes adicionais 
export { default as PrimaryStyleDisplay } from './PrimaryStyleDisplay';
export { default as BonusSection } from './BonusSection';
export { default as BeforeAfterSection } from './BeforeAfterSection';
export { default as MentorSection } from './MentorSection';
export { default as MotivationSection } from './MotivationSection';
export { default as CountdownTimer } from './CountdownTimer';
export { default as PriceComparison } from './PriceComparison';
export { default as VideoSection } from './VideoSection';
export { default as FeatureHighlight } from './FeatureHighlight';
export { default as QuizTransition } from './QuizTransition';
export { default as StrategicQuestion } from './StrategicQuestion';

/**
 * GUIA DE USO:
 * 
 * 1. IMPORTAÇÃO:
 * import { IntroPage, QuizQuestion, SalesOffer } from '@/components/funnel-blocks';
 * 
 * 2. USO BÁSICO:
 * <IntroPage
 *   title="Bem-vinda ao Quiz"
 *   buttonText="Começar"
 *   onSubmit={(data) => console.log(data)}
 * />
 * 
 * 3. CONFIGURAÇÃO AVANÇADA:
 * <QuizQuestion
 *   question="Qual é seu estilo favorito?"
 *   options={[
 *     { id: '1', text: 'Clássico', value: 'classic' },
 *     { id: '2', text: 'Moderno', value: 'modern' }
 *   ]}
 *   multipleSelection={false}
 *   autoAdvance={true}
 *   progressConfig={{
 *     showProgress: true,
 *     progressValue: 25,
 *     currentStep: 1,
 *     totalSteps: 4
 *   }}
 *   onAnswer={(answers) => handleAnswer(answers)}
 * />
 * 
 * 4. CUSTOMIZAÇÃO DE ESTILOS:
 * Todos os componentes aceitam as props:
 * - className: para classes CSS customizadas
 * - style: para estilos inline
 * - deviceView: 'mobile' | 'tablet' | 'desktop' para responsividade
 * 
 * 5. CALLBACKS E INTERAÇÕES:
 * Cada componente oferece callbacks específicos:
 * - onSubmit, onChange, onNext, onPrevious
 * - onValidation, onError para tratamento de erros
 * - onInteraction para eventos customizados
 * 
 * 6. RESPONSIVIDADE:
 * Os componentes são responsivos por padrão e ajustam-se automaticamente
 * baseado na prop deviceView ou nas classes Tailwind CSS.
 */

// Configurações padrão que podem ser sobrescritas
export const defaultTheme = {
  primaryColor: '#B89B7A',
  secondaryColor: '#432818',
  accentColor: '#D4B896',
  successColor: '#16a34a',
  errorColor: '#dc2626',
  warningColor: '#ea580c',
  spacing: {
    mobile: 'px-4 py-6',
    tablet: 'px-6 py-8',
    desktop: 'px-8 py-12'
  },
  typography: {
    titleSize: {
      small: 'text-2xl md:text-3xl',
      medium: 'text-3xl md:text-4xl',
      large: 'text-4xl md:text-5xl'
    }
  }
};

// Utilitários helper
export const funnelHelpers = {
  /**
   * Calcula o progresso baseado na etapa atual
   */
  calculateProgress: (currentStep: number, totalSteps: number): number => {
    return Math.round((currentStep / totalSteps) * 100);
  },

  /**
   * Formata porcentagem de desconto
   */
  formatDiscount: (originalPrice: string, currentPrice: string): number => {
    const original = parseFloat(originalPrice.replace(/[^\d,]/g, '').replace(',', '.'));
    const current = parseFloat(currentPrice.replace(/[^\d,]/g, '').replace(',', '.'));
    return Math.round(((original - current) / original) * 100);
  },

  /**
   * Valida email
   */
  validateEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  /**
   * Valida telefone brasileiro
   */
  validatePhone: (phone: string): boolean => {
    const phoneRegex = /^\(?[1-9]{2}\)?\s?[9]?[0-9]{4}-?[0-9]{4}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  },

  /**
   * Gera ID único para componentes
   */
  generateId: (): string => {
    return `funnel-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }
};
