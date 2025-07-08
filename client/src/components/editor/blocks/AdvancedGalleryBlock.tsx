import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InlineEditableText } from './InlineEditableText';
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  ZoomIn, 
  Download,
  Share2,
  Heart,
  Eye,
  Grid3X3,
  Maximize2,
  Filter,
  Search
} from 'lucide-react';
import type { BlockComponentProps } from '@/types/blocks';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  description?: string;
  category?: string;
  tags?: string[];
  featured?: boolean;
  likes?: number;
  views?: number;
  author?: string;
  date?: string;
}

interface AdvancedGalleryBlockProps extends BlockComponentProps {
  block: {
    id: string;
    type: 'advanced-gallery';
    properties: {
      title?: string;
      subtitle?: string;
      images?: GalleryImage[];
      layout?: 'masonry' | 'grid' | 'carousel' | 'justified';
      columns?: number;
      showCategories?: boolean;
      showSearch?: boolean;
      showStats?: boolean;
      allowLightbox?: boolean;
      autoplay?: boolean;
      autoplayDelay?: number;
      backgroundColor?: string;
      overlayStyle?: 'gradient' | 'solid' | 'blur';
      hoverEffect?: 'zoom' | 'lift' | 'fade' | 'slide';
    };
  };
}

const AdvancedGalleryBlock: React.FC<AdvancedGalleryBlockProps> = ({
  block,
  isSelected = false,
  isEditing = false,
  onClick,
  onPropertyChange,
  className = ''
}) => {
  const {
    title = 'Galeria de Transformações',
    subtitle = 'Veja as incríveis transformações de estilo das nossas clientes',
    images = [
      {
        id: 'img-1',
        src: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744920983/transformation-1.webp',
        alt: 'Transformação Maria Silva',
        title: 'Maria Silva - Estilo Romântico',
        description: 'De básico para encantador: Maria descobriu seu lado romântico',
        category: 'Romântico',
        tags: ['antes-depois', 'romântico', 'transformação'],
        featured: true,
        likes: 127,
        views: 1834,
        author: 'Consultora Ana',
        date: '2024-01-15'
      },
      {
        id: 'img-2',
        src: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744920984/transformation-2.webp',
        alt: 'Transformação Julia Santos',
        title: 'Julia Santos - Estilo Elegante',
        description: 'Elegância atemporal: Julia encontrou seu estilo clássico',
        category: 'Elegante',
        tags: ['elegante', 'clássico', 'profissional'],
        featured: false,
        likes: 98,
        views: 1245,
        author: 'Consultora Ana',
        date: '2024-01-12'
      },
      {
        id: 'img-3',
        src: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744920985/transformation-3.webp',
        alt: 'Transformação Carla Mendes',
        title: 'Carla Mendes - Estilo Natural',
        description: 'Autenticidade em primeiro lugar: Carla abraçou sua essência',
        category: 'Natural',
        tags: ['natural', 'autêntico', 'casual'],
        featured: false,
        likes: 156,
        views: 2341,
        author: 'Consultora Ana',
        date: '2024-01-10'
      }
    ],
    layout = 'masonry',
    columns = 3,
    showCategories = true,
    showSearch = true,
    showStats = true,
    allowLightbox = true,
    autoplay = false,
    autoplayDelay = 5000,
    backgroundColor = '#ffffff',
    overlayStyle = 'gradient',
    hoverEffect = 'zoom'
  } = block.properties;

  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [likedImages, setLikedImages] = useState<Set<string>>(new Set());
  const autoplayRef = useRef<NodeJS.Timeout>();

  // Get unique categories
  const categories = ['all', ...new Set(images.map(img => img.category).filter(Boolean))];

  // Filter images
  const filteredImages = images.filter(img => {
    const matchesSearch = img.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         img.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         img.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || img.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handlePropertyChange = (key: string, value: any) => {
    if (onPropertyChange) {
      onPropertyChange(key, value);
    }
  };

  const openLightbox = (image: GalleryImage) => {
    if (allowLightbox && !isEditing) {
      setSelectedImage(image);
      setLightboxIndex(filteredImages.findIndex(img => img.id === image.id));
    }
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage) {
      const nextIndex = (lightboxIndex + 1) % filteredImages.length;
      setLightboxIndex(nextIndex);
      setSelectedImage(filteredImages[nextIndex]);
    }
  };

  const prevImage = () => {
    if (selectedImage) {
      const prevIndex = (lightboxIndex - 1 + filteredImages.length) % filteredImages.length;
      setLightboxIndex(prevIndex);
      setSelectedImage(filteredImages[prevIndex]);
    }
  };

  const toggleLike = (imageId: string) => {
    setLikedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(imageId)) {
        newSet.delete(imageId);
      } else {
        newSet.add(imageId);
      }
      return newSet;
    });
  };

  // Autoplay effect for carousel
  useEffect(() => {
    if (layout === 'carousel' && autoplay && !isEditing && filteredImages.length > 1) {
      autoplayRef.current = setInterval(() => {
        setLightboxIndex(prev => (prev + 1) % filteredImages.length);
      }, autoplayDelay);
    }
    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [layout, autoplay, autoplayDelay, filteredImages.length, isEditing]);

  const getLayoutClasses = () => {
    switch (layout) {
      case 'grid':
        return `grid grid-cols-1 md:grid-cols-${Math.min(columns, 4)} gap-6`;
      case 'masonry':
        return 'columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6';
      case 'justified':
        return 'flex flex-wrap gap-4 justify-center';
      case 'carousel':
        return 'flex overflow-x-auto gap-6 pb-4 snap-x snap-mandatory';
      default:
        return `grid grid-cols-1 md:grid-cols-${Math.min(columns, 4)} gap-6`;
    }
  };

  const getHoverEffectClasses = () => {
    switch (hoverEffect) {
      case 'zoom':
        return 'hover:scale-105 transform transition-transform duration-300';
      case 'lift':
        return 'hover:-translate-y-2 hover:shadow-xl transition-all duration-300';
      case 'fade':
        return 'hover:opacity-90 transition-opacity duration-300';
      case 'slide':
        return 'overflow-hidden';
      default:
        return 'hover:scale-105 transform transition-transform duration-300';
    }
  };

  const getOverlayClasses = () => {
    switch (overlayStyle) {
      case 'gradient':
        return 'bg-gradient-to-t from-black/60 via-transparent to-transparent';
      case 'solid':
        return 'bg-black/40';
      case 'blur':
        return 'backdrop-blur-sm bg-white/10';
      default:
        return 'bg-gradient-to-t from-black/60 via-transparent to-transparent';
    }
  };

  const renderImage = (image: GalleryImage, index: number) => {
    const isLiked = likedImages.has(image.id);
    
    return (
      <motion.div
        key={image.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className={cn(
          'relative group cursor-pointer overflow-hidden rounded-lg',
          layout === 'carousel' && 'flex-shrink-0 w-80 snap-center',
          layout === 'masonry' && 'break-inside-avoid',
          getHoverEffectClasses()
        )}
        onClick={(e) => {
          e.stopPropagation();
          openLightbox(image);
        }}
      >
        <div className="relative">
          <img
            src={image.src}
            alt={image.alt}
            className={cn(
              'w-full h-auto object-cover',
              layout === 'grid' && 'aspect-square',
              layout === 'carousel' && 'aspect-[4/5]',
              hoverEffect === 'slide' && 'group-hover:scale-110 transition-transform duration-500'
            )}
            onError={(e) => {
              e.currentTarget.src = 'https://placehold.co/400x500/cccccc/333333?text=Imagem+Indisponível';
            }}
          />

          {/* Overlay */}
          <div className={cn(
            'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300',
            getOverlayClasses()
          )}>
            {/* Action buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              <Button
                size="sm"
                variant="secondary"
                className="h-8 w-8 p-0 bg-white/80 hover:bg-white"
                onClick={(e) => {
                  e.stopPropagation();
                  openLightbox(image);
                }}
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              
              <Button
                size="sm"
                variant="secondary"
                className={cn(
                  'h-8 w-8 p-0 transition-colors',
                  isLiked 
                    ? 'bg-red-500 text-white hover:bg-red-600' 
                    : 'bg-white/80 hover:bg-white'
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleLike(image.id);
                }}
              >
                <Heart className={cn('w-4 h-4', isLiked && 'fill-current')} />
              </Button>
            </div>

            {/* Category badge */}
            {image.category && (
              <div className="absolute top-4 left-4">
                <Badge 
                  variant="secondary" 
                  className="bg-white/90 text-gray-800"
                >
                  {image.category}
                </Badge>
              </div>
            )}

            {/* Featured badge */}
            {image.featured && (
              <div className="absolute top-12 left-4">
                <Badge 
                  variant="secondary" 
                  className="bg-yellow-500 text-white"
                >
                  ✨ Destaque
                </Badge>
              </div>
            )}

            {/* Content overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              {image.title && (
                <h3 className="font-semibold text-lg mb-1 line-clamp-2">
                  {image.title}
                </h3>
              )}
              
              {image.description && (
                <p className="text-sm opacity-90 line-clamp-2 mb-2">
                  {image.description}
                </p>
              )}

              {/* Stats */}
              {showStats && (
                <div className="flex items-center gap-4 text-xs opacity-80">
                  {image.likes && (
                    <div className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {image.likes}
                    </div>
                  )}
                  {image.views && (
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {image.views}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  if (!images || images.length === 0) {
    return (
      <div
        className={cn(
          'bg-gray-100 p-8 rounded-lg text-gray-500 flex flex-col items-center justify-center min-h-[400px] cursor-pointer transition-all duration-200',
          isSelected 
            ? 'outline-2 outline-[#B89B7A] outline-offset-2' 
            : 'hover:shadow-sm',
          className
        )}
        onClick={onClick}
        data-block-id={block.id}
        data-block-type={block.type}
      >
        <Grid3X3 className="w-12 h-12 mb-4 opacity-50" />
        <p className="text-center">Configure as imagens da galeria no painel de propriedades.</p>
      </div>
    );
  }

  return (
    <>
      <div
        className={cn(
          'py-12 px-4 cursor-pointer transition-all duration-200',
          isSelected 
            ? 'outline-2 outline-[#B89B7A] outline-offset-2' 
            : 'hover:shadow-sm',
          className
        )}
        onClick={onClick}
        data-block-id={block.id}
        data-block-type={block.type}
        style={{ backgroundColor }}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          {title && (
            <div className="text-center mb-8">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-[#432818] mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <InlineEditableText
                  value={title}
                  onSave={(value: string) => handlePropertyChange('title', value)}
                  className="inline-block"
                  placeholder="Título da galeria"
                  tag="span"
                />
              </motion.h2>
              
              {subtitle && (
                <motion.p 
                  className="text-lg text-[#8F7A6A] max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <InlineEditableText
                    value={subtitle}
                    onSave={(value: string) => handlePropertyChange('subtitle', value)}
                    className="inline-block"
                    placeholder="Subtítulo da galeria"
                    tag="span"
                  />
                </motion.p>
              )}
            </div>
          )}

          {/* Filters */}
          {(showSearch || showCategories) && (
            <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
              {showSearch && (
                <div className="relative max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar imagens..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              )}

              {showCategories && categories.length > 1 && (
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <Filter className="w-4 h-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todas as categorias</SelectItem>
                    {categories.slice(1).map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            </div>
          )}

          {/* Gallery */}
          <div className={getLayoutClasses()}>
            {filteredImages.map((image, index) => renderImage(image, index))}
          </div>

          {/* Empty state */}
          {filteredImages.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">Nenhuma imagem encontrada com os filtros aplicados.</p>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && allowLightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-5xl max-h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.src}
                alt={selectedImage.alt}
                className="max-w-full max-h-full object-contain"
              />

              {/* Navigation */}
              <Button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30"
                onClick={prevImage}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>

              <Button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30"
                onClick={nextImage}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>

              {/* Close button */}
              <Button
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/30"
                onClick={closeLightbox}
              >
                <X className="w-6 h-6" />
              </Button>

              {/* Image info */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <Card className="bg-black/50 backdrop-blur-sm border-white/20">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-white">
                      {selectedImage.title}
                    </h3>
                    {selectedImage.description && (
                      <p className="text-sm text-gray-200 mb-2">
                        {selectedImage.description}
                      </p>
                    )}
                    <div className="flex items-center justify-between text-xs text-gray-300">
                      <span>{lightboxIndex + 1} de {filteredImages.length}</span>
                      {selectedImage.author && (
                        <span>Por {selectedImage.author}</span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Debug info */}
      {isEditing && (
        <motion.div 
          className="mt-8 p-4 bg-[#FAF9F7] border border-[#B89B7A]/20 rounded-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-sm text-[#8F7A6A]">
            Modo de edição: {filteredImages.length}/{images.length} imagens • 
            Layout: {layout} • 
            Curtidas: {likedImages.size} • 
            Busca: "{searchTerm}" • 
            Categoria: {selectedCategory}
          </p>
        </motion.div>
      )}
    </>
  );
};

export default AdvancedGalleryBlock;
