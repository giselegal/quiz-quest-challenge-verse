import React, { useState, useCallback } from 'react';
import { Template, TemplateFunnel } from './TemplateGallery';

interface TemplateCloner {
    cloneTemplate: (template: Template, customizations?: TemplateCustomizations) => Promise<string>;
    applyTemplate: (templateId: string, targetFunnelId?: string) => Promise<void>;
    getClonePreview: (template: Template, customizations?: TemplateCustomizations) => TemplateFunnel;
}

interface TemplateCustomizations {
    name?: string;
    primaryColor?: string;
    secondaryColor?: string;
    fontFamily?: string;
    theme?: 'light' | 'dark' | 'colorful';
    layout?: 'centered' | 'full-width' | 'sidebar';
    replaceTexts?: Record<string, string>;
    replaceImages?: Record<string, string>;
}

interface QuickCloneModalProps {
    template: Template | null;
    isVisible: boolean;
    onClose: () => void;
    onClone: (template: Template, customizations: TemplateCustomizations) => void;
}

export const QuickCloneModal: React.FC<QuickCloneModalProps> = ({
    template,
    isVisible,
    onClose,
    onClone
}) => {
    const [customizations, setCustomizations] = useState<TemplateCustomizations>({});
    const [step, setStep] = useState<'customize' | 'preview' | 'cloning'>('customize');
    const [isCloning, setIsCloning] = useState(false);

    // Reset state when template changes
    React.useEffect(() => {
        if (template) {
            setCustomizations({
                name: `${template.name} - Cópia`,
                primaryColor: template.structure.settings.primaryColor,
                secondaryColor: template.structure.settings.secondaryColor,
                fontFamily: template.structure.settings.fontFamily,
                theme: template.structure.settings.theme,
                layout: template.structure.settings.layout,
                replaceTexts: {},
                replaceImages: {}
            });
            setStep('customize');
            setIsCloning(false);
        }
    }, [template]);

    const handleClone = useCallback(async () => {
        if (!template) return;

        setIsCloning(true);
        setStep('cloning');

        try {
            // Simulate cloning process
            await new Promise(resolve => setTimeout(resolve, 2000));

            onClone(template, customizations);
            onClose();
        } catch (error) {
            console.error('Error cloning template:', error);
        } finally {
            setIsCloning(false);
        }
    }, [template, customizations, onClone, onClose]);

    if (!isVisible || !template) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-bold">🚀 Clonagem Rápida</h2>
                            <p className="text-green-100">{template.name}</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition"
                        >
                            ✕
                        </button>
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="bg-gray-50 px-6 py-3 border-b">
                    <div className="flex items-center justify-center gap-8">
                        <div className={`flex items-center gap-2 ${step === 'customize' ? 'text-blue-600' : step === 'preview' || step === 'cloning' ? 'text-green-600' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${step === 'customize' ? 'bg-blue-100' : step === 'preview' || step === 'cloning' ? 'bg-green-100' : 'bg-gray-100'}`}>
                                1
                            </div>
                            <span className="font-medium">Personalizar</span>
                        </div>
                        <div className={`w-8 h-0.5 ${step === 'preview' || step === 'cloning' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <div className={`flex items-center gap-2 ${step === 'preview' ? 'text-blue-600' : step === 'cloning' ? 'text-green-600' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${step === 'preview' ? 'bg-blue-100' : step === 'cloning' ? 'bg-green-100' : 'bg-gray-100'}`}>
                                2
                            </div>
                            <span className="font-medium">Preview</span>
                        </div>
                        <div className={`w-8 h-0.5 ${step === 'cloning' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <div className={`flex items-center gap-2 ${step === 'cloning' ? 'text-blue-600' : 'text-gray-400'}`}>
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-medium ${step === 'cloning' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                3
                            </div>
                            <span className="font-medium">Clonar</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-hidden">
                    {/* Step 1: Customize */}
                    {step === 'customize' && (
                        <div className="flex h-full">
                            {/* Settings Panel */}
                            <div className="w-1/2 p-6 overflow-y-auto border-r">
                                <h3 className="font-semibold text-gray-900 mb-4">🎨 Personalização</h3>

                                <div className="space-y-6">
                                    {/* Basic Settings */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            📝 Nome do Funil
                                        </label>
                                        <input
                                            type="text"
                                            value={customizations.name || ''}
                                            onChange={(e) => setCustomizations(prev => ({ ...prev, name: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            placeholder="Nome personalizado..."
                                        />
                                    </div>

                                    {/* Theme */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            🎭 Tema Visual
                                        </label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {(['light', 'dark', 'colorful'] as const).map((theme) => (
                                                <button
                                                    key={theme}
                                                    onClick={() => setCustomizations(prev => ({ ...prev, theme }))}
                                                    className={`p-3 border-2 rounded-lg text-center transition ${customizations.theme === theme
                                                            ? 'border-blue-500 bg-blue-50'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <div className="text-lg mb-1">
                                                        {theme === 'light' && '☀️'}
                                                        {theme === 'dark' && '🌙'}
                                                        {theme === 'colorful' && '🌈'}
                                                    </div>
                                                    <div className="text-xs font-medium capitalize">{theme}</div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Colors */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                🎨 Cor Primária
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="color"
                                                    value={customizations.primaryColor || '#3B82F6'}
                                                    onChange={(e) => setCustomizations(prev => ({ ...prev, primaryColor: e.target.value }))}
                                                    className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                                                />
                                                <input
                                                    type="text"
                                                    value={customizations.primaryColor || '#3B82F6'}
                                                    onChange={(e) => setCustomizations(prev => ({ ...prev, primaryColor: e.target.value }))}
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                🎨 Cor Secundária
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="color"
                                                    value={customizations.secondaryColor || '#10B981'}
                                                    onChange={(e) => setCustomizations(prev => ({ ...prev, secondaryColor: e.target.value }))}
                                                    className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                                                />
                                                <input
                                                    type="text"
                                                    value={customizations.secondaryColor || '#10B981'}
                                                    onChange={(e) => setCustomizations(prev => ({ ...prev, secondaryColor: e.target.value }))}
                                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm font-mono"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Font Family */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            ✍️ Fonte
                                        </label>
                                        <select
                                            value={customizations.fontFamily || 'Inter'}
                                            onChange={(e) => setCustomizations(prev => ({ ...prev, fontFamily: e.target.value }))}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="Inter">Inter (Moderno)</option>
                                            <option value="Roboto">Roboto (Clean)</option>
                                            <option value="Open Sans">Open Sans (Clássico)</option>
                                            <option value="Poppins">Poppins (Friendly)</option>
                                            <option value="Montserrat">Montserrat (Elegant)</option>
                                        </select>
                                    </div>

                                    {/* Layout */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            📐 Layout
                                        </label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {(['centered', 'full-width', 'sidebar'] as const).map((layout) => (
                                                <button
                                                    key={layout}
                                                    onClick={() => setCustomizations(prev => ({ ...prev, layout }))}
                                                    className={`p-3 border-2 rounded-lg text-center transition ${customizations.layout === layout
                                                            ? 'border-blue-500 bg-blue-50'
                                                            : 'border-gray-200 hover:border-gray-300'
                                                        }`}
                                                >
                                                    <div className="text-lg mb-1">
                                                        {layout === 'centered' && '📱'}
                                                        {layout === 'full-width' && '🖥️'}
                                                        {layout === 'sidebar' && '📋'}
                                                    </div>
                                                    <div className="text-xs font-medium">
                                                        {layout === 'centered' && 'Centralizado'}
                                                        {layout === 'full-width' && 'Largura Total'}
                                                        {layout === 'sidebar' && 'Com Sidebar'}
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Preview Panel */}
                            <div className="w-1/2 p-6 bg-gray-50">
                                <h3 className="font-semibold text-gray-900 mb-4">👁️ Preview</h3>

                                <div className="bg-white rounded-lg border-2 border-gray-200 h-[400px] overflow-y-auto">
                                    <div
                                        className="p-6"
                                        style={{
                                            backgroundColor: customizations.theme === 'dark' ? '#1f2937' : '#ffffff',
                                            fontFamily: customizations.fontFamily || 'Inter'
                                        }}
                                    >
                                        {/* Preview Content */}
                                        <div
                                            className="text-center mb-4"
                                            style={{ color: customizations.theme === 'dark' ? '#ffffff' : '#1f2937' }}
                                        >
                                            <h1
                                                className="text-2xl font-bold mb-2"
                                                style={{ color: customizations.primaryColor }}
                                            >
                                                {customizations.name || template.name}
                                            </h1>
                                            <p className="text-sm opacity-80">
                                                {template.description}
                                            </p>
                                        </div>

                                        <div className="space-y-3">
                                            <div
                                                className="p-3 rounded-lg"
                                                style={{ backgroundColor: `${customizations.primaryColor}20` }}
                                            >
                                                <div className="text-sm font-medium">Etapa 1: {template.structure.stages[0]?.name}</div>
                                                <div className="text-xs opacity-70 mt-1">{template.structure.stages[0]?.description}</div>
                                            </div>

                                            {template.structure.stages.length > 1 && (
                                                <div
                                                    className="p-3 rounded-lg"
                                                    style={{ backgroundColor: `${customizations.secondaryColor}20` }}
                                                >
                                                    <div className="text-sm font-medium">Etapa 2: {template.structure.stages[1]?.name}</div>
                                                    <div className="text-xs opacity-70 mt-1">{template.structure.stages[1]?.description}</div>
                                                </div>
                                            )}

                                            <button
                                                className="w-full py-2 px-4 rounded-lg text-white font-medium"
                                                style={{ backgroundColor: customizations.primaryColor }}
                                            >
                                                Botão de Ação
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-4 text-xs text-gray-600">
                                    💡 Este é um preview básico. O template real terá todos os componentes e funcionalidades.
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Preview */}
                    {step === 'preview' && (
                        <div className="p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">👁️ Preview Final</h3>
                            <div className="bg-gray-100 rounded-lg p-8 text-center">
                                <div className="text-4xl mb-4">🎯</div>
                                <p className="text-gray-600">
                                    Preview completo será implementado com renderização real dos componentes
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Cloning */}
                    {step === 'cloning' && (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-6"></div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">🚀 Clonando Template</h3>
                                <p className="text-gray-600 mb-4">Criando seu funil personalizado...</p>
                                <div className="bg-gray-200 rounded-full h-2 w-64 mx-auto">
                                    <div className="bg-blue-500 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition"
                    >
                        Cancelar
                    </button>

                    <div className="flex gap-3">
                        {step === 'customize' && (
                            <button
                                onClick={() => setStep('preview')}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                            >
                                Continuar →
                            </button>
                        )}

                        {step === 'preview' && (
                            <>
                                <button
                                    onClick={() => setStep('customize')}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition"
                                >
                                    ← Voltar
                                </button>
                                <button
                                    onClick={handleClone}
                                    disabled={isCloning}
                                    className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition"
                                >
                                    🚀 Clonar Template
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickCloneModal;