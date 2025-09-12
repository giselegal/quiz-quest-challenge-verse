import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TemplateMarketplace } from './TemplateMarketplace';

export interface Template {
    id: string;
    name: string;
    description: string;
    category: 'quiz' | 'landing' | 'lead-gen' | 'survey' | 'product' | 'educational';
    thumbnail: string;
    tags: string[];
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    estimatedTime: number; // minutes
    rating: number; // 1-5 stars
    downloads: number;
    author: string;
    premium: boolean;
    structure: TemplateFunnel;
    preview?: string;
}

export interface TemplateFunnel {
    name: string;
    description: string;
    stages: TemplateStage[];
    settings: TemplateSettings;
}

export interface TemplateStage {
    name: string;
    description: string;
    blocks: TemplateBlock[];
}

export interface TemplateBlock {
    type: string;
    content: any;
    style: any;
    config: any;
}

export interface TemplateSettings {
    theme: 'light' | 'dark' | 'colorful';
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
    layout: 'centered' | 'full-width' | 'sidebar';
}

interface TemplateGalleryProps {
    isVisible?: boolean;
    onTemplateSelect?: (template: Template) => void;
    onClose?: () => void;
}

export const TemplateGallery: React.FC<TemplateGalleryProps> = ({
    isVisible = false,
    onTemplateSelect,
    onClose
}) => {
    const [templates, setTemplates] = useState<Template[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
    const [sortBy, setSortBy] = useState<'popular' | 'newest' | 'rating'>('popular');
    const [isLoading, setIsLoading] = useState(false);
    const [showMarketplace, setShowMarketplace] = useState(false);    // Mock templates data
    const mockTemplates: Template[] = [
        {
            id: 'quiz-personality-1',
            name: '🧠 Quiz de Personalidade Profissional',
            description: 'Descubra qual carreira combina com sua personalidade através de perguntas inteligentes',
            category: 'quiz',
            thumbnail: '/api/placeholder/300/200',
            tags: ['personalidade', 'carreira', 'profissional', 'teste'],
            difficulty: 'intermediate',
            estimatedTime: 15,
            rating: 4.8,
            downloads: 1250,
            author: 'QuizMaster Pro',
            premium: false,
            structure: {
                name: 'Quiz Personalidade Profissional',
                description: 'Template completo com 10 perguntas e análise de resultados',
                stages: [
                    {
                        name: 'Introdução',
                        description: 'Página de boas-vindas',
                        blocks: [
                            { type: 'heading', content: { text: 'Descubra Sua Personalidade Profissional' }, style: {}, config: {} },
                            { type: 'text', content: { text: 'Responda 10 perguntas rápidas...' }, style: {}, config: {} },
                            { type: 'button', content: { text: 'Começar Quiz' }, style: {}, config: {} }
                        ]
                    },
                    {
                        name: 'Perguntas',
                        description: '10 perguntas de múltipla escolha',
                        blocks: [
                            { type: 'quiz-question', content: { question: 'Como você prefere trabalhar?', options: ['Em equipe', 'Sozinho', 'Híbrido'] }, style: {}, config: {} }
                        ]
                    },
                    {
                        name: 'Resultado',
                        description: 'Análise da personalidade',
                        blocks: [
                            { type: 'quiz-result', content: { title: 'Seu Perfil: {{result}}' }, style: {}, config: {} }
                        ]
                    }
                ],
                settings: {
                    theme: 'colorful',
                    primaryColor: '#3B82F6',
                    secondaryColor: '#10B981',
                    fontFamily: 'Inter',
                    layout: 'centered'
                }
            }
        },
        {
            id: 'landing-product-1',
            name: '🚀 Landing Page SaaS Moderna',
            description: 'Landing page conversiva para produtos SaaS com seções otimizadas para conversão',
            category: 'landing',
            thumbnail: '/api/placeholder/300/200',
            tags: ['saas', 'conversão', 'moderno', 'startup'],
            difficulty: 'advanced',
            estimatedTime: 30,
            rating: 4.9,
            downloads: 890,
            author: 'ConvertMax',
            premium: true,
            structure: {
                name: 'Landing SaaS Moderna',
                description: 'Template premium com 7 seções otimizadas',
                stages: [
                    {
                        name: 'Hero Section',
                        description: 'Seção principal com CTA',
                        blocks: [
                            { type: 'heading', content: { text: 'Transforme Sua Ideia em Realidade' }, style: {}, config: {} },
                            { type: 'text', content: { text: 'A plataforma mais intuitiva...' }, style: {}, config: {} },
                            { type: 'button', content: { text: 'Começar Grátis' }, style: {}, config: {} },
                            { type: 'image', content: { src: 'hero-image.png' }, style: {}, config: {} }
                        ]
                    }
                ],
                settings: {
                    theme: 'light',
                    primaryColor: '#6366F1',
                    secondaryColor: '#8B5CF6',
                    fontFamily: 'Inter',
                    layout: 'full-width'
                }
            }
        },
        {
            id: 'lead-gen-1',
            name: '📊 Formulário Lead Generation',
            description: 'Captura leads qualificados com formulário multi-etapa e ímã digital',
            category: 'lead-gen',
            thumbnail: '/api/placeholder/300/200',
            tags: ['leads', 'formulário', 'conversão', 'marketing'],
            difficulty: 'beginner',
            estimatedTime: 10,
            rating: 4.7,
            downloads: 2100,
            author: 'LeadGen Master',
            premium: false,
            structure: {
                name: 'Lead Generation Form',
                description: 'Formulário otimizado para captura de leads',
                stages: [
                    {
                        name: 'Oferta',
                        description: 'Apresentação do ímã digital',
                        blocks: [
                            { type: 'heading', content: { text: 'E-book Gratuito' }, style: {}, config: {} },
                            { type: 'text', content: { text: '50 Dicas de Marketing Digital' }, style: {}, config: {} }
                        ]
                    }
                ],
                settings: {
                    theme: 'light',
                    primaryColor: '#EF4444',
                    secondaryColor: '#F97316',
                    fontFamily: 'Inter',
                    layout: 'centered'
                }
            }
        },
        {
            id: 'survey-satisfaction-1',
            name: '⭐ Pesquisa de Satisfação',
            description: 'Colete feedback dos clientes com perguntas estruturadas e análise automática',
            category: 'survey',
            thumbnail: '/api/placeholder/300/200',
            tags: ['satisfação', 'feedback', 'clientes', 'nps'],
            difficulty: 'beginner',
            estimatedTime: 8,
            rating: 4.6,
            downloads: 1680,
            author: 'SurveyPro',
            premium: false,
            structure: {
                name: 'Pesquisa de Satisfação',
                description: 'Survey completo com NPS e feedback qualitativo',
                stages: [
                    {
                        name: 'Introdução',
                        description: 'Apresentação da pesquisa',
                        blocks: [
                            { type: 'heading', content: { text: 'Sua Opinião Importa' }, style: {}, config: {} },
                            { type: 'text', content: { text: 'Ajude-nos a melhorar nosso serviço' }, style: {}, config: {} }
                        ]
                    }
                ],
                settings: {
                    theme: 'light',
                    primaryColor: '#10B981',
                    secondaryColor: '#059669',
                    fontFamily: 'Inter',
                    layout: 'centered'
                }
            }
        },
        {
            id: 'product-showcase-1',
            name: '🛍️ Showcase de Produto',
            description: 'Apresente seus produtos de forma impactante com galeria e especificações',
            category: 'product',
            thumbnail: '/api/placeholder/300/200',
            tags: ['produto', 'e-commerce', 'showcase', 'vendas'],
            difficulty: 'intermediate',
            estimatedTime: 20,
            rating: 4.5,
            downloads: 950,
            author: 'EcommercePro',
            premium: true,
            structure: {
                name: 'Product Showcase',
                description: 'Template para apresentação de produtos',
                stages: [
                    {
                        name: 'Produto',
                        description: 'Apresentação principal',
                        blocks: [
                            { type: 'image', content: { src: 'product-image.png' }, style: {}, config: {} },
                            { type: 'heading', content: { text: 'Nome do Produto' }, style: {}, config: {} }
                        ]
                    }
                ],
                settings: {
                    theme: 'light',
                    primaryColor: '#F59E0B',
                    secondaryColor: '#D97706',
                    fontFamily: 'Inter',
                    layout: 'sidebar'
                }
            }
        },
        {
            id: 'educational-course-1',
            name: '📚 Curso Online Interativo',
            description: 'Template para cursos online com lições, exercícios e certificação',
            category: 'educational',
            thumbnail: '/api/placeholder/300/200',
            tags: ['educação', 'curso', 'interativo', 'certificação'],
            difficulty: 'advanced',
            estimatedTime: 45,
            rating: 4.9,
            downloads: 670,
            author: 'EduTech Solutions',
            premium: true,
            structure: {
                name: 'Curso Online Interativo',
                description: 'Plataforma completa de curso online',
                stages: [
                    {
                        name: 'Introdução do Curso',
                        description: 'Apresentação e objetivos',
                        blocks: [
                            { type: 'video', content: { src: 'intro-video.mp4' }, style: {}, config: {} },
                            { type: 'heading', content: { text: 'Bem-vindo ao Curso' }, style: {}, config: {} }
                        ]
                    }
                ],
                settings: {
                    theme: 'dark',
                    primaryColor: '#8B5CF6',
                    secondaryColor: '#A78BFA',
                    fontFamily: 'Inter',
                    layout: 'full-width'
                }
            }
        }
    ];

    // Initialize templates
    useEffect(() => {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setTemplates(mockTemplates);
            setIsLoading(false);
        }, 1000);
    }, []);

    // Filter and search templates
    const filteredTemplates = useMemo(() => {
        let filtered = templates;

        // Filter by category
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(t => t.category === selectedCategory);
        }

        // Filter by difficulty
        if (selectedDifficulty !== 'all') {
            filtered = filtered.filter(t => t.difficulty === selectedDifficulty);
        }

        // Search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(t =>
                t.name.toLowerCase().includes(query) ||
                t.description.toLowerCase().includes(query) ||
                t.tags.some(tag => tag.toLowerCase().includes(query)) ||
                t.author.toLowerCase().includes(query)
            );
        }

        // Sort templates
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'popular':
                    return b.downloads - a.downloads;
                case 'newest':
                    return a.id.localeCompare(b.id); // Mock sorting by ID
                case 'rating':
                    return b.rating - a.rating;
                default:
                    return 0;
            }
        });

        return filtered;
    }, [templates, selectedCategory, selectedDifficulty, searchQuery, sortBy]);

    // Get category counts
    const categoryStats = useMemo(() => {
        const stats: Record<string, number> = {};
        templates.forEach(t => {
            stats[t.category] = (stats[t.category] || 0) + 1;
        });
        return stats;
    }, [templates]);

    // Handle template selection
    const handleTemplateSelect = (template: Template) => {
        if (onTemplateSelect) {
            onTemplateSelect(template);
        }
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-bold">🎨 Galeria de Templates</h2>
                            <p className="text-purple-100">Acelere sua criação com templates profissionais</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Quick Stats */}
                    {/* Quick Stats */}
                    <div className="flex items-center gap-6 text-sm">
                        <span>📊 {templates.length} templates disponíveis</span>
                        <span>⭐ Média {templates.length > 0 ? (templates.reduce((sum, t) => sum + t.rating, 0) / templates.length).toFixed(1) : '0'}/5</span>
                        <span>📥 {templates.reduce((sum, t) => sum + t.downloads, 0).toLocaleString()} downloads</span>
                        <button
                            onClick={() => setShowMarketplace(true)}
                            className="px-3 py-1 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full text-sm font-medium transition"
                        >
                            🏪 Marketplace
                        </button>
                    </div>
                </div>

                <div className="flex flex-1 overflow-hidden">
                    {/* Sidebar Filters */}
                    <div className="w-80 bg-gray-50 p-6 overflow-y-auto">
                        {/* Search */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                🔍 Buscar Templates
                            </label>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Digite palavras-chave..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                📂 Categoria
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">Todas as categorias</option>
                                <option value="quiz">🧠 Quiz ({categoryStats.quiz || 0})</option>
                                <option value="landing">🚀 Landing Page ({categoryStats.landing || 0})</option>
                                <option value="lead-gen">📊 Lead Generation ({categoryStats['lead-gen'] || 0})</option>
                                <option value="survey">⭐ Survey ({categoryStats.survey || 0})</option>
                                <option value="product">🛍️ Produto ({categoryStats.product || 0})</option>
                                <option value="educational">📚 Educacional ({categoryStats.educational || 0})</option>
                            </select>
                        </div>

                        {/* Difficulty Filter */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                🎯 Dificuldade
                            </label>
                            <select
                                value={selectedDifficulty}
                                onChange={(e) => setSelectedDifficulty(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="all">Todas as dificuldades</option>
                                <option value="beginner">👶 Iniciante</option>
                                <option value="intermediate">👤 Intermediário</option>
                                <option value="advanced">🚀 Avançado</option>
                            </select>
                        </div>

                        {/* Sort */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                📈 Ordenar por
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="popular">📥 Mais populares</option>
                                <option value="newest">🆕 Mais recentes</option>
                                <option value="rating">⭐ Melhor avaliação</option>
                            </select>
                        </div>

                        {/* Quick Actions */}
                        <div className="space-y-2">
                            <button className="w-full px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition text-sm font-medium">
                                🎯 Templates Recomendados
                            </button>
                            <button className="w-full px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition text-sm font-medium">
                                ⭐ Favoritos
                            </button>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 p-6 overflow-y-auto">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-64">
                                <div className="text-center">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                                    <p className="text-gray-600">Carregando templates...</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Results Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-semibold text-gray-900">
                                        {filteredTemplates.length} templates encontrados
                                    </h3>
                                </div>

                                {/* Templates Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {filteredTemplates.map((template) => (
                                        <div
                                            key={template.id}
                                            className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer group"
                                            onClick={() => handleTemplateSelect(template)}
                                        >
                                            {/* Template Thumbnail */}
                                            <div className="h-40 bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                                                <div className="absolute inset-0 flex items-center justify-center text-4xl">
                                                    {template.category === 'quiz' && '🧠'}
                                                    {template.category === 'landing' && '🚀'}
                                                    {template.category === 'lead-gen' && '📊'}
                                                    {template.category === 'survey' && '⭐'}
                                                    {template.category === 'product' && '🛍️'}
                                                    {template.category === 'educational' && '📚'}
                                                </div>
                                                {template.premium && (
                                                    <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-medium">
                                                        👑 Premium
                                                    </div>
                                                )}
                                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
                                                    <div className="flex items-center gap-2 text-white text-xs">
                                                        <span>⏱️ {template.estimatedTime}min</span>
                                                        <span>⭐ {template.rating}</span>
                                                        <span>📥 {template.downloads}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Template Info */}
                                            <div className="p-4">
                                                <h4 className="font-semibold text-gray-900 mb-2 line-clamp-1">
                                                    {template.name}
                                                </h4>

                                                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                                    {template.description}
                                                </p>

                                                {/* Tags */}
                                                <div className="flex flex-wrap gap-1 mb-3">
                                                    {template.tags.slice(0, 3).map((tag) => (
                                                        <span
                                                            key={tag}
                                                            className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs"
                                                        >
                                                            {tag}
                                                        </span>
                                                    ))}
                                                    {template.tags.length > 3 && (
                                                        <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded text-xs">
                                                            +{template.tags.length - 3}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Footer */}
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <span className={`px-2 py-1 rounded text-xs font-medium ${template.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                                                            template.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                                                'bg-red-100 text-red-700'
                                                            }`}>
                                                            {template.difficulty === 'beginner' && '👶'}
                                                            {template.difficulty === 'intermediate' && '👤'}
                                                            {template.difficulty === 'advanced' && '🚀'}
                                                        </span>
                                                    </div>

                                                    <div className="text-xs text-gray-500">
                                                        por {template.author}
                                                    </div>
                                                </div>

                                                {/* Use Template Button */}
                                                <button className="w-full mt-3 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition group-hover:bg-blue-700">
                                                    🚀 Usar Template
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Empty State */}
                                {filteredTemplates.length === 0 && (
                                    <div className="text-center py-12">
                                        <div className="text-6xl mb-4">🔍</div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            Nenhum template encontrado
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            Tente ajustar seus filtros ou usar termos de busca diferentes
                                        </p>
                                        <button
                                            onClick={() => {
                                                setSearchQuery('');
                                                setSelectedCategory('all');
                                                setSelectedDifficulty('all');
                                            }}
                                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                                        >
                                            🔄 Limpar Filtros
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Template Marketplace */}
                <TemplateMarketplace
                    isVisible={showMarketplace}
                    onClose={() => setShowMarketplace(false)}
                    onTemplateSelect={handleTemplateSelect}
                />
            </div>
        </div>
    );
};

export default TemplateGallery;