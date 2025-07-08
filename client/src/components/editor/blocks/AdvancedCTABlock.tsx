import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { InlineEditableText } from './InlineEditableText';
import { 
  ArrowRight,
  Zap,
  Clock,
  Gift,
  Shield,
  Users,
  Star,
  CheckCircle,
  TrendingUp,
  Sparkles,
  Crown,
  Play,
  Download,
  Phone,
  MessageCircle,
  Calendar,
  CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { BlockComponentProps } from '@/types/blocks';

interface CTAAction {
  id: string;
  text: string;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  url?: string;
  action?: string;
}

interface CTAFeature {
  id: string;
  text: string;
  icon?: string;
  highlighted?: boolean;
}

interface AdvancedCTABlockProps extends BlockComponentProps {
  block: {
    id: string;
    type: 'advanced-cta';
    properties: {
      title?: string;
      subtitle?: string;
      description?: string;
      actions?: CTAAction[];
      features?: CTAFeature[];
      urgencyText?: string;
      countdown?: {
        enabled: boolean;
        endDate?: string;
        showDays?: boolean;
        showHours?: boolean;
        showMinutes?: boolean;
        showSeconds?: boolean;
      };
      socialProof?: {
        enabled: boolean;
        text?: string;
        avatars?: string[];
      };
      guarantees?: string[];
      variant?: 'standard' | 'hero' | 'sticky' | 'floating' | 'modal';
      style?: 'minimal' | 'bold' | 'gradient' | 'outlined' | 'glassmorphism';
      animation?: 'none' | 'pulse' | 'bounce' | 'glow' | 'shake';
      backgroundColor?: string;
      textColor?: string;
      accentColor?: string;
      showPricing?: boolean;
      price?: number;
      originalPrice?: number;
      currency?: string;
    };
  };
}

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
    subtitle = 'Descubra seu estilo único em poucos minutos',
    description = 'Faça o quiz gratuito e receba um guia personalizado com tudo o que você precisa para se vestir com mais confiança e estilo.',
    actions = [
      {
        id: 'primary',
        text: 'Fazer Quiz Gratuito',
        icon: 'Sparkles',
        variant: 'primary',
        size: 'lg'
      },
      {
        id: 'secondary',
        text: 'Ver Exemplos',
        icon: 'Play',
        variant: 'outline',
        size: 'default'
      }
    ],
    features = [
      {
        id: 'f1',
        text: 'Quiz gratuito e personalizado',
        icon: 'CheckCircle',
        highlighted: true
      },
      {
        id: 'f2',
        text: 'Resultado imediato',
        icon: 'Zap'
      },
      {
        id: 'f3',
        text: 'Guia completo em PDF',
        icon: 'Download'
      }
    ],
    urgencyText = '⚡ Mais de 200 mulheres fizeram o quiz hoje!',
    countdown = {
      enabled: true,
      endDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      showDays: false,
      showHours: true,
      showMinutes: true,
      showSeconds: true
    },
    socialProof = {
      enabled: true,
      text: '+15.000 mulheres já descobriram seu estilo',
      avatars: [
        'https://placehold.co/40x40/cccccc/333333?text=A',
        'https://placehold.co/40x40/cccccc/333333?text=B',
        'https://placehold.co/40x40/cccccc/333333?text=C'
      ]
    },
    guarantees = [
      'Gratuito para sempre',
      'Resultado personalizado',
      'Sem spam ou emails chatos'
    ],
    variant = 'standard',
    style = 'gradient',
    animation = 'glow',
    backgroundColor = '#ffffff',
    textColor = '#432818',
    accentColor = '#B89B7A',
    showPricing = false,
    price = 0,
    originalPrice = 97,
    currency = 'R$'
  } = block.properties;

  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  // Countdown logic
  useEffect(() => {
    if (countdown.enabled && countdown.endDate) {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const end = new Date(countdown.endDate!).getTime();
        const distance = end - now;

        if (distance > 0) {
          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          setTimeLeft({ days, hours, minutes, seconds });
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          clearInterval(timer);
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdown.enabled, countdown.endDate]);

  // Animation trigger
  useEffect(() => {
    if (animation !== 'none' && !isEditing) {
      const interval = setInterval(() => {
        setIsAnimating(true);
        setTimeout(() => setIsAnimating(false), 1000);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [animation, isEditing]);

  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ComponentType<any>> = {
      ArrowRight, Zap, Clock, Gift, Shield, Users, Star, CheckCircle,
      TrendingUp, Sparkles, Crown, Play, Download, Phone, MessageCircle,
      Calendar, CreditCard
    };
    return icons[iconName] || ArrowRight;
  };

  const getStyleClasses = () => {
    const baseClasses = 'relative overflow-hidden transition-all duration-300';
    
    switch (style) {
      case 'minimal':
        return `${baseClasses} bg-white border border-gray-200 rounded-lg shadow-sm`;
      case 'bold':
        return `${baseClasses} bg-gradient-to-br from-[#B89B7A] to-[#A68A6A] text-white rounded-xl shadow-lg`;
      case 'gradient':
        return `${baseClasses} bg-gradient-to-br from-white via-[#FAF9F7] to-white border border-[#B89B7A]/20 rounded-xl shadow-lg`;
      case 'outlined':
        return `${baseClasses} bg-white border-2 border-[#B89B7A] rounded-xl shadow-md`;
      case 'glassmorphism':
        return `${baseClasses} bg-white/70 backdrop-blur-lg border border-white/20 rounded-xl shadow-xl`;
      default:
        return `${baseClasses} bg-white rounded-lg shadow-md`;
    }
  };

  const getAnimationClasses = () => {
    if (!isAnimating || isEditing) return '';
    
    switch (animation) {
      case 'pulse':
        return 'animate-pulse';
      case 'bounce':
        return 'animate-bounce';
      case 'glow':
        return 'ring-4 ring-[#B89B7A]/30 ring-opacity-75';
      case 'shake':
        return 'animate-bounce';
      default:
        return '';
    }
  };

  const renderAction = (action: CTAAction, index: number) => {
    const IconComponent = getIcon(action.icon || 'ArrowRight');
    
    return (
      <Button
        key={action.id}
        variant={action.variant || 'primary'}
        size={action.size || 'default'}
        className={`
          ${action.variant === 'primary' ? 'bg-[#B89B7A] hover:bg-[#A68A6A] text-white' : ''}
          ${action.size === 'lg' ? 'px-8 py-4 text-lg' : ''}
          transition-all duration-300 hover:scale-105
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <IconComponent className="w-5 h-5 mr-2" />
        {action.text}
      </Button>
    );
  };

  const renderFeature = (feature: CTAFeature, index: number) => {
    const IconComponent = getIcon(feature.icon || 'CheckCircle');
    
    return (
      <motion.div
        key={feature.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 }}
        className={`flex items-center gap-3 ${
          feature.highlighted ? 'text-[#B89B7A] font-medium' : 'text-gray-600'
        }`}
      >
        <IconComponent className={`w-5 h-5 flex-shrink-0 ${
          feature.highlighted ? 'text-[#B89B7A]' : 'text-green-500'
        }`} />
        <span className="text-sm">{feature.text}</span>
      </motion.div>
    );
  };

  const renderCountdown = () => {
    if (!countdown.enabled) return null;

    const timeUnits = [
      { label: 'Dias', value: timeLeft.days, show: countdown.showDays },
      { label: 'Horas', value: timeLeft.hours, show: countdown.showHours },
      { label: 'Min', value: timeLeft.minutes, show: countdown.showMinutes },
      { label: 'Seg', value: timeLeft.seconds, show: countdown.showSeconds }
    ].filter(unit => unit.show);

    return (
      <div className="flex items-center justify-center gap-2 mb-6">
        <Clock className="w-5 h-5 text-red-500" />
        <span className="text-sm font-medium text-red-600 mr-2">Tempo limitado:</span>
        <div className="flex items-center gap-2">
          {timeUnits.map((unit, index) => (
            <React.Fragment key={unit.label}>
              <div className="text-center">
                <div className="bg-red-500 text-white px-3 py-1 rounded-lg font-bold">
                  {unit.value.toString().padStart(2, '0')}
                </div>
                <div className="text-xs text-gray-500 mt-1">{unit.label}</div>
              </div>
              {index < timeUnits.length - 1 && (
                <span className="text-red-500 font-bold">:</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  const renderSocialProof = () => {
    if (!socialProof.enabled) return null;

    return (
      <div className="flex items-center justify-center gap-3 mb-6">
        {socialProof.avatars && socialProof.avatars.length > 0 && (
          <div className="flex -space-x-2">
            {socialProof.avatars.slice(0, 3).map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt={`Cliente ${index + 1}`}
                className="w-8 h-8 rounded-full border-2 border-white object-cover"
                onError={(e) => {
                  e.currentTarget.src = `https://placehold.co/32x32/cccccc/333333?text=${index + 1}`;
                }}
              />
            ))}
          </div>
        )}
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          {socialProof.text}
        </div>
      </div>
    );
  };

  return (
    <div
      className={`
        py-12 px-4 cursor-pointer transition-all duration-200 w-full
        ${isSelected 
          ? 'outline-2 outline-[#B89B7A] outline-offset-2' 
          : 'hover:shadow-sm'
        }
        ${className}
      `}
      onClick={onClick}
      data-block-id={block.id}
      data-block-type={block.type}
      style={{ backgroundColor, color: textColor }}
    >
      <div className="max-w-4xl mx-auto">
        <Card className={`${getStyleClasses()} ${getAnimationClasses()}`}>
          <CardContent className="p-8 md:p-12 text-center">
            {/* Urgency Banner */}
            {urgencyText && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <Badge className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 text-sm">
                  {urgencyText}
                </Badge>
              </motion.div>
            )}

            {/* Countdown */}
            {renderCountdown()}

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                <InlineEditableText
                  value={title}
                  onSave={(value: string) => handlePropertyChange('title', value)}
                  className="inline-block"
                  placeholder="Título do CTA"
                  tag="h2"
                />
              </h2>
              {subtitle && (
                <p className="text-xl md:text-2xl text-opacity-80 mb-6">
                  <InlineEditableText
                    value={subtitle}
                    onSave={(value: string) => handlePropertyChange('subtitle', value)}
                    className="inline-block"
                    placeholder="Subtítulo do CTA"
                    tag="p"
                  />
                </p>
              )}
              {description && (
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  <InlineEditableText
                    value={description}
                    onSave={(value: string) => handlePropertyChange('description', value)}
                    className="inline-block"
                    placeholder="Descrição do CTA"
                    tag="p"
                  />
                </p>
              )}
            </motion.div>

            {/* Pricing */}
            {showPricing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-8"
              >
                <div className="flex items-center justify-center gap-3 mb-2">
                  {originalPrice && originalPrice > price && (
                    <span className="text-2xl text-gray-500 line-through">
                      {currency} {originalPrice}
                    </span>
                  )}
                  <span className="text-4xl font-bold text-[#B89B7A]">
                    {price === 0 ? 'GRATUITO' : `${currency} ${price}`}
                  </span>
                </div>
                {originalPrice && originalPrice > price && (
                  <Badge className="bg-green-500 text-white">
                    Economize {currency} {originalPrice - price}
                  </Badge>
                )}
              </motion.div>
            )}

            {/* Features */}
            {features && features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-8 max-w-md mx-auto"
              >
                <div className="space-y-4">
                  {features.map((feature, index) => renderFeature(feature, index))}
                </div>
              </motion.div>
            )}

            {/* Social Proof */}
            {renderSocialProof()}

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
            >
              {actions.map((action, index) => renderAction(action, index))}
            </motion.div>

            {/* Guarantees */}
            {guarantees && guarantees.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="border-t pt-6"
              >
                <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
                  {guarantees.map((guarantee, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-500" />
                      {guarantee}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Decorative elements */}
            <div className="absolute top-4 right-4 opacity-10">
              <Sparkles className="w-12 h-12 text-[#B89B7A]" />
            </div>
            <div className="absolute bottom-4 left-4 opacity-10">
              <Crown className="w-10 h-10 text-[#B89B7A]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {isEditing && (
        <div className="mt-8 p-4 bg-[#FAF9F7] border border-[#B89B7A]/20 rounded-md">
          <p className="text-sm text-[#8F7A6A]">
            Modo de edição: {actions.length} ação(ões) • 
            Estilo: {style} • 
            Variante: {variant} • 
            Animação: {animation}
            {countdown.enabled && ' • Timer ativo'}
          </p>
        </div>
      )}
    </div>
  );
};

export default AdvancedCTABlock;
