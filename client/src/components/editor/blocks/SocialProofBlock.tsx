import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { InlineEditableText } from './InlineEditableText';
import { 
  Star, 
  Users, 
  TrendingUp, 
  Heart, 
  MessageCircle,
  ThumbsUp,
  Award,
  CheckCircle,
  Clock,
  MapPin,
  Camera,
  PlayCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { BlockComponentProps } from '@/types/blocks';

interface SocialProofItem {
  id: string;
  type: 'testimonial' | 'review' | 'stat' | 'achievement' | 'live-activity';
  content: {
    name?: string;
    avatar?: string;
    location?: string;
    text?: string;
    rating?: number;
    date?: string;
    verified?: boolean;
    statValue?: number;
    statLabel?: string;
    achievement?: string;
    badgeText?: string;
    activity?: string;
    timeAgo?: string;
    image?: string;
    video?: string;
  };
}

interface SocialProofBlockProps extends BlockComponentProps {
  block: {
    id: string;
    type: 'social-proof';
    properties: {
      title?: string;
      subtitle?: string;
      items?: SocialProofItem[];
      displayMode?: 'grid' | 'carousel' | 'ticker' | 'masonry';
      layout?: 'compact' | 'detailed' | 'minimal';
      showStats?: boolean;
      autoplay?: boolean;
      backgroundColor?: string;
      textColor?: string;
      accentColor?: string;
      animateNumbers?: boolean;
    };
  };
}

const SocialProofBlock: React.FC<SocialProofBlockProps> = ({
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const {
    title = 'Junte-se a Milhares de Mulheres Satisfeitas',
    subtitle = 'Veja o que nossas clientes estão dizendo sobre suas transformações',
    items = [
      {
        id: 'item-1',
        type: 'testimonial',
        content: {
          name: 'Maria Silva',
          avatar: 'https://placehold.co/100x100/cccccc/333333?text=MS',
          location: 'São Paulo, SP',
          text: 'Descobri meu estilo romântico e agora me visto com muito mais confiança! O quiz mudou completamente minha relação com a moda.',
          rating: 5,
          date: '2024-01-15',
          verified: true
        }
      },
      {
        id: 'item-2',
        type: 'review',
        content: {
          name: 'Ana Costa',
          avatar: 'https://placehold.co/100x100/cccccc/333333?text=AC',
          location: 'Rio de Janeiro, RJ',
          text: 'Consultoria incrível! Finalmente entendi meu estilo dramático e como usar peças que realmente me representam.',
          rating: 5,
          date: '2024-01-14',
          verified: true,
          image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/transformation-1.webp'
        }
      },
      {
        id: 'item-3',
        type: 'stat',
        content: {
          statValue: 15000,
          statLabel: 'Mulheres Transformadas',
          badgeText: 'Este Mês'
        }
      },
      {
        id: 'item-4',
        type: 'achievement',
        content: {
          achievement: 'Melhor Consultoria de Estilo 2024',
          badgeText: 'Prêmio Mulher Moderna'
        }
      },
      {
        id: 'item-5',
        type: 'live-activity',
        content: {
          activity: 'Carolina M. acabou de descobrir seu estilo Natural',
          timeAgo: '2 minutos atrás',
          location: 'Belo Horizonte, MG'
        }
      }
    ],
    displayMode = 'grid',
    layout = 'detailed',
    showStats = true,
    autoplay = true,
    backgroundColor = '#ffffff',
    textColor = '#432818',
    accentColor = '#B89B7A',
    animateNumbers = true
  } = block.properties;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [animatedStats, setAnimatedStats] = useState<Record<string, number>>({});

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  // Auto-rotate for carousel mode
  useEffect(() => {
    if (displayMode === 'carousel' && autoplay && !isEditing) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [displayMode, autoplay, items.length, isEditing]);

  // Animate numbers
  useEffect(() => {
    if (animateNumbers) {
      const statsItems = items.filter(item => item.type === 'stat');
      statsItems.forEach(item => {
        if (item.content.statValue) {
          let current = 0;
          const target = item.content.statValue;
          const increment = target / 100;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            setAnimatedStats(prev => ({
              ...prev,
              [item.id]: Math.floor(current)
            }));
          }, 20);
        }
      });
    }
  }, [items, animateNumbers]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
      />
    ));
  };

  const renderSocialProofItem = (item: SocialProofItem, index: number) => {
    const { type, content } = item;

    switch (type) {
      case 'testimonial':
      case 'review':
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`h-full transition-all duration-300 hover:shadow-lg ${
              layout === 'compact' ? 'p-4' : 'p-6'
            }`}>
              <CardContent className="p-0 space-y-4">
                {/* Header with avatar and info */}
                <div className="flex items-start gap-3">
                  <Avatar className={layout === 'compact' ? 'w-10 h-10' : 'w-12 h-12'}>
                    <AvatarImage src={content.avatar} alt={content.name} />
                    <AvatarFallback>
                      {content.name?.split(' ').map(n => n[0]).join('') || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900 truncate">
                        {content.name}
                      </h4>
                      {content.verified && (
                        <CheckCircle className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      )}
                    </div>
                    {content.location && (
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="w-3 h-3" />
                        {content.location}
                      </div>
                    )}
                    {content.rating && (
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center gap-1">
                          {renderStars(content.rating)}
                        </div>
                        {layout !== 'compact' && (
                          <span className="text-sm text-gray-600">
                            {content.rating}/5
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                  {content.date && layout === 'detailed' && (
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="w-3 h-3" />
                      {new Date(content.date).toLocaleDateString('pt-BR')}
                    </div>
                  )}
                </div>

                {/* Content */}
                {content.text && (
                  <blockquote className={`italic text-gray-700 leading-relaxed ${
                    layout === 'compact' ? 'text-sm' : 'text-base'
                  }`}>
                    "{content.text}"
                  </blockquote>
                )}

                {/* Media */}
                {content.image && layout !== 'compact' && (
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src={content.image}
                      alt="Transformação"
                      className="w-full h-32 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                  </div>
                )}

                {content.video && layout !== 'compact' && (
                  <div className="relative rounded-lg overflow-hidden bg-gray-100 h-32 flex items-center justify-center cursor-pointer hover:bg-gray-200 transition-colors">
                    <PlayCircle className="w-12 h-12 text-gray-600" />
                    <span className="absolute bottom-2 right-2 text-xs bg-black/70 text-white px-2 py-1 rounded">
                      Vídeo
                    </span>
                  </div>
                )}

                {/* Interaction metrics */}
                {layout === 'detailed' && (
                  <div className="flex items-center gap-4 text-sm text-gray-500 pt-2 border-t">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-3 h-3" />
                      {Math.floor(Math.random() * 50) + 10}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle className="w-3 h-3" />
                      {Math.floor(Math.random() * 20) + 5}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {Math.floor(Math.random() * 30) + 15}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );

      case 'stat':
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full bg-gradient-to-br from-[#B89B7A] to-[#A68A6A] text-white">
              <CardContent className="p-6 text-center">
                <div className="space-y-2">
                  <TrendingUp className="w-8 h-8 mx-auto opacity-80" />
                  <div className="text-3xl font-bold">
                    {animateNumbers 
                      ? (animatedStats[item.id] || 0).toLocaleString('pt-BR')
                      : content.statValue?.toLocaleString('pt-BR') || '0'
                    }
                    {content.statValue && content.statValue >= 1000 && '+'}
                  </div>
                  <div className="text-sm opacity-90">
                    {content.statLabel}
                  </div>
                  {content.badgeText && (
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      {content.badgeText}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      case 'achievement':
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="h-full bg-gradient-to-br from-yellow-100 to-yellow-200 border-yellow-300">
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 mx-auto text-yellow-600 mb-3" />
                <h3 className="font-bold text-gray-900 mb-2">
                  {content.achievement}
                </h3>
                {content.badgeText && (
                  <Badge className="bg-yellow-500 text-white">
                    {content.badgeText}
                  </Badge>
                )}
              </CardContent>
            </Card>
          </motion.div>
        );

      case 'live-activity':
        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full mt-2 animate-pulse" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      {content.activity}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                      <Clock className="w-3 h-3" />
                      {content.timeAgo}
                      {content.location && (
                        <>
                          <span>•</span>
                          <MapPin className="w-3 h-3" />
                          {content.location}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );

      default:
        return null;
    }
  };

  if (!items || items.length === 0) {
    return (
      <div
        className={`
          bg-gray-100 p-8 rounded-lg text-gray-500 flex flex-col items-center justify-center min-h-[400px] cursor-pointer transition-all duration-200
          ${isSelected 
            ? 'outline-2 outline-[#B89B7A] outline-offset-2' 
            : 'hover:shadow-sm'
          }
          ${className}
        `}
        onClick={onClick}
        data-block-id={block.id}
        data-block-type={block.type}
      >
        <Users className="w-16 h-16 mb-4 opacity-50" />
        <p className="text-center text-lg font-medium mb-2">Nenhuma prova social configurada</p>
        <p className="text-center">Configure depoimentos e estatísticas no painel de propriedades.</p>
      </div>
    );
  }

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
      {/* Header */}
      {title && (
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <InlineEditableText
              value={title}
              onSave={(value: string) => handlePropertyChange('title', value)}
              className="inline-block"
              placeholder="Título da prova social"
              tag="h2"
            />
          </h2>
          {subtitle && (
            <p className="text-lg text-opacity-80 max-w-3xl mx-auto">
              <InlineEditableText
                value={subtitle}
                onSave={(value: string) => handlePropertyChange('subtitle', value)}
                className="inline-block"
                placeholder="Subtítulo da prova social"
                tag="p"
              />
            </p>
          )}
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {displayMode === 'carousel' ? (
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl mx-auto"
              >
                {renderSocialProofItem(items[currentIndex], 0)}
              </motion.div>
            </AnimatePresence>

            {/* Pagination dots */}
            <div className="flex justify-center gap-2 mt-6">
              {items.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex 
                      ? 'bg-[#B89B7A] scale-110' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                  }}
                  disabled={isEditing}
                />
              ))}
            </div>
          </div>
        ) : displayMode === 'ticker' ? (
          <div className="overflow-hidden">
            <motion.div
              animate={{ x: ['100%', '-100%'] }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: 'linear' 
              }}
              className="flex gap-6 whitespace-nowrap"
            >
              {items.map((item, index) => (
                <div key={item.id} className="flex-shrink-0 w-80">
                  {renderSocialProofItem(item, index)}
                </div>
              ))}
            </motion.div>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            displayMode === 'masonry' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
              : layout === 'compact'
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
            {items.map((item, index) => renderSocialProofItem(item, index))}
          </div>
        )}
      </div>

      {isEditing && (
        <div className="mt-8 p-4 bg-[#FAF9F7] border border-[#B89B7A]/20 rounded-md">
          <p className="text-sm text-[#8F7A6A]">
            Modo de edição: {items.length} item(s) • 
            Exibição: {displayMode} • 
            Layout: {layout}
            {displayMode === 'carousel' && ` • Slide atual: ${currentIndex + 1}`}
          </p>
        </div>
      )}
    </div>
  );
};

export default SocialProofBlock;
