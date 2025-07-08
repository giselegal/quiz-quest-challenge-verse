import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { InlineEditableText } from './InlineEditableText';
import { 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Users,
  Shield,
  Zap,
  Star,
  Gift,
  ChevronDown,
  ExternalLink,
  Play,
  Download
} from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface CTABenefit {
  id: string;
  icon: string;
  text: string;
  highlight?: boolean;
}

interface SocialProof {
  id: string;
  type: 'testimonial' | 'stat' | 'badge';
  content: string;
  author?: string;
  value?: number;
  suffix?: string;
}

interface AdvancedCTABlockProps extends BlockComponentProps {
  block: {
    id: string;
    type: 'advanced-cta';
    properties: {
      title?: string;
      subtitle?: string;
      description?: string;
      ctaText?: string;
      ctaUrl?: string;
      ctaType?: 'primary' | 'secondary' | 'gradient' | 'outline';
      secondaryCtaText?: string;
      secondaryCtaUrl?: string;
      benefits?: CTABenefit[];
      socialProof?: SocialProof[];
      urgency?: {
        enabled: boolean;
        text: string;
        timer?: number; // minutes
      };
      style?: 'modern' | 'elegant' | 'bold' | 'minimal';
      layout?: 'centered' | 'split' | 'card' | 'hero';
      backgroundColor?: string;
      textColor?: string;
      accentColor?: string;
      showRibbon?: boolean;
      ribbonText?: string;
    };
  };
}

const getIcon = (iconName: string) => {
  const icons: Record<string, React.ElementType> = {
    'Sparkles': Sparkles,
    'Clock': Clock,
    'Users': Users,
    'Shield': Shield,
    'Zap': Zap,
    'Star': Star,
    'Gift': Gift,
    'Play': Play,
    'Download': Download,
    'ExternalLink': ExternalLink,
  };
  return icons[iconName] || Sparkles;
};

const AdvancedCTABlock: React.FC<AdvancedCTABlockProps> = ({
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const {
    title = 'Transforme Seu Estilo Hoje Mesmo',
    subtitle = 'Descubra seu estilo pessoal e revolucione seu guarda-roupa',
    description = 'Junte-se a mais de 2.847 mulheres que já descobriram seu estilo único e transformaram sua autoestima com nossa consultoria personalizada.',
    ctaText = 'Descobrir Meu Estilo Agora',
    ctaUrl = '/quiz-descubra-seu-estilo',
    ctaType = 'gradient',
    secondaryCtaText = 'Ver Exemplos',
    secondaryCtaUrl = '/galeria',
    benefits = [
      {
        id: 'benefit-1',
        icon: 'Sparkles',
        text: 'Consultoria 100% personalizada',
        highlight: true
      },
      {
        id: 'benefit-2',
        icon: 'Clock',
        text: 'Resultado em poucos minutos',
        highlight: false
      },
      {
        id: 'benefit-3',
        icon: 'Shield',
        text: 'Garantia de satisfação',
        highlight: false
      }
    ],
    socialProof = [
      {
        id: 'proof-1',
        type: 'stat',
        content: 'Clientes Atendidas',
        value: 2847,
        suffix: '+'
      },
      {
        id: 'proof-2',
        type: 'stat',
        content: 'Avaliação Média',
        value: 4.9,
        suffix: '/5'
      },
      {
        id: 'proof-3',
        type: 'testimonial',
        content: 'Mudou completamente minha relação com a moda!',
        author: 'Maria S.'
      }
    ],
    urgency = {
      enabled: true,
      text: 'Oferta especial válida apenas hoje!',
      timer: 60
    },
    style = 'modern',
    layout = 'centered',
    backgroundColor = '#ffffff',
    textColor = '#432818',
    accentColor = '#B89B7A',
    showRibbon = true,
    ribbonText = '🔥 Mais Popular'
  } = block.properties;

  const [timeLeft, setTimeLeft] = useState(urgency.timer || 60);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (urgency.enabled && urgency.timer && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => Math.max(0, prev - 1));
      }, 60000); // Decrement every minute

      return () => clearInterval(timer);
    }
  }, [urgency.enabled, urgency.timer, timeLeft]);

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}min`;
    }
    return `${mins} minutos`;
  };

  const getStyleClasses = () => {
    switch (style) {
      case 'elegant':
        return {
          container: 'bg-gradient-to-br from-[#FAF9F7] to-white',
          card: 'bg-white border border-[#B89B7A]/20 shadow-xl',
          accent: 'text-[#432818]',
          button: 'bg-[#B89B7A] hover:bg-[#A68A6A] text-white shadow-lg'
        };
      case 'bold':
        return {
          container: 'bg-gradient-to-r from-purple-600 to-pink-600',
          card: 'bg-white/95 backdrop-blur-sm shadow-2xl',
          accent: 'text-purple-600',
          button: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-xl'
        };
      case 'minimal':
        return {
          container: 'bg-white',
          card: 'bg-gray-50 border border-gray-200',
          accent: 'text-gray-900',
          button: 'bg-gray-900 hover:bg-gray-800 text-white'
        };
      case 'modern':
      default:
        return {
          container: 'bg-gradient-to-br from-blue-50 to-indigo-100',
          card: 'bg-white shadow-xl border border-blue-200/50',
          accent: 'text-blue-600',
          button: 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg'
        };
    }
  };

  const getLayoutClasses = () => {
    switch (layout) {
      case 'split':
        return 'grid grid-cols-1 lg:grid-cols-2 gap-8 items-center';
      case 'card':
        return 'flex justify-center';
      case 'hero':
        return 'text-center min-h-[70vh] flex flex-col justify-center';
      case 'centered':
      default:
        return 'text-center max-w-4xl mx-auto';
    }
  };

  const getCTAButtonClasses = () => {
    const baseClasses = 'px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3';
    
    switch (ctaType) {
      case 'gradient':
        return `${baseClasses} bg-gradient-to-r from-[#B89B7A] to-[#D4B896] text-white shadow-lg hover:shadow-xl`;
      case 'secondary':
        return `${baseClasses} bg-gray-100 text-gray-800 hover:bg-gray-200`;
      case 'outline':
        return `${baseClasses} border-2 border-[#B89B7A] text-[#B89B7A] hover:bg-[#B89B7A] hover:text-white`;
      case 'primary':
      default:
        return `${baseClasses} bg-[#B89B7A] text-white hover:bg-[#A68A6A] shadow-lg`;
    }
  };

  const styleClasses = getStyleClasses();

  const renderBenefits = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {benefits.map((benefit, index) => {
        const IconComponent = getIcon(benefit.icon);
        return (
          <motion.div
            key={benefit.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className={cn(
              'flex items-center gap-3 p-3 rounded-lg transition-colors',
              benefit.highlight ? 'bg-[#FAF9F7] border border-[#B89B7A]/20' : 'hover:bg-gray-50'
            )}
          >
            <div 
              className="p-2 rounded-full"
              style={{ backgroundColor: `${accentColor}20` }}
            >
              <IconComponent 
                className="w-5 h-5" 
                style={{ color: accentColor }}
              />
            </div>
            <span className="text-sm font-medium" style={{ color: textColor }}>
              {isEditing ? (
                <InlineEditableText
                  value={benefit.text}
                  onSave={(value: string) => {
                    const updatedBenefits = benefits.map(b => 
                      b.id === benefit.id ? { ...b, text: value } : b
                    );
                    handlePropertyChange('benefits', updatedBenefits);
                  }}
                  className="inline-block"
                  placeholder="Benefício"
                  tag="span"
                />
              ) : (
                benefit.text
              )}
            </span>
          </motion.div>
        );
      })}
    </div>
  );

  const renderSocialProof = () => (
    <div className="flex flex-wrap justify-center gap-6 mb-8">
      {socialProof.map((proof, index) => (
        <motion.div
          key={proof.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 + 0.1 * index }}
          className="text-center"
        >
          {proof.type === 'stat' && (
            <div>
              <div className="text-2xl font-bold" style={{ color: accentColor }}>
                {proof.value?.toLocaleString()}{proof.suffix}
              </div>
              <div className="text-sm text-gray-600">{proof.content}</div>
            </div>
          )}
          
          {proof.type === 'testimonial' && (
            <div className="max-w-xs">
              <div className="text-sm italic text-gray-600 mb-1">
                "{proof.content}"
              </div>
              <div className="text-xs text-gray-500">- {proof.author}</div>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );

  return (
    <div
      className={cn(
        'py-16 px-4 cursor-pointer transition-all duration-200 relative overflow-hidden',
        styleClasses.container,
        isSelected 
          ? 'outline-2 outline-[#B89B7A] outline-offset-2' 
          : 'hover:shadow-sm',
        className
      )}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
      style={{ backgroundColor, color: textColor }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Ribbon */}
      {showRibbon && ribbonText && (
        <div className="absolute top-8 -right-12 bg-red-500 text-white px-16 py-2 rotate-45 text-sm font-semibold shadow-lg">
          {ribbonText}
        </div>
      )}

      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          animate={{
            scale: isHovered ? 1.1 : 1,
            rotate: isHovered ? 5 : 0,
          }}
          transition={{ duration: 0.3 }}
          className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-[#B89B7A] to-[#D4B896] rounded-full"
        />
        <motion.div
          animate={{
            scale: isHovered ? 1.2 : 1,
            rotate: isHovered ? -10 : 0,
          }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-10 left-10 w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full"
        />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className={getLayoutClasses()}>
          {layout === 'card' ? (
            <Card className={cn('max-w-2xl', styleClasses.card)}>
              <CardContent className="p-8">
                {renderContent()}
              </CardContent>
            </Card>
          ) : (
            renderContent()
          )}
        </div>
      </div>

      {/* Debug info */}
      {isEditing && (
        <motion.div 
          className="mt-8 p-4 bg-[#FAF9F7] border border-[#B89B7A]/20 rounded-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-sm text-[#8F7A6A]">
            Modo de edição: Estilo {style} • Layout {layout} • 
            Urgência: {urgency.enabled ? 'ativa' : 'inativa'} • 
            Benefícios: {benefits.length} • 
            Prova social: {socialProof.length}
          </p>
        </motion.div>
      )}
    </div>
  );

  function renderContent() {
    return (
      <>
        {/* Urgency */}
        {urgency.enabled && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Badge 
              variant="destructive" 
              className="bg-red-500 text-white px-4 py-2 text-sm font-medium animate-pulse"
            >
              <Clock className="w-4 h-4 mr-2" />
              {urgency.text} - Restam {formatTime(timeLeft)}
            </Badge>
          </motion.div>
        )}

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4" style={{ color: textColor }}>
            <InlineEditableText
              value={title}
              onSave={(value: string) => handlePropertyChange('title', value)}
              className="inline-block"
              placeholder="Título da CTA"
              tag="span"
            />
          </h2>
          
          {subtitle && (
            <p className="text-xl md:text-2xl mb-6 opacity-80">
              <InlineEditableText
                value={subtitle}
                onSave={(value: string) => handlePropertyChange('subtitle', value)}
                className="inline-block"
                placeholder="Subtítulo da CTA"
                tag="span"
              />
            </p>
          )}
          
          {description && (
            <p className="text-lg opacity-70 max-w-2xl mx-auto">
              <InlineEditableText
                value={description}
                onSave={(value: string) => handlePropertyChange('description', value)}
                className="inline-block"
                placeholder="Descrição da CTA"
                tag="span"
              />
            </p>
          )}
        </motion.div>

        {/* Benefits */}
        {benefits.length > 0 && renderBenefits()}

        {/* Social Proof */}
        {socialProof.length > 0 && renderSocialProof()}

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Button
            size="lg"
            className={getCTAButtonClasses()}
            onClick={(e) => {
              e.stopPropagation();
              if (!isEditing && ctaUrl) {
                window.location.href = ctaUrl;
              }
            }}
          >
            <InlineEditableText
              value={ctaText}
              onSave={(value: string) => handlePropertyChange('ctaText', value)}
              className="inline-block"
              placeholder="Texto do botão"
              tag="span"
            />
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          {secondaryCtaText && (
            <Button
              variant="outline"
              size="lg"
              className="px-6 py-3 border-gray-300 text-gray-600 hover:bg-gray-50"
              onClick={(e) => {
                e.stopPropagation();
                if (!isEditing && secondaryCtaUrl) {
                  window.location.href = secondaryCtaUrl;
                }
              }}
            >
              <InlineEditableText
                value={secondaryCtaText}
                onSave={(value: string) => handlePropertyChange('secondaryCtaText', value)}
                className="inline-block"
                placeholder="Texto do botão secundário"
                tag="span"
              />
            </Button>
          )}
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 flex flex-wrap justify-center gap-4 text-sm text-gray-500"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Dados 100% seguros
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            Mais de 2.800 clientes satisfeitas
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Resultado imediato
          </div>
        </motion.div>
      </>
    );
  }
};

export default AdvancedCTABlock;
