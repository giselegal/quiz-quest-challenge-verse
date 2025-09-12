import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Tipos locais simplificados para evitar conflitos
interface SimpleTemplate {
    id: string;
    name: string;
    description: string;
    category: 'quiz' | 'landing' | 'lead-gen' | 'survey' | 'product' | 'educational';
    thumbnail: string;
    tags: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedTime: number;
    rating: number;
    downloads: number;
    author: string;
    premium: boolean;
    structure: any; // Simplificado
    preview?: string;
}

interface TemplateGalleryProps {
    isVisible: boolean;
    onTemplateSelect: (template: SimpleTemplate) => void;
    onClose: () => void;
}

// Template Marketplace será carregado dinamicamente
const TemplateMarketplace = React.lazy(() =>
    import('./TemplateMarketplace').then(m => ({ default: m.TemplateMarketplace }))
);

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({
    isVisible,
    onTemplateSelect,
    onClose
}) => {
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [showMarketplace, setShowMarketplace] = useState(false);
    const [templates, setTemplates] = useState<SimpleTemplate[]>([]);
    const [loading, setLoading] = useState(true);

    // Templates simplificados com estrutura básica
    const mockTemplates: SimpleTemplate[] = useMemo(() => [
        {
            id: 'personality-quiz',
            name: 'Quiz de Personalidade Profissional',
            description: 'Descubra qual perfil profissional combina com você',
            category: 'quiz',
            thumbnail: '/templates/personality-quiz.png',
            tags: ['personalidade', 'carreira', 'profissional'],
            difficulty: 'beginner',
            estimatedTime: 5,
            rating: 4.8,
            downloads: 12543,
            author: 'QuizQuest Team',
            premium: false,
            structure: {
                name: 'Quiz de Personalidade',
                stages: [
                    { name: 'Introdução', blocks: [] },
                    { name: 'Perguntas', blocks: [] },
                    { name: 'Resultado', blocks: [] }
                ],
                settings: { theme: 'colorful' }
            }
        },
        {
            id: 'landing-page-saas',
            name: 'Landing Page SaaS',
            description: 'Converta visitantes em clientes com esta landing page otimizada',
            category: 'landing',
            thumbnail: '/templates/landing-saas.png',
            tags: ['saas', 'conversão', 'landing'],
            difficulty: 'intermediate',
            estimatedTime: 15,
            rating: 4.9,
            downloads: 8764,
            author: 'Design Pro',
            premium: true,
            structure: {
                name: 'Landing SaaS',
                stages: [
                    { name: 'Hero', blocks: [] },
                    { name: 'Benefícios', blocks: [] },
                    { name: 'CTA', blocks: [] }
                ],
                settings: { theme: 'light' }
            }
        }
    ], []);

    useEffect(() => {
        if (isVisible) {
            setLoading(true);
            // Simular carregamento
            setTimeout(() => {
                setTemplates(mockTemplates);
                setLoading(false);
            }, 500);
        }
    }, [isVisible, mockTemplates]);

    const filteredTemplates = useMemo(() => {
        if (activeCategory === 'all') return templates;
        return templates.filter(template => template.category === activeCategory);
    }, [templates, activeCategory]);

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-5/6 overflow-hidden"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="border-b border-gray-200 p-6">
                        <div className="flex justify-between items-center">
                            <h2 className="text-2xl font-bold text-gray-900">Galeria de Templates</h2>
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => setShowMarketplace(true)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Ver Marketplace
                                </button>
                                <button
                                    onClick={onClose}
                                    className="text-gray-500 hover:text-gray-700"
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-6 h-full overflow-y-auto">
                        {/* Categories */}
                        <div className="flex gap-2 mb-6">
                            {['all', 'quiz', 'landing', 'lead-gen', 'survey'].map(category => (
                                <button
                                    key={category}
                                    onClick={() => setActiveCategory(category)}
                                    className={`px-4 py-2 rounded-lg transition-colors ${activeCategory === category
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {category === 'all' ? 'Todos' : category.charAt(0).toUpperCase() + category.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* Templates Grid */}
                        {loading ? (
                            <div className="flex justify-center items-center h-64">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {filteredTemplates.map(template => (
                                    <motion.div
                                        key={template.id}
                                        whileHover={{ scale: 1.02 }}
                                        className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
                                        onClick={() => onTemplateSelect(template)}
                                    >
                                        <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                                            <span className="text-gray-500">Preview</span>
                                        </div>
                                        <div className="p-4">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-semibold text-gray-900 text-sm">{template.name}</h3>
                                                {template.premium && (
                                                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                                                        Pro
                                                    </span>
                                                )}
                                            </div>
                                            <p className="text-gray-600 text-sm mb-3">{template.description}</p>
                                            <div className="flex items-center justify-between text-xs text-gray-500">
                                                <span>⭐ {template.rating}</span>
                                                <span>{template.downloads.toLocaleString()} downloads</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Marketplace Modal */}
                    {showMarketplace && (
                        <React.Suspense fallback={<div>Carregando...</div>}>
                            <TemplateMarketplace
                                isVisible={showMarketplace}
                                onClose={() => setShowMarketplace(false)}
                                onTemplateSelect={onTemplateSelect}
                            />
                        </React.Suspense>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default TemplateGallery;