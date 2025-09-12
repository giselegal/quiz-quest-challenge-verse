import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
export interface VisualComponentDef {
    type: string;
    name: string;
    icon: string;
    category: string;
    description: string;
    preview: React.ReactNode;
    tags: string[];
    isPro?: boolean;
    isNew?: boolean;
}

interface VisualComponentsLibraryProps {
    onAddComponent: (type: string) => void;
    className?: string;
}

// Component definitions with visual previews
const VISUAL_COMPONENTS: VisualComponentDef[] = [
    // Quiz Components
    {
        type: 'quiz-question',
        name: 'Pergunta Quiz',
        icon: '❓',
        category: 'Quiz',
        description: 'Pergunta interativa com opções',
        tags: ['quiz', 'pergunta', 'interativo'],
        isNew: true,
        preview: (
            <div className="bg-white rounded-lg p-3 shadow-sm border">
                <h4 className="font-medium text-sm mb-2">Qual é sua cor favorita?</h4>
                <div className="space-y-1">
                    <div className="bg-blue-50 hover:bg-blue-100 p-2 rounded text-xs cursor-pointer">🔵 Azul</div>
                    <div className="bg-red-50 hover:bg-red-100 p-2 rounded text-xs cursor-pointer">🔴 Vermelho</div>
                </div>
            </div>
        )
    },
    {
        type: 'quiz-result',
        name: 'Resultado Quiz',
        icon: '🏆',
        category: 'Quiz',
        description: 'Resultado personalizado do quiz',
        tags: ['resultado', 'personalizado'],
        preview: (
            <div className="bg-gradient-to-r from-green-400 to-blue-500 rounded-lg p-3 text-white">
                <div className="text-xs font-bold">Seu Resultado:</div>
                <div className="text-sm">Perfil Inovador ✨</div>
                <div className="text-xs opacity-80">Match: 95%</div>
            </div>
        )
    },

    // Content Components
    {
        type: 'heading',
        name: 'Título',
        icon: 'H',
        category: 'Conteúdo',
        description: 'Títulos e subtítulos',
        tags: ['título', 'heading', 'h1', 'h2'],
        preview: (
            <div className="bg-white rounded-lg p-3 border">
                <h2 className="text-lg font-bold text-gray-900">Título Impactante</h2>
                <p className="text-xs text-gray-500">Subtítulo explicativo</p>
            </div>
        )
    },
    {
        type: 'text',
        name: 'Texto',
        icon: '📝',
        category: 'Conteúdo',
        description: 'Blocos de texto editável',
        tags: ['texto', 'parágrafo', 'conteúdo'],
        preview: (
            <div className="bg-white rounded-lg p-3 border">
                <p className="text-sm text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor...
                </p>
            </div>
        )
    },
    {
        type: 'image',
        name: 'Imagem',
        icon: '🖼️',
        category: 'Conteúdo',
        description: 'Imagens responsivas',
        tags: ['imagem', 'foto', 'visual'],
        preview: (
            <div className="bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg h-16 flex items-center justify-center">
                <span className="text-white text-xs">📷 Imagem</span>
            </div>
        )
    },

    // Interactive Components
    {
        type: 'button',
        name: 'Botão',
        icon: '🔘',
        category: 'Interativo',
        description: 'Botões de ação',
        tags: ['botão', 'cta', 'ação'],
        preview: (
            <div className="bg-white rounded-lg p-3 border text-center">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-medium">
                    Clique Aqui
                </button>
            </div>
        )
    },
    {
        type: 'lead-form',
        name: 'Formulário',
        icon: '📋',
        category: 'Interativo',
        description: 'Captura de leads',
        tags: ['formulário', 'lead', 'email'],
        isPro: true,
        preview: (
            <div className="bg-white rounded-lg p-3 border">
                <div className="space-y-2">
                    <input className="w-full border border-gray-300 rounded px-2 py-1 text-xs" placeholder="Seu nome" />
                    <input className="w-full border border-gray-300 rounded px-2 py-1 text-xs" placeholder="Email" />
                    <button className="w-full bg-green-500 text-white rounded py-1 text-xs">Enviar</button>
                </div>
            </div>
        )
    },

    // Design Components
    {
        type: 'divider',
        name: 'Divisor',
        icon: '➖',
        category: 'Design',
        description: 'Separadores visuais',
        tags: ['divisor', 'separador', 'linha'],
        preview: (
            <div className="bg-white rounded-lg p-3 border">
                <div className="h-px bg-gray-300"></div>
            </div>
        )
    },
    {
        type: 'spacer',
        name: 'Espaçador',
        icon: '⬜',
        category: 'Design',
        description: 'Espaços em branco',
        tags: ['espaço', 'margem', 'layout'],
        preview: (
            <div className="bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 h-12 flex items-center justify-center">
                <span className="text-xs text-gray-400">Espaço</span>
            </div>
        )
    },

    // Advanced Components
    {
        type: 'pricing',
        name: 'Preços',
        icon: '💰',
        category: 'Avançado',
        description: 'Tabela de preços',
        tags: ['preços', 'planos', 'tabela'],
        isPro: true,
        preview: (
            <div className="bg-white rounded-lg p-3 border text-center">
                <div className="text-xs font-bold">Plano Pro</div>
                <div className="text-lg font-bold text-green-600">R$ 99</div>
                <div className="text-xs text-gray-500">/mês</div>
            </div>
        )
    },
    {
        type: 'testimonial',
        name: 'Depoimento',
        icon: '💬',
        category: 'Avançado',
        description: 'Depoimentos de clientes',
        tags: ['depoimento', 'review', 'social'],
        isPro: true,
        preview: (
            <div className="bg-white rounded-lg p-3 border">
                <div className="text-xs text-gray-600">"Produto incrível!"</div>
                <div className="flex items-center gap-2 mt-1">
                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                    <span className="text-xs text-gray-500">João Silva</span>
                </div>
            </div>
        )
    }
];

export const VisualComponentsLibrary: React.FC<VisualComponentsLibraryProps> = ({
    onAddComponent,
    className = ''
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Quiz', 'Conteúdo']));

    // Group components by category
    const groupedComponents = useMemo(() => {
        const filtered = VISUAL_COMPONENTS.filter(component =>
            component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            component.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            component.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
        );

        return filtered.reduce((groups, component) => {
            if (!groups[component.category]) {
                groups[component.category] = [];
            }
            groups[component.category].push(component);
            return groups;
        }, {} as Record<string, VisualComponentDef[]>);
    }, [searchTerm]);

    const toggleCategory = (category: string) => {
        const newExpanded = new Set(expandedCategories);
        if (newExpanded.has(category)) {
            newExpanded.delete(category);
        } else {
            newExpanded.add(category);
        }
        setExpandedCategories(newExpanded);
    };

    const getCategoryIcon = (category: string) => {
        switch (category) {
            case 'Quiz': return '🎯';
            case 'Conteúdo': return '📝';
            case 'Interativo': return '⚡';
            case 'Design': return '🎨';
            case 'Avançado': return '🚀';
            default: return '📦';
        }
    };

    return (
        <div className={`w-80 min-w-80 max-w-80 flex-shrink-0 h-screen bg-white border-r border-gray-200 flex flex-col ${className}`}>
            {/* Header */}
            <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <span className="text-white text-sm">✨</span>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Biblioteca Visual</h3>
                        <p className="text-xs text-gray-600">{Object.values(groupedComponents).flat().length} componentes</p>
                    </div>
                </div>

                {/* Search */}
                <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
                    <input
                        type="text"
                        placeholder="Buscar componentes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="flex-1 overflow-y-auto">
                <div className="p-2">
                    {Object.entries(groupedComponents).map(([category, components]) => (
                        <div key={category} className="mb-3">
                            {/* Category Header */}
                            <button
                                onClick={() => toggleCategory(category)}
                                className="w-full flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors group"
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">{getCategoryIcon(category)}</span>
                                    <span className="font-medium text-sm text-gray-900">{category}</span>
                                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                                        {components.length}
                                    </span>
                                </div>
                                <span className={`text-gray-400 transition-transform ${expandedCategories.has(category) ? 'rotate-180' : ''
                                    }`}>▼</span>
                            </button>

                            {/* Components Grid */}
                            <AnimatePresence>
                                {expandedCategories.has(category) && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="grid grid-cols-2 gap-2 p-2">
                                            {components.map((component) => (
                                                <motion.div
                                                    key={component.type}
                                                    whileHover={{ scale: 1.02, y: -2 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="relative group"
                                                >
                                                    {/* Component Card */}
                                                    <div
                                                        className="bg-gray-50 rounded-xl p-3 cursor-pointer border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
                                                        onClick={() => onAddComponent(component.type)}
                                                    >
                                                        {/* Badges */}
                                                        <div className="flex gap-1 mb-2">
                                                            {component.isNew && (
                                                                <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full font-medium">
                                                                    Novo
                                                                </span>
                                                            )}
                                                            {component.isPro && (
                                                                <span className="text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded-full font-medium">
                                                                    Pro
                                                                </span>
                                                            )}
                                                        </div>

                                                        {/* Preview */}
                                                        <div className="mb-2 h-16 flex items-center justify-center">
                                                            {component.preview}
                                                        </div>

                                                        {/* Info */}
                                                        <div className="text-center">
                                                            <div className="flex items-center justify-center gap-1 mb-1">
                                                                <span className="text-sm">{component.icon}</span>
                                                                <span className="font-medium text-xs text-gray-900">{component.name}</span>
                                                            </div>
                                                            <p className="text-xs text-gray-500 leading-tight">{component.description}</p>
                                                        </div>
                                                    </div>

                                                    {/* Hover Tooltip */}
                                                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                                                        Arrastar para adicionar
                                                    </div>
                                                </motion.div>
                                            ))}
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
                <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                    <span className="text-sm">✨</span>
                    <span>Clique para adicionar ao canvas</span>
                </div>
            </div>
        </div>
    );
};

export default VisualComponentsLibrary;