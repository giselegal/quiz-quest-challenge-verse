import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronDownIcon,
    SwatchIcon,
    AdjustmentsHorizontalIcon,
    PhotoIcon,
    CursorArrowRaysIcon,
    DocumentTextIcon,
    SparklesIcon,
    CogIcon
} from '@heroicons/react/24/outline';
import { UnifiedBlock } from '@/types/master-schema';

interface SmartPropertiesPanelProps {
    selectedBlock: UnifiedBlock | null;
    onBlockUpdate: (blockId: string, updates: any) => void;
    className?: string;
}

interface PropertyCategory {
    id: string;
    name: string;
    icon: React.ReactNode;
    description: string;
    properties: PropertyField[];
}

interface PropertyField {
    key: string;
    label: string;
    type: 'text' | 'textarea' | 'color' | 'number' | 'select' | 'toggle' | 'slider' | 'image' | 'array';
    options?: string[] | { value: string; label: string }[];
    min?: number;
    max?: number;
    step?: number;
    placeholder?: string;
    description?: string;
}

export const SmartPropertiesPanel: React.FC<SmartPropertiesPanelProps> = ({
    selectedBlock,
    onBlockUpdate,
    className = ''
}) => {
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
        new Set(['content', 'style', 'behavior'])
    );
    const [searchTerm, setSearchTerm] = useState('');

    // Define property categories based on block type
    const getPropertyCategories = useCallback((block: UnifiedBlock): PropertyCategory[] => {
        const baseCategories: PropertyCategory[] = [
            {
                id: 'content',
                name: 'Conteúdo',
                icon: <DocumentTextIcon className="w-4 h-4" />,
                description: 'Texto, imagens e dados do bloco',
                properties: []
            },
            {
                id: 'style',
                name: 'Estilo',
                icon: <SwatchIcon className="w-4 h-4" />,
                description: 'Aparência visual e layout',
                properties: []
            },
            {
                id: 'behavior',
                name: 'Comportamento',
                icon: <CursorArrowRaysIcon className="w-4 h-4" />,
                description: 'Interação e funcionalidade',
                properties: []
            },
            {
                id: 'advanced',
                name: 'Avançado',
                icon: <CogIcon className="w-4 h-4" />,
                description: 'Configurações técnicas',
                properties: []
            }
        ];

        switch (block.type) {
            case 'heading':
                baseCategories[0].properties = [
                    { key: 'content', label: 'Texto do Título', type: 'text', placeholder: 'Digite o título...' },
                    {
                        key: 'level', label: 'Nível', type: 'select', options: [
                            { value: '1', label: 'H1 - Principal' },
                            { value: '2', label: 'H2 - Seção' },
                            { value: '3', label: 'H3 - Subseção' },
                            { value: '4', label: 'H4 - Menor' }
                        ]
                    }
                ];
                baseCategories[1].properties = [
                    { key: 'fontSize', label: 'Tamanho da Fonte', type: 'slider', min: 12, max: 72, step: 2 },
                    { key: 'color', label: 'Cor do Texto', type: 'color' },
                    {
                        key: 'textAlign', label: 'Alinhamento', type: 'select', options: [
                            { value: 'left', label: 'Esquerda' },
                            { value: 'center', label: 'Centro' },
                            { value: 'right', label: 'Direita' }
                        ]
                    },
                    {
                        key: 'fontWeight', label: 'Peso da Fonte', type: 'select', options: [
                            { value: 'normal', label: 'Normal' },
                            { value: 'bold', label: 'Negrito' },
                            { value: 'light', label: 'Leve' }
                        ]
                    },
                    { key: 'marginBottom', label: 'Espaço Abaixo', type: 'slider', min: 0, max: 60, step: 4 }
                ];
                break;

            case 'text':
                baseCategories[0].properties = [
                    { key: 'content', label: 'Texto', type: 'textarea', placeholder: 'Digite seu texto...' }
                ];
                baseCategories[1].properties = [
                    { key: 'fontSize', label: 'Tamanho da Fonte', type: 'slider', min: 10, max: 32, step: 1 },
                    { key: 'color', label: 'Cor do Texto', type: 'color' },
                    {
                        key: 'textAlign', label: 'Alinhamento', type: 'select', options: [
                            { value: 'left', label: 'Esquerda' },
                            { value: 'center', label: 'Centro' },
                            { value: 'right', label: 'Direita' },
                            { value: 'justify', label: 'Justificado' }
                        ]
                    },
                    { key: 'lineHeight', label: 'Altura da Linha', type: 'slider', min: 1, max: 3, step: 0.1 },
                    { key: 'padding', label: 'Espaçamento Interno', type: 'slider', min: 0, max: 40, step: 2 }
                ];
                break;

            case 'button':
                baseCategories[0].properties = [
                    { key: 'text', label: 'Texto do Botão', type: 'text', placeholder: 'Clique Aqui' },
                    { key: 'subtitle', label: 'Subtítulo (opcional)', type: 'text', placeholder: 'Texto pequeno abaixo' }
                ];
                baseCategories[1].properties = [
                    { key: 'backgroundColor', label: 'Cor de Fundo', type: 'color' },
                    { key: 'color', label: 'Cor do Texto', type: 'color' },
                    { key: 'borderRadius', label: 'Bordas Arredondadas', type: 'slider', min: 0, max: 30, step: 2 },
                    {
                        key: 'padding', label: 'Tamanho', type: 'select', options: [
                            { value: 'sm', label: 'Pequeno' },
                            { value: 'md', label: 'Médio' },
                            { value: 'lg', label: 'Grande' },
                            { value: 'xl', label: 'Extra Grande' }
                        ]
                    },
                    {
                        key: 'width', label: 'Largura', type: 'select', options: [
                            { value: 'auto', label: 'Automática' },
                            { value: '100%', label: 'Largura Total' },
                            { value: '50%', label: 'Meia Largura' }
                        ]
                    }
                ];
                baseCategories[2].properties = [
                    {
                        key: 'action', label: 'Ação', type: 'select', options: [
                            { value: 'next', label: 'Próxima Etapa' },
                            { value: 'submit', label: 'Enviar Formulário' },
                            { value: 'redirect', label: 'Redirecionar URL' },
                            { value: 'download', label: 'Download' }
                        ]
                    },
                    { key: 'targetUrl', label: 'URL de Destino', type: 'text', placeholder: 'https://...' },
                    { key: 'openInNewTab', label: 'Abrir Nova Aba', type: 'toggle' }
                ];
                break;

            case 'quiz-question':
                baseCategories[0].properties = [
                    { key: 'question', label: 'Pergunta', type: 'textarea', placeholder: 'Digite sua pergunta...' },
                    { key: 'options', label: 'Opções de Resposta', type: 'array' },
                    { key: 'explanation', label: 'Explicação (opcional)', type: 'textarea', placeholder: 'Explique a resposta...' }
                ];
                baseCategories[1].properties = [
                    {
                        key: 'layout', label: 'Layout das Opções', type: 'select', options: [
                            { value: 'vertical', label: 'Vertical' },
                            { value: 'grid', label: 'Grid 2x2' },
                            { value: 'horizontal', label: 'Horizontal' }
                        ]
                    },
                    {
                        key: 'optionStyle', label: 'Estilo das Opções', type: 'select', options: [
                            { value: 'cards', label: 'Cartões' },
                            { value: 'buttons', label: 'Botões' },
                            { value: 'radio', label: 'Radio Buttons' }
                        ]
                    },
                    { key: 'accentColor', label: 'Cor de Destaque', type: 'color' }
                ];
                baseCategories[2].properties = [
                    { key: 'required', label: 'Resposta Obrigatória', type: 'toggle' },
                    { key: 'multipleSelection', label: 'Múltipla Escolha', type: 'toggle' },
                    { key: 'showResults', label: 'Mostrar Resultado', type: 'toggle' },
                    { key: 'autoAdvance', label: 'Avançar Automaticamente', type: 'toggle' }
                ];
                break;

            case 'image':
                baseCategories[0].properties = [
                    { key: 'src', label: 'URL da Imagem', type: 'image' },
                    { key: 'alt', label: 'Texto Alternativo', type: 'text', placeholder: 'Descreva a imagem...' },
                    { key: 'caption', label: 'Legenda (opcional)', type: 'text' }
                ];
                baseCategories[1].properties = [
                    {
                        key: 'width', label: 'Largura', type: 'select', options: [
                            { value: '100%', label: 'Largura Total' },
                            { value: '75%', label: '75% da Largura' },
                            { value: '50%', label: '50% da Largura' },
                            { value: '25%', label: '25% da Largura' }
                        ]
                    },
                    {
                        key: 'alignment', label: 'Alinhamento', type: 'select', options: [
                            { value: 'left', label: 'Esquerda' },
                            { value: 'center', label: 'Centro' },
                            { value: 'right', label: 'Direita' }
                        ]
                    },
                    { key: 'borderRadius', label: 'Bordas Arredondadas', type: 'slider', min: 0, max: 30, step: 2 },
                    {
                        key: 'shadow', label: 'Sombra', type: 'select', options: [
                            { value: 'none', label: 'Sem Sombra' },
                            { value: 'small', label: 'Pequena' },
                            { value: 'medium', label: 'Média' },
                            { value: 'large', label: 'Grande' }
                        ]
                    }
                ];
                baseCategories[2].properties = [
                    { key: 'clickable', label: 'Clicável', type: 'toggle' },
                    { key: 'clickUrl', label: 'URL ao Clicar', type: 'text', placeholder: 'https://...' },
                    { key: 'lightbox', label: 'Abrir em Lightbox', type: 'toggle' }
                ];
                break;

            case 'lead-form':
                baseCategories[0].properties = [
                    { key: 'title', label: 'Título do Formulário', type: 'text', placeholder: 'Cadastre-se' },
                    { key: 'description', label: 'Descrição', type: 'textarea', placeholder: 'Preencha os dados...' },
                    { key: 'submitText', label: 'Texto do Botão', type: 'text', placeholder: 'Enviar' },
                    { key: 'fields', label: 'Campos', type: 'array' }
                ];
                baseCategories[1].properties = [
                    { key: 'backgroundColor', label: 'Cor de Fundo', type: 'color' },
                    { key: 'borderColor', label: 'Cor da Borda', type: 'color' },
                    { key: 'borderRadius', label: 'Bordas Arredondadas', type: 'slider', min: 0, max: 30, step: 2 },
                    { key: 'padding', label: 'Espaçamento Interno', type: 'slider', min: 10, max: 40, step: 2 }
                ];
                baseCategories[2].properties = [
                    { key: 'required', label: 'Todos Campos Obrigatórios', type: 'toggle' },
                    { key: 'validation', label: 'Validação de Email', type: 'toggle' },
                    { key: 'redirectAfterSubmit', label: 'Redirecionar Após Envio', type: 'text', placeholder: 'URL...' },
                    { key: 'showProgressBar', label: 'Barra de Progresso', type: 'toggle' }
                ];
                break;

            default:
                baseCategories[0].properties = [
                    { key: 'content', label: 'Conteúdo', type: 'text' }
                ];
                baseCategories[1].properties = [
                    { key: 'backgroundColor', label: 'Cor de Fundo', type: 'color' },
                    { key: 'padding', label: 'Espaçamento', type: 'slider', min: 0, max: 40, step: 2 }
                ];
        }

        // Add common advanced properties
        baseCategories[3].properties = [
            { key: 'id', label: 'ID do Elemento', type: 'text', description: 'Identificador único' },
            { key: 'cssClass', label: 'Classes CSS', type: 'text', description: 'Classes CSS customizadas' },
            {
                key: 'animation', label: 'Animação', type: 'select', options: [
                    { value: 'none', label: 'Sem Animação' },
                    { value: 'fadeIn', label: 'Aparecer Gradualmente' },
                    { value: 'slideUp', label: 'Deslizar para Cima' },
                    { value: 'bounce', label: 'Bounce' }
                ]
            },
            { key: 'visible', label: 'Visível', type: 'toggle', description: 'Mostrar/ocultar elemento' }
        ];

        return baseCategories.filter(category => category.properties.length > 0);
    }, []);

    const categories = useMemo(() => {
        if (!selectedBlock) return [];
        return getPropertyCategories(selectedBlock);
    }, [selectedBlock, getPropertyCategories]);

    const filteredCategories = useMemo(() => {
        if (!searchTerm) return categories;

        return categories.map(category => ({
            ...category,
            properties: category.properties.filter(prop =>
                prop.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
                prop.key.toLowerCase().includes(searchTerm.toLowerCase())
            )
        })).filter(category => category.properties.length > 0);
    }, [categories, searchTerm]);

    const toggleCategory = useCallback((categoryId: string) => {
        const newExpanded = new Set(expandedCategories);
        if (newExpanded.has(categoryId)) {
            newExpanded.delete(categoryId);
        } else {
            newExpanded.add(categoryId);
        }
        setExpandedCategories(newExpanded);
    }, [expandedCategories]);

    const updateProperty = useCallback((key: string, value: any) => {
        if (!selectedBlock) return;

        const updates = { [key]: value };
        onBlockUpdate(selectedBlock.id, { properties: { ...selectedBlock.properties, ...updates } });
    }, [selectedBlock, onBlockUpdate]);

    const renderPropertyField = useCallback((property: PropertyField, value: any) => {
        const commonClasses = "w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";

        switch (property.type) {
            case 'text':
                return (
                    <input
                        type="text"
                        value={value || ''}
                        onChange={(e) => updateProperty(property.key, e.target.value)}
                        placeholder={property.placeholder}
                        className={`${commonClasses} text-sm`}
                    />
                );

            case 'textarea':
                return (
                    <textarea
                        value={value || ''}
                        onChange={(e) => updateProperty(property.key, e.target.value)}
                        placeholder={property.placeholder}
                        rows={3}
                        className={`${commonClasses} text-sm resize-none`}
                    />
                );

            case 'color':
                return (
                    <div className="flex gap-2">
                        <input
                            type="color"
                            value={value || '#000000'}
                            onChange={(e) => updateProperty(property.key, e.target.value)}
                            className="w-12 h-10 border border-gray-300 rounded-lg cursor-pointer"
                        />
                        <input
                            type="text"
                            value={value || '#000000'}
                            onChange={(e) => updateProperty(property.key, e.target.value)}
                            className={`${commonClasses} text-sm flex-1`}
                            placeholder="#000000"
                        />
                    </div>
                );

            case 'select':
                return (
                    <select
                        value={value || ''}
                        onChange={(e) => updateProperty(property.key, e.target.value)}
                        className={`${commonClasses} text-sm`}
                    >
                        <option value="">Selecione...</option>
                        {property.options?.map((option) => (
                            <option
                                key={typeof option === 'string' ? option : option.value}
                                value={typeof option === 'string' ? option : option.value}
                            >
                                {typeof option === 'string' ? option : option.label}
                            </option>
                        ))}
                    </select>
                );

            case 'toggle':
                return (
                    <button
                        onClick={() => updateProperty(property.key, !value)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${value ? 'bg-blue-500' : 'bg-gray-300'
                            }`}
                    >
                        <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'
                                }`}
                        />
                    </button>
                );

            case 'slider':
                return (
                    <div className="space-y-2">
                        <input
                            type="range"
                            min={property.min || 0}
                            max={property.max || 100}
                            step={property.step || 1}
                            value={value || property.min || 0}
                            onChange={(e) => updateProperty(property.key, Number(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                        />
                        <div className="flex justify-between text-xs text-gray-500">
                            <span>{property.min || 0}</span>
                            <span className="font-medium">{value || property.min || 0}</span>
                            <span>{property.max || 100}</span>
                        </div>
                    </div>
                );

            case 'image':
                return (
                    <div className="space-y-2">
                        <input
                            type="url"
                            value={value || ''}
                            onChange={(e) => updateProperty(property.key, e.target.value)}
                            placeholder="https://exemplo.com/imagem.jpg"
                            className={`${commonClasses} text-sm`}
                        />
                        <div className="flex gap-2">
                            <button className="px-3 py-2 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors">
                                📁 Upload
                            </button>
                            <button className="px-3 py-2 bg-gray-500 text-white text-xs rounded-lg hover:bg-gray-600 transition-colors">
                                🔍 Galeria
                            </button>
                        </div>
                        {value && (
                            <img src={value} alt="Preview" className="w-full h-20 object-cover rounded-lg border" />
                        )}
                    </div>
                );

            default:
                return (
                    <input
                        type="text"
                        value={value || ''}
                        onChange={(e) => updateProperty(property.key, e.target.value)}
                        className={`${commonClasses} text-sm`}
                    />
                );
        }
    }, [updateProperty]);

    if (!selectedBlock) {
        return (
            <div className={`w-80 min-w-80 max-w-80 bg-white border-l border-gray-200 flex flex-col ${className}`}>
                <div className="flex-1 flex items-center justify-center p-8">
                    <div className="text-center text-gray-400">
                        <SparklesIcon className="mx-auto h-12 w-12 mb-4" />
                        <h3 className="font-medium text-gray-900 mb-2">Selecione um Bloco</h3>
                        <p className="text-sm">Clique em um bloco no canvas para editar suas propriedades</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`w-80 min-w-80 max-w-80 bg-white border-l border-gray-200 flex flex-col ${className}`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white">
                        <AdjustmentsHorizontalIcon className="w-4 h-4" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Propriedades</h3>
                        <p className="text-xs text-gray-600 capitalize">{selectedBlock.type.replace('-', ' ')}</p>
                    </div>
                </div>

                {/* Search */}
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Buscar propriedade..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 text-sm bg-white border border-gray-200 rounded-lg placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                    />
                    <svg className="absolute left-2.5 top-2.5 w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
            </div>

            {/* Categories */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-2">
                    {filteredCategories.map((category) => (
                        <div key={category.id} className="mb-4">
                            {/* Category Header */}
                            <button
                                onClick={() => toggleCategory(category.id)}
                                className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors group"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="text-blue-600">{category.icon}</div>
                                    <div className="text-left">
                                        <div className="font-medium text-sm text-gray-900">{category.name}</div>
                                        <div className="text-xs text-gray-500">{category.description}</div>
                                    </div>
                                </div>
                                <ChevronDownIcon
                                    className={`w-4 h-4 text-gray-400 transition-transform ${expandedCategories.has(category.id) ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            {/* Category Properties */}
                            <AnimatePresence>
                                {expandedCategories.has(category.id) && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-3 pb-3 space-y-4">
                                            {category.properties.map((property) => {
                                                const currentValue = selectedBlock.properties?.[property.key];

                                                return (
                                                    <div key={property.key} className="space-y-1">
                                                        <div className="flex items-center justify-between">
                                                            <label className="text-xs font-medium text-gray-700">
                                                                {property.label}
                                                            </label>
                                                            {property.description && (
                                                                <div className="group relative">
                                                                    <svg className="w-3 h-3 text-gray-400 cursor-help" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                    </svg>
                                                                    <div className="absolute bottom-full right-0 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                                                        {property.description}
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                        {renderPropertyField(property, currentValue)}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-200 bg-gray-50">
                <div className="flex gap-2">
                    <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white text-xs py-2 px-3 rounded-lg transition-colors">
                        Aplicar Mudanças
                    </button>
                    <button className="bg-gray-500 hover:bg-gray-600 text-white text-xs py-2 px-3 rounded-lg transition-colors">
                        Reset
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SmartPropertiesPanel;