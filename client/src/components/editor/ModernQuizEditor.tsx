import React, { useState, useCallback, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Save, Eye, Monitor, Tablet, Smartphone, Settings, 
  FileText, History, FolderOpen, Play, Undo, Redo,
  Copy, Download, Upload, ArrowLeft
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Components
import { ComponentList, PageEditorCanvas } from './';
import { PropertiesPanel, ConfigPanel, FunnelManagementPanel, VersioningPanel } from './panels';

// Hooks
import { useFunnelManager } from '@/hooks/useFunnelManager';
import { useVersionManager } from '@/hooks/useVersionManager';

// Interfaces
import { QuizFunnel, QuizConfig, SimpleComponent } from '@/interfaces/quiz';
import { EditorComponent } from '@/interfaces/editor';

// Styles
import styles from '@/styles/editor.module.css';

interface ModernQuizEditorProps {
  initialFunnel?: QuizFunnel;
  onSave?: (funnel: QuizFunnel) => void;
  onPreview?: (funnel: QuizFunnel) => void;
  onExit?: () => void;
}

const ModernQuizEditor: React.FC<ModernQuizEditorProps> = ({
  initialFunnel,
  onSave,
  onPreview,
  onExit,
}) => {
  // State
  const [activeTab, setActiveTab] = useState<string>('editor');
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedComponent, setSelectedComponent] = useState<SimpleComponent | null>(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Hooks
  const funnelManager = useFunnelManager();
  const versionManager = useVersionManager(funnelManager.activeFunnelId || undefined);

  // Get current funnel
  const currentFunnel = funnelManager.getActiveFunnel() || initialFunnel;

  // Auto-save effect
  useEffect(() => {
    if (currentFunnel && funnelManager.activeFunnelId) {
      const autoSaveTimer = setTimeout(() => {
        funnelManager.updateFunnel(funnelManager.activeFunnelId!, currentFunnel);
      }, 2000);

      return () => clearTimeout(autoSaveTimer);
    }
  }, [currentFunnel, funnelManager]);

  // Handlers
  const handleSave = useCallback(async () => {
    if (!currentFunnel) return;

    try {
      if (funnelManager.activeFunnelId) {
        funnelManager.updateFunnel(funnelManager.activeFunnelId, currentFunnel);
      }
      
      // Create version
      await versionManager.createVersion(
        currentFunnel,
        `Versão ${new Date().toLocaleString()}`,
        'Salvamento manual'
      );
      
      onSave?.(currentFunnel);
      toast({
        title: 'Funnel Salvo',
        description: 'Suas alterações foram salvas com sucesso.',
      });
    } catch (error) {
      toast({
        title: 'Erro ao Salvar',
        description: 'Houve um problema ao salvar o funnel.',
        variant: 'destructive',
      });
    }
  }, [currentFunnel, funnelManager, versionManager, onSave]);

  const handlePreview = useCallback(() => {
    if (!currentFunnel) return;
    
    setIsPreviewMode(true);
    onPreview?.(currentFunnel);
  }, [currentFunnel, onPreview]);

  const handleDeviceChange = useCallback((device: 'desktop' | 'tablet' | 'mobile') => {
    setDeviceView(device);
  }, []);

  const handleComponentSelect = useCallback((component: SimpleComponent | null) => {
    setSelectedComponent(component);
  }, []);

  const handleDragStart = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleDragEnd = useCallback((result: any) => {
    setIsDragging(false);
    
    if (!result.destination || !currentFunnel) return;

    // Handle component reordering logic here
    console.log('Drag ended:', result);
  }, [currentFunnel]);

  const handleConfigUpdate = useCallback((updates: Partial<QuizConfig>) => {
    if (!currentFunnel || !funnelManager.activeFunnelId) return;

    const updatedFunnel = {
      ...currentFunnel,
      config: { ...currentFunnel.config, ...updates },
      updatedAt: new Date(),
    };

    funnelManager.updateFunnel(funnelManager.activeFunnelId, updatedFunnel);
  }, [currentFunnel, funnelManager]);

  const handleConfigSectionUpdate = useCallback(<K extends keyof QuizConfig>(
    section: K,
    updates: Partial<QuizConfig[K]>
  ) => {
    if (!currentFunnel || !funnelManager.activeFunnelId) return;

    const updatedConfig = {
      ...currentFunnel.config,
      [section]: { ...currentFunnel.config[section], ...updates },
    };

    const updatedFunnel = {
      ...currentFunnel,
      config: updatedConfig,
      updatedAt: new Date(),
    };

    funnelManager.updateFunnel(funnelManager.activeFunnelId, updatedFunnel);
  }, [currentFunnel, funnelManager]);

  if (!currentFunnel) {
    return (
      <div className={styles.editorContainer}>
        <div className="flex items-center justify-center h-full">
          <Card className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Bem-vindo ao Editor de Quiz</h2>
            <p className="text-gray-600 mb-6">
              Crie um novo funil ou carregue um existente para começar.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => funnelManager.createFunnel('Novo Funil', 'Descrição do funil')}>
                Criar Novo Funil
              </Button>
              <Button variant="outline" onClick={() => setActiveTab('funnels')}>
                Carregar Funil
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <DragDropContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className={styles.editorContainer}>
        {/* Header */}
        <header className={styles.editorHeader}>
          <div className="flex items-center gap-4">
            {onExit && (
              <Button variant="ghost" size="sm" onClick={onExit}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            )}
            <h1 className={styles.editorTitle}>{currentFunnel.name}</h1>
          </div>

          <div className="flex items-center gap-2">
            {/* Device Preview Modes */}
            <div className={styles.previewModes}>
              <Button
                variant={deviceView === 'desktop' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleDeviceChange('desktop')}
                className={styles.previewModeButton}
              >
                <Monitor className="h-4 w-4" />
              </Button>
              <Button
                variant={deviceView === 'tablet' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleDeviceChange('tablet')}
                className={styles.previewModeButton}
              >
                <Tablet className="h-4 w-4" />
              </Button>
              <Button
                variant={deviceView === 'mobile' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => handleDeviceChange('mobile')}
                className={styles.previewModeButton}
              >
                <Smartphone className="h-4 w-4" />
              </Button>
            </div>

            {/* Action Buttons */}
            <Button variant="ghost" size="sm">
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Redo className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handlePreview}>
              <Play className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-2" />
              Salvar
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Navigation */}
          <div className={styles.leftPanel}>
            <div className={styles.leftPanelHeader}>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="editor" className="text-xs">
                    <FileText className="h-3 w-3" />
                  </TabsTrigger>
                  <TabsTrigger value="funnels" className="text-xs">
                    <FolderOpen className="h-3 w-3" />
                  </TabsTrigger>
                  <TabsTrigger value="history" className="text-xs">
                    <History className="h-3 w-3" />
                  </TabsTrigger>
                  <TabsTrigger value="config" className="text-xs">
                    <Settings className="h-3 w-3" />
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="text-xs">
                    <Eye className="h-3 w-3" />
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className={styles.leftPanelContent}>
              <Tabs value={activeTab} className="w-full h-full">
                <TabsContent value="editor" className="h-full m-0">
                  <ComponentList
                    onComponentSelect={handleComponentSelect}
                    selectedComponent={selectedComponent}
                  />
                </TabsContent>
                
                <TabsContent value="funnels" className="h-full m-0">
                  <FunnelManagementPanel
                    funnel={currentFunnel}
                    onFunnelUpdate={(updatedFunnel: QuizFunnel) => {
                      if (funnelManager.activeFunnelId) {
                        funnelManager.updateFunnel(funnelManager.activeFunnelId, updatedFunnel);
                      }
                    }}
                    onPageSelect={setCurrentPageIndex}
                    selectedPageIndex={currentPageIndex}
                  />
                </TabsContent>
                
                <TabsContent value="history" className="h-full m-0">
                  <VersioningPanel
                    funnel={currentFunnel}
                    onFunnelUpdate={(updatedFunnel: QuizFunnel) => {
                      if (funnelManager.activeFunnelId) {
                        funnelManager.updateFunnel(funnelManager.activeFunnelId, updatedFunnel);
                      }
                    }}
                  />
                </TabsContent>
                
                <TabsContent value="config" className="h-full m-0">
                  <ConfigPanel
                    config={currentFunnel.config || {
                      domain: '',
                      seo: { title: '', description: '', keywords: '' },
                      pixel: { facebookPixelId: '', googleAnalyticsId: '' },
                      utm: { source: '', medium: '', campaign: '', content: '', term: '' },
                      scoring: {
                        normalQuestionPoints: 1,
                        strategicQuestionPoints: 2,
                        autoAdvanceNormal: false,
                        autoAdvanceStrategic: false,
                        normalSelectionLimit: 1,
                        strategicSelectionLimit: 1,
                      },
                      results: {
                        showUserName: true,
                        showPrimaryStyle: true,
                        showSecondaryStyles: true,
                        showPercentages: true,
                        showStyleImages: true,
                        showStyleGuides: true,
                      },
                    }}
                    onConfigUpdate={handleConfigUpdate}
                  />
                </TabsContent>
                
                <TabsContent value="preview" className="h-full m-0">
                  <div className="p-4">
                    <Button onClick={handlePreview} className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      Abrir Preview em Nova Aba
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* Center Area - Canvas */}
          <div className={styles.centerArea}>
            <PageEditorCanvas
              funnel={currentFunnel}
              deviceView={deviceView}
              selectedComponent={selectedComponent}
              onComponentSelect={handleComponentSelect}
              onFunnelUpdate={(updates: QuizFunnel) => {
                if (funnelManager.activeFunnelId) {
                  funnelManager.updateFunnel(funnelManager.activeFunnelId, updates);
                }
              }}
              isDragging={isDragging}
            />
          </div>

          {/* Right Panel - Properties */}
          <div className={styles.rightPanel}>
            <div className={styles.rightPanelHeader}>
              <h3 className={styles.rightPanelTitle}>Propriedades</h3>
            </div>
            <div className={styles.rightPanelContent}>
              <PropertiesPanel
                selectedComponent={selectedComponent}
                onComponentUpdate={(updates: Partial<SimpleComponent>) => {
                  if (selectedComponent && funnelManager.activeFunnelId) {
                    // Update component logic here
                    console.log('Component update:', updates);
                  }
                }}
                onComponentDelete={(componentId: string) => {
                  // Delete component logic here
                  console.log('Delete component:', componentId);
                  setSelectedComponent(null);
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default ModernQuizEditor;
