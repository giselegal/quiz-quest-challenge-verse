import React, { useState, useEffect } from 'react';
import { Template } from '@/types/template';

interface MarketplaceStats {
    totalTemplates: number;
    totalDownloads: number;
    averageRating: number;
    topCategories: Array<{ category: string; count: number; growth: number }>;
    featuredTemplates: Template[];
    recentActivity: Array<{
        id: string;
        type: 'download' | 'rating' | 'new_template';
        template: string;
        user: string;
        timestamp: Date;
    }>;
}

interface TemplateMarketplaceProps {
    isVisible: boolean;
    onClose: () => void;
    onTemplateSelect: (template: Template) => void;
}

export const TemplateMarketplace: React.FC<TemplateMarketplaceProps> = ({
    isVisible,
    onClose,
    onTemplateSelect
}) => {
    const [stats, setStats] = useState<MarketplaceStats | null>(null);
    const [activeTab, setActiveTab] = useState<'dashboard' | 'trending' | 'new' | 'community'>('dashboard');
    const [isLoading, setIsLoading] = useState(false);

    // Mock marketplace data
    const mockStats: MarketplaceStats = {
        totalTemplates: 156,
        totalDownloads: 12450,
        averageRating: 4.6,
        topCategories: [
            { category: 'quiz', count: 45, growth: 12.5 },
            { category: 'landing', count: 38, growth: 8.3 },
            { category: 'lead-gen', count: 32, growth: 15.2 },
            { category: 'survey', count: 28, growth: 5.7 },
            { category: 'educational', count: 13, growth: 22.1 }
        ],
        featuredTemplates: [], // Will be populated with mock templates
        recentActivity: [
            {
                id: '1',
                type: 'download',
                template: 'Quiz de Personalidade Profissional',
                user: 'Maria Silva',
                timestamp: new Date(Date.now() - 1000 * 60 * 15)
            },
            {
                id: '2',
                type: 'rating',
                template: 'Landing Page SaaS Moderna',
                user: 'João Santos',
                timestamp: new Date(Date.now() - 1000 * 60 * 32)
            },
            {
                id: '3',
                type: 'new_template',
                template: 'Formulário de Feedback Avançado',
                user: 'Ana Costa',
                timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2)
            }
        ]
    };

    // Load marketplace data
    useEffect(() => {
        if (isVisible && !stats) {
            setIsLoading(true);
            setTimeout(() => {
                setStats(mockStats);
                setIsLoading(false);
            }, 800);
        }
    }, [isVisible, stats]);

    const formatNumber = (num: number) => {
        if (num >= 1000) {
            return `${(num / 1000).toFixed(1)}k`;
        }
        return num.toString();
    };

    const getActivityIcon = (type: string) => {
        switch (type) {
            case 'download': return '📥';
            case 'rating': return '⭐';
            case 'new_template': return '✨';
            default: return '📋';
        }
    };

    const getActivityText = (activity: MarketplaceStats['recentActivity'][0]) => {
        switch (activity.type) {
            case 'download':
                return `${activity.user} baixou "${activity.template}"`;
            case 'rating':
                return `${activity.user} avaliou "${activity.template}"`;
            case 'new_template':
                return `${activity.user} publicou "${activity.template}"`;
            default:
                return `${activity.user} interagiu com "${activity.template}"`;
        }
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-2xl font-bold">🏪 Template Marketplace</h2>
                            <p className="text-blue-100">Explore, descubra e compartilhe templates incríveis</p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 flex items-center justify-center transition"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex gap-1 bg-white bg-opacity-20 rounded-lg p-1">
                        {[
                            { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
                            { id: 'trending', label: '🔥 Trending', icon: '🔥' },
                            { id: 'new', label: '✨ Novos', icon: '✨' },
                            { id: 'community', label: '👥 Comunidade', icon: '👥' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${activeTab === tab.id
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-white hover:bg-white hover:bg-opacity-20'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-hidden">
                    {isLoading ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 mx-auto mb-6"></div>
                                <p className="text-gray-600">Carregando marketplace...</p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Dashboard Tab */}
                            {activeTab === 'dashboard' && stats && (
                                <div className="p-6 overflow-y-auto">
                                    {/* Stats Cards */}
                                    <div className="grid grid-cols-4 gap-6 mb-8">
                                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="text-sm font-medium text-blue-700">Total de Templates</h3>
                                                <span className="text-2xl">📚</span>
                                            </div>
                                            <div className="text-3xl font-bold text-blue-900">{stats.totalTemplates}</div>
                                            <p className="text-xs text-blue-600 mt-1">+12 esta semana</p>
                                        </div>

                                        <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="text-sm font-medium text-green-700">Downloads Totais</h3>
                                                <span className="text-2xl">📥</span>
                                            </div>
                                            <div className="text-3xl font-bold text-green-900">{formatNumber(stats.totalDownloads)}</div>
                                            <p className="text-xs text-green-600 mt-1">+247 hoje</p>
                                        </div>

                                        <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-6 rounded-xl border border-yellow-200">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="text-sm font-medium text-yellow-700">Avaliação Média</h3>
                                                <span className="text-2xl">⭐</span>
                                            </div>
                                            <div className="text-3xl font-bold text-yellow-900">{stats.averageRating}</div>
                                            <p className="text-xs text-yellow-600 mt-1">de 5 estrelas</p>
                                        </div>

                                        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                                            <div className="flex items-center justify-between mb-3">
                                                <h3 className="text-sm font-medium text-purple-700">Crescimento</h3>
                                                <span className="text-2xl">📈</span>
                                            </div>
                                            <div className="text-3xl font-bold text-purple-900">+18%</div>
                                            <p className="text-xs text-purple-600 mt-1">último mês</p>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-8">
                                        {/* Top Categories */}
                                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                📂 Categorias Populares
                                            </h3>
                                            <div className="space-y-4">
                                                {stats.topCategories.map((category, index) => (
                                                    <div key={category.category} className="flex items-center justify-between">
                                                        <div className="flex items-center gap-3">
                                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${index === 0 ? 'bg-gold text-yellow-800' :
                                                                index === 1 ? 'bg-gray-200 text-gray-700' :
                                                                    index === 2 ? 'bg-orange-100 text-orange-700' :
                                                                        'bg-gray-100 text-gray-600'
                                                                }`}>
                                                                {index + 1}
                                                            </div>
                                                            <div>
                                                                <div className="font-medium text-gray-900 capitalize">
                                                                    {category.category.replace('-', ' ')}
                                                                </div>
                                                                <div className="text-xs text-gray-500">
                                                                    {category.count} templates
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="text-sm font-medium text-green-600">
                                                                +{category.growth}%
                                                            </div>
                                                            <div className="text-xs text-gray-500">crescimento</div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Recent Activity */}
                                        <div className="bg-white rounded-xl border border-gray-200 p-6">
                                            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                                📊 Atividade Recente
                                            </h3>
                                            <div className="space-y-3">
                                                {stats.recentActivity.map((activity) => (
                                                    <div key={activity.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                                        <span className="text-lg">{getActivityIcon(activity.type)}</span>
                                                        <div className="flex-1">
                                                            <p className="text-sm text-gray-900">{getActivityText(activity)}</p>
                                                            <p className="text-xs text-gray-500 mt-1">
                                                                {activity.timestamp.toLocaleTimeString('pt-BR', {
                                                                    hour: '2-digit',
                                                                    minute: '2-digit'
                                                                })}
                                                            </p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <button className="w-full mt-4 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium transition">
                                                Ver toda atividade
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Trending Tab */}
                            {activeTab === 'trending' && (
                                <div className="p-6">
                                    <div className="text-center py-12">
                                        <div className="text-6xl mb-4">🔥</div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Templates em Alta</h3>
                                        <p className="text-gray-600">Os templates mais populares da semana</p>
                                        <button className="mt-4 px-6 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition">
                                            Em breve...
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* New Tab */}
                            {activeTab === 'new' && (
                                <div className="p-6">
                                    <div className="text-center py-12">
                                        <div className="text-6xl mb-4">✨</div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Novos Templates</h3>
                                        <p className="text-gray-600">Templates recém-adicionados à plataforma</p>
                                        <button className="mt-4 px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition">
                                            Em breve...
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Community Tab */}
                            {activeTab === 'community' && (
                                <div className="p-6">
                                    <div className="text-center py-12">
                                        <div className="text-6xl mb-4">👥</div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Comunidade</h3>
                                        <p className="text-gray-600">Conecte-se com outros criadores e compartilhe seus templates</p>
                                        <button className="mt-4 px-6 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg font-medium transition">
                                            Em breve...
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 border-t">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                            💡 Dica: Use templates como ponto de partida para seus projetos únicos
                        </div>
                        <div className="flex gap-3">
                            <button className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg text-sm font-medium transition">
                                📝 Criar Template
                            </button>
                            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition">
                                🎨 Explorar Galeria
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TemplateMarketplace;