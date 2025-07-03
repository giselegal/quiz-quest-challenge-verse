import React, { useState, useCallback, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, Copy, Trash2, Move, Eye, EyeOff,
  ArrowLeft, ArrowRight, MoreVertical
} from 'lucide-react';
import { QuizFunnel } from '@/interfaces/quiz';
import { ComponentInstance } from '@/interfaces/editor';
import styles from '@/styles/editor.module.css';

// Import component renderers
import QuizTitle from '@/components/quiz/components/QuizTitle';
import QuizSubtitle from '@/components/quiz/components/QuizSubtitle';
import QuizParagraph from '@/components/quiz/components/QuizParagraph';
import QuizImage from '@/components/quiz/components/QuizImage';
import QuizButton from '@/components/quiz/components/QuizButton';
import QuizSpacer from '@/components/quiz/components/QuizSpacer';
import QuizProgress from '@/components/quiz/components/QuizProgress';
import QuizInput from '@/components/quiz/components/QuizInput';
import QuizOptions from '@/components/quiz/components/QuizOptions';
import QuizVideo from '@/components/quiz/components/QuizVideo';
import QuizTestimonial from '@/components/quiz/components/QuizTestimonial';
import QuizPrice from '@/components/quiz/components/QuizPrice';
import QuizCountdown from '@/components/quiz/components/QuizCountdown';
import QuizGuarantee from '@/components/quiz/components/QuizGuarantee';
import QuizBonus from '@/components/quiz/components/QuizBonus';
import QuizFAQ from '@/components/quiz/components/QuizFAQ';
import QuizSocialProof from '@/components/quiz/components/QuizSocialProof';
import QuizEmail from '@/components/quiz/components/QuizEmail';
import QuizPhone from '@/components/quiz/components/QuizPhone';

interface PageEditorCanvasProps {
  funnel: QuizFunnel;
  deviceView: 'desktop' | 'tablet' | 'mobile';
  selectedComponent: ComponentInstance | null;
  onComponentSelect: (component: ComponentInstance | null) => void;
  onFunnelUpdate: (funnel: QuizFunnel) => void;
  isDragging: boolean;
}

// Component renderer mapping
const ComponentRenderers = {
  title: QuizTitle,
  subtitle: QuizSubtitle,
  paragraph: QuizParagraph,
  image: QuizImage,
  button: QuizButton,
  spacer: QuizSpacer,
  progress: QuizProgress,
  input: QuizInput,
  email: QuizEmail,
  phone: QuizPhone,
  'quiz-options': QuizOptions,
  video: QuizVideo,
  testimonial: QuizTestimonial,
  price: QuizPrice,
  countdown: QuizCountdown,
  guarantee: QuizGuarantee,
  bonus: QuizBonus,
  faq: QuizFAQ,
  'social-proof': QuizSocialProof,
};

const PageEditorCanvas: React.FC<PageEditorCanvasProps> = ({
  funnel,
  deviceView,
  selectedComponent,
  onComponentSelect,
  onFunnelUpdate,
  isDragging,
}) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);

  // Mock pages for now - in real implementation, these would come from funnel
  const pages = [
    {
      id: 'intro',
      name: 'Introdução',
      type: 'intro' as const,
      components: [],
    },
    {
      id: 'question1',
      name: 'Pergunta 1',
      type: 'question' as const,
      components: [],
    },
    {
      id: 'result',
      name: 'Resultado',
      type: 'result' as const,
      components: [],
    },
  ];

  const currentPage = pages[currentPageIndex];

  // Get device-specific classes
  const getDeviceClasses = () => {
    switch (deviceView) {
      case 'mobile':
        return styles.mobilePreview;
      case 'tablet':
        return styles.tabletPreview;
      default:
        return styles.desktopPreview;
    }
  };

  // Handle component drop
  const handleDrop = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(null);

    try {
      const componentData = e.dataTransfer.getData('component');
      if (!componentData) return;

      const component = JSON.parse(componentData);
      const newComponent: ComponentInstance = {
        id: `${component.id}_${Date.now()}`,
        componentId: component.id,
        props: { ...component.defaultProps },
        order: index,
      };

      // Add component to current page
      const updatedPages = [...pages];
      const updatedComponents = [...currentPage.components];
      updatedComponents.splice(index, 0, newComponent);
      
      updatedPages[currentPageIndex] = {
        ...currentPage,
        components: updatedComponents,
      };

      // Update funnel with new pages
      onFunnelUpdate({
        ...funnel,
        // Add pages to funnel structure when implemented
      });

      // Select the new component
      onComponentSelect(newComponent);
    } catch (error) {
      console.error('Error dropping component:', error);
    }
  }, [currentPage, currentPageIndex, pages, funnel, onFunnelUpdate, onComponentSelect]);

  // Handle drag over
  const handleDragOver = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setDragOverIndex(index);
  }, []);

  // Handle drag leave
  const handleDragLeave = useCallback(() => {
    setDragOverIndex(null);
  }, []);

  // Render component
  const renderComponent = useCallback((component: ComponentInstance) => {
    const Renderer = ComponentRenderers[component.componentId as keyof typeof ComponentRenderers];
    
    if (!Renderer) {
      return (
        <div className="p-4 border border-red-300 bg-red-50 rounded">
          <p className="text-red-600">Componente não encontrado: {component.componentId}</p>
        </div>
      );
    }

    return <Renderer {...component.props} />;
  }, []);

  // Handle component actions
  const handleDuplicateComponent = useCallback((component: ComponentInstance) => {
    const duplicatedComponent: ComponentInstance = {
      ...component,
      id: `${component.componentId}_${Date.now()}`,
      order: component.order + 1,
    };

    const updatedComponents = [...currentPage.components];
    const insertIndex = updatedComponents.findIndex(c => c.id === component.id) + 1;
    updatedComponents.splice(insertIndex, 0, duplicatedComponent);

    // Update page and funnel
    const updatedPages = [...pages];
    updatedPages[currentPageIndex] = {
      ...currentPage,
      components: updatedComponents,
    };

    onFunnelUpdate({
      ...funnel,
      // Update funnel pages
    });
  }, [currentPage, currentPageIndex, pages, funnel, onFunnelUpdate]);

  const handleDeleteComponent = useCallback((componentId: string) => {
    const updatedComponents = currentPage.components.filter(c => c.id !== componentId);
    
    const updatedPages = [...pages];
    updatedPages[currentPageIndex] = {
      ...currentPage,
      components: updatedComponents,
    };

    onFunnelUpdate({
      ...funnel,
      // Update funnel pages
    });

    // Clear selection if deleted component was selected
    if (selectedComponent?.id === componentId) {
      onComponentSelect(null);
    }
  }, [currentPage, currentPageIndex, pages, funnel, onFunnelUpdate, selectedComponent, onComponentSelect]);

  return (
    <div className={styles.centerArea}>
      {/* Page Navigation */}
      <div className="flex items-center justify-between p-4 border-b bg-white">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPageIndex(Math.max(0, currentPageIndex - 1))}
            disabled={currentPageIndex === 0}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Anterior
          </Button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Página:</span>
            <select
              value={currentPageIndex}
              onChange={(e) => setCurrentPageIndex(Number(e.target.value))}
              className="px-2 py-1 border border-gray-300 rounded text-sm"
            >
              {pages.map((page, index) => (
                <option key={page.id} value={index}>
                  {index + 1}. {page.name}
                </option>
              ))}
            </select>
            <span className="text-sm text-gray-500">
              de {pages.length}
            </span>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentPageIndex(Math.min(pages.length - 1, currentPageIndex + 1))}
            disabled={currentPageIndex === pages.length - 1}
          >
            Próxima
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="secondary">
            {currentPage.type}
          </Badge>
          <Button variant="ghost" size="sm">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Canvas Area */}
      <ScrollArea className="flex-1">
        <div className={styles.canvasArea}>
          <div 
            ref={canvasRef}
            className={`${styles.canvasContainer} ${getDeviceClasses()}`}
          >
            {/* Empty state */}
            {currentPage.components.length === 0 && (
              <div
                className={`${styles.dropZone} ${dragOverIndex === 0 ? styles.active : ''}`}
                onDrop={(e) => handleDrop(e, 0)}
                onDragOver={(e) => handleDragOver(e, 0)}
                onDragLeave={handleDragLeave}
                style={{ minHeight: '300px' }}
              >
                <div className="text-center py-12">
                  <Plus className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    Página Vazia
                  </h3>
                  <p className="text-gray-500 mb-4">
                    Arraste componentes da barra lateral para começar a criar sua página
                  </p>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Componente
                  </Button>
                </div>
              </div>
            )}

            {/* Components */}
            {currentPage.components.map((component, index) => (
              <React.Fragment key={component.id}>
                {/* Drop zone before component */}
                <div
                  className={`${styles.dropZone} ${dragOverIndex === index ? styles.active : ''}`}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDragLeave={handleDragLeave}
                />

                {/* Component wrapper */}
                <div
                  className={`relative group ${
                    selectedComponent?.id === component.id ? 'ring-2 ring-blue-500 ring-offset-2' : ''
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onComponentSelect(component);
                  }}
                >
                  {/* Component content */}
                  <div className="relative">
                    {renderComponent(component)}
                  </div>

                  {/* Component controls overlay */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-1 bg-white border border-gray-200 rounded shadow-sm">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle move up
                        }}
                        className="h-6 w-6 p-0"
                      >
                        <Move className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDuplicateComponent(component);
                        }}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteComponent(component.id);
                        }}
                        className="h-6 w-6 p-0 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>

                  {/* Selection indicator */}
                  {selectedComponent?.id === component.id && (
                    <div className="absolute -top-6 left-0">
                      <Badge variant="default" className="text-xs">
                        {component.componentId}
                      </Badge>
                    </div>
                  )}
                </div>
              </React.Fragment>
            ))}

            {/* Final drop zone */}
            {currentPage.components.length > 0 && (
              <div
                className={`${styles.dropZone} ${dragOverIndex === currentPage.components.length ? styles.active : ''}`}
                onDrop={(e) => handleDrop(e, currentPage.components.length)}
                onDragOver={(e) => handleDragOver(e, currentPage.components.length)}
                onDragLeave={handleDragLeave}
              />
            )}
          </div>
        </div>
      </ScrollArea>

      {/* Page Actions */}
      <div className="flex items-center justify-between p-4 border-t bg-gray-50">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Nova Página
          </Button>
          <Button variant="ghost" size="sm">
            <Copy className="h-4 w-4 mr-2" />
            Duplicar
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">
            {currentPage.components.length} componente{currentPage.components.length !== 1 ? 's' : ''}
          </span>
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PageEditorCanvas;
