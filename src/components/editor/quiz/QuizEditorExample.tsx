/**
 * QuizEditorExample.tsx - Complete Implementation Example
 * ✅ Shows how to use the modular quiz system
 * ✅ Demonstrates all three operation modes
 * ✅ Complete integration example
 */

import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { QuizFlowPage, QuizMode } from './QuizFlowPage';
import { QUIZ_STYLE_21_STEPS_TEMPLATE } from '@/templates/quiz21StepsComplete';

export interface QuizEditorExampleProps {
  className?: string;
}

export const QuizEditorExample: React.FC<QuizEditorExampleProps> = ({
  className = '',
}) => {
  const [currentMode, setCurrentMode] = useState<QuizMode>('preview');
  const [blocksData, setBlocksData] = useState<any[]>([]);
  const [quizConfig, setQuizConfig] = useState({
    enableLivePreview: true,
    enableValidation: true,
    enableScoring: true,
    theme: {
      primaryColor: '#B89B7A',
      backgroundColor: '#FEFEFE',
      textColor: '#432818',
    },
  });

  // Handle blocks change from editor
  const handleBlocksChange = useCallback((blocks: any[]) => {
    setBlocksData(blocks);
    console.log('[QuizEditorExample] Blocks updated:', blocks.length);
  }, []);

  // Mode switching
  const handleModeChange = useCallback((newMode: QuizMode) => {
    setCurrentMode(newMode);
    console.log('[QuizEditorExample] Mode changed to:', newMode);
  }, []);

  // Configuration updates
  const handleConfigUpdate = useCallback((updates: Partial<typeof quizConfig>) => {
    setQuizConfig(prev => ({ ...prev, ...updates }));
  }, []);

  // Reset quiz
  const handleReset = useCallback(() => {
    setBlocksData([]);
    setCurrentMode('preview');
    console.log('[QuizEditorExample] Quiz reset');
  }, []);

  return (
    <div className={`quiz-editor-example ${className}`}>
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Quiz de 21 Etapas - Sistema Modular</span>
              <div className="flex items-center gap-2">
                <Badge variant="outline">
                  Modo: {currentMode}
                </Badge>
                <Badge variant="secondary">
                  {Object.keys(QUIZ_STYLE_21_STEPS_TEMPLATE).length} etapas
                </Badge>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">21</div>
                <div className="text-sm text-gray-600">Etapas Totais</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">3</div>
                <div className="text-sm text-gray-600">Modos de Operação</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">8</div>
                <div className="text-sm text-gray-600">Componentes Modulares</div>
              </div>
            </div>

            {/* Mode Switch */}
            <div className="flex justify-center gap-2">
              <Button
                variant={currentMode === 'editor' ? 'default' : 'outline'}
                onClick={() => handleModeChange('editor')}
              >
                Editor Mode
              </Button>
              <Button
                variant={currentMode === 'preview' ? 'default' : 'outline'}
                onClick={() => handleModeChange('preview')}
              >
                Preview Mode
              </Button>
              <Button
                variant={currentMode === 'production' ? 'default' : 'outline'}
                onClick={() => handleModeChange('production')}
              >
                Production Mode
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="quiz" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="quiz">Quiz Interface</TabsTrigger>
            <TabsTrigger value="config">Configuration</TabsTrigger>
            <TabsTrigger value="data">Data & State</TabsTrigger>
            <TabsTrigger value="docs">Documentation</TabsTrigger>
          </TabsList>

          {/* Quiz Interface Tab */}
          <TabsContent value="quiz" className="space-y-6">
            <Card>
              <CardContent className="p-0">
                <QuizFlowPage
                  mode={currentMode}
                  template={QUIZ_STYLE_21_STEPS_TEMPLATE}
                  onBlocksChange={handleBlocksChange}
                  customConfig={quizConfig}
                />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Configuration Tab */}
          <TabsContent value="config" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Feature Toggles */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Live Preview</label>
                    <Button
                      variant={quizConfig.enableLivePreview ? 'default' : 'outline'}
                      onClick={() => handleConfigUpdate({ 
                        enableLivePreview: !quizConfig.enableLivePreview 
                      })}
                      className="w-full"
                    >
                      {quizConfig.enableLivePreview ? 'Enabled' : 'Disabled'}
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Validation</label>
                    <Button
                      variant={quizConfig.enableValidation ? 'default' : 'outline'}
                      onClick={() => handleConfigUpdate({ 
                        enableValidation: !quizConfig.enableValidation 
                      })}
                      className="w-full"
                    >
                      {quizConfig.enableValidation ? 'Enabled' : 'Disabled'}
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Scoring</label>
                    <Button
                      variant={quizConfig.enableScoring ? 'default' : 'outline'}
                      onClick={() => handleConfigUpdate({ 
                        enableScoring: !quizConfig.enableScoring 
                      })}
                      className="w-full"
                    >
                      {quizConfig.enableScoring ? 'Enabled' : 'Disabled'}
                    </Button>
                  </div>
                </div>

                {/* Theme Configuration */}
                <div className="space-y-3">
                  <h4 className="font-medium">Theme Settings</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm">Primary Color</label>
                      <input
                        type="color"
                        value={quizConfig.theme.primaryColor}
                        onChange={(e) => handleConfigUpdate({
                          theme: { ...quizConfig.theme, primaryColor: e.target.value }
                        })}
                        className="w-full h-10 border rounded"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Background Color</label>
                      <input
                        type="color"
                        value={quizConfig.theme.backgroundColor}
                        onChange={(e) => handleConfigUpdate({
                          theme: { ...quizConfig.theme, backgroundColor: e.target.value }
                        })}
                        className="w-full h-10 border rounded"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm">Text Color</label>
                      <input
                        type="color"
                        value={quizConfig.theme.textColor}
                        onChange={(e) => handleConfigUpdate({
                          theme: { ...quizConfig.theme, textColor: e.target.value }
                        })}
                        className="w-full h-10 border rounded"
                      />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <Button onClick={handleReset} variant="outline">
                    Reset Configuration
                  </Button>
                  <Button onClick={() => console.log('Export config:', quizConfig)}>
                    Export Config
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data & State Tab */}
          <TabsContent value="data" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quiz Data & State</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Template Structure</h4>
                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                      <pre>
{JSON.stringify({
  totalSteps: Object.keys(QUIZ_STYLE_21_STEPS_TEMPLATE).length,
  steps: Object.keys(QUIZ_STYLE_21_STEPS_TEMPLATE).slice(0, 5).map(key => ({
    key,
    blocks: QUIZ_STYLE_21_STEPS_TEMPLATE[key].length
  })),
  "...": "more steps"
}, null, 2)}
                      </pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Current Configuration</h4>
                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                      <pre>{JSON.stringify(quizConfig, null, 2)}</pre>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Blocks Data</h4>
                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                      {blocksData.length > 0 ? (
                        <pre>{JSON.stringify(blocksData.slice(0, 2), null, 2)}</pre>
                      ) : (
                        <p>No blocks data available. Switch to editor mode and make changes.</p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Documentation Tab */}
          <TabsContent value="docs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Modular Quiz System Documentation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Component Overview */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Component Architecture</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">QuizFlowPage</h4>
                        <p className="text-sm text-gray-600">
                          Main orchestration component that manages the complete quiz flow
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">QuizNavigationBlock</h4>
                        <p className="text-sm text-gray-600">
                          Intelligent navigation with progress tracking and mode awareness
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">QuizStepRenderer</h4>
                        <p className="text-sm text-gray-600">
                          Dynamic renderer for different step types and content blocks
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">QuizDataManager</h4>
                        <p className="text-sm text-gray-600">
                          Handles state persistence, auto-save, and data management
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">QuizValidationSystem</h4>
                        <p className="text-sm text-gray-600">
                          Real-time validation with step-specific rules and feedback
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">QuizScoreCalculator</h4>
                        <p className="text-sm text-gray-600">
                          Automatic score calculation with multiple algorithms
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                {/* Usage Example */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Usage Example</h3>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    <pre>{`import { QuizFlowPage } from '@/components/editor/quiz/QuizFlowPage';

<QuizFlowPage
  mode="editor" // or "preview" or "production"
  template={QUIZ_STYLE_21_STEPS_TEMPLATE}
  onBlocksChange={handleBlocksChange}
  customConfig={{
    enableLivePreview: true,
    enableValidation: true,
    enableScoring: true,
    theme: {
      primaryColor: '#B89B7A'
    }
  }}
/>`}</pre>
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-green-600 mb-2">✅ Modular Components</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Independent and testable components</li>
                        <li>• Well-separated responsibilities</li>
                        <li>• Reusable across different contexts</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-blue-600 mb-2">🔄 Three Operation Modes</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Editor: Full editing with debug controls</li>
                        <li>• Preview: Identical to production with validation</li>
                        <li>• Production: Final experience with analytics</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default QuizEditorExample;