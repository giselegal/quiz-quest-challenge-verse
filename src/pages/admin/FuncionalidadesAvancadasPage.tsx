/**
 * ðŸŽ¯ PÃGINA DE SHOWCASE DAS FUNCIONALIDADES AVANÃ‡ADAS
 * 
 * Demonstra todas as funcionalidades empresariais ativadas
 */

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Target,
    Activity,
    Zap,
    Award,
    Palette,
    Eye,
    ArrowRight,
    CheckCircle,
    Star,
    Layers,
    Brain,
    Rocket,
    Globe,
    RefreshCw,
} from 'lucide-react';
import { Link } from 'wouter';

const FuncionalidadesAvancadasPage: React.FC = () => {
    const [activeDemo, setActiveDemo] = useState<string | null>(null);

    const advancedFeatures = [
        {
            id: 'analytics',
            title: 'Analytics Empresarial',
            description: 'Dashboard completo com mÃ©tricas em tempo real, funil de conversÃ£o e anÃ¡lise de comportamento',
            icon: Activity,
            badge: 'Empresarial',
            color: 'from-blue-500 to-blue-600',
            link: '/admin/analytics',
            features: [
                'Dashboard em tempo real',
                'Funil de conversÃ£o detalhado',
                'AnÃ¡lise de comportamento do usuÃ¡rio',
                'MÃ©tricas de performance',
                'RelatÃ³rios automatizados',
            ],
        },
        {
            id: 'abtest',
            title: 'Testes A/B AvanÃ§ados',
            description: 'ComparaÃ§Ã£o estatÃ­stica de versÃµes, otimizaÃ§Ã£o automÃ¡tica e anÃ¡lise de significÃ¢ncia',
            icon: Target,
            badge: 'OtimizaÃ§Ã£o',
            color: 'from-purple-500 to-purple-600',
            link: '/admin/ab-tests',
            features: [
                'Testes A/B automatizados',
                'AnÃ¡lise de significÃ¢ncia estatÃ­stica',
                'OtimizaÃ§Ã£o automÃ¡tica',
                'ComparaÃ§Ã£o de versÃµes',
                'ROI por variaÃ§Ã£o',
            ],
        },
        {
            id: 'dragdrop',
            title: 'Editor Drag & Drop',
            description: 'Sistema avanÃ§ado de arrastar e soltar com componentes modulares e preview em tempo real',
            icon: Layers,
            badge: 'Visual',
            color: 'from-green-500 to-green-600',
            link: '/editor',
            features: [
                'Arrastar e soltar intuitivo',
                'Componentes modulares',
                'Preview em tempo real',
                'Responsive design',
                'Biblioteca de componentes',
            ],
        },
        {
            id: 'automation',
            title: 'AutomaÃ§Ã£o & Webhooks',
            description: 'IntegraÃ§Ã£o automÃ¡tica com CRMs, email marketing e sistemas externos',
            icon: Zap,
            badge: 'AutomaÃ§Ã£o',
            color: 'from-yellow-500 to-yellow-600',
            link: '/admin/configuracao',
            features: [
                'Webhooks em tempo real',
                'IntegraÃ§Ã£o com CRMs',
                'Email marketing automÃ¡tico',
                'Triggers personalizados',
                'API completa',
            ],
        },
        {
            id: 'scoring',
            title: 'Sistema de PontuaÃ§Ã£o IA',
            description: 'Algoritmos inteligentes para scoring de leads e personalizaÃ§Ã£o de conteÃºdo',
            icon: Brain,
            badge: 'InteligÃªncia',
            color: 'from-indigo-500 to-indigo-600',
            link: '/admin/analytics',
            features: [
                'Scoring inteligente de leads',
                'PersonalizaÃ§Ã£o por IA',
                'Algoritmos de recomendaÃ§Ã£o',
                'SegmentaÃ§Ã£o automÃ¡tica',
                'PrediÃ§Ã£o de conversÃ£o',
            ],
        },
        {
            id: 'themes',
            title: 'Temas DinÃ¢micos',
            description: 'Sistema avanÃ§ado de temas com customizaÃ§Ã£o completa e brand consistency',
            icon: Palette,
            badge: 'Design',
            color: 'from-pink-500 to-pink-600',
            link: '/admin/criativos',
            features: [
                'Temas dinÃ¢micos',
                'CustomizaÃ§Ã£o completa',
                'Brand consistency',
                'VariaÃ§Ãµes automÃ¡ticas',
                'Design system integrado',
            ],
        },
    ];

    const stats = [
        { label: 'Funcionalidades Ativas', value: '15+', icon: CheckCircle },
        { label: 'Componentes AvanÃ§ados', value: '50+', icon: Layers },
        { label: 'IntegraÃ§Ãµes DisponÃ­veis', value: '25+', icon: Globe },
        { label: 'Performance Score', value: '98%', icon: Star },
    ];

    return (
        <div className="p-6 space-y-8">
            {/* Header com estatÃ­sticas */}
            <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-3 mb-4">
                    <h1
                        className="text-4xl font-bold text-[#1A0F3D]"
                        style={{ fontFamily: 'Playfair Display, serif' }}
                    >
                        Funcionalidades AvanÃ§adas
                    </h1>
                    <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                        <Rocket className="w-4 h-4 mr-1" />
                        Todas Ativadas
                    </Badge>
                </div>

                <p className="text-[#8F7A6A] text-lg max-w-3xl mx-auto">
                    Sua plataforma agora possui recursos empresariais completos para criaÃ§Ã£o,
                    anÃ¡lise e otimizaÃ§Ã£o de quizzes e funis de alta conversÃ£o.
                </p>

                {/* EstatÃ­sticas */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-white border border-[#E5DDD5] rounded-lg p-4 text-center">
                            <stat.icon className="w-6 h-6 mx-auto mb-2 text-[#B89B7A]" />
                            <div className="text-2xl font-bold text-[#1A0F3D]">{stat.value}</div>
                            <div className="text-sm text-[#8F7A6A]">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Funcionalidades em destaque */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {advancedFeatures.map((feature) => {
                    const Icon = feature.icon;
                    return (
                        <div
                            key={feature.id}
                            className="group bg-white border border-[#E5DDD5] rounded-xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
                            onClick={() => setActiveDemo(activeDemo === feature.id ? null : feature.id)}
                        >
                            {/* Header do card */}
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center text-white`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <Badge variant="secondary" className="text-xs">
                                    {feature.badge}
                                </Badge>
                            </div>

                            {/* ConteÃºdo */}
                            <h3 className="text-lg font-semibold text-[#1A0F3D] mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-[#8F7A6A] text-sm mb-4 line-clamp-2">
                                {feature.description}
                            </p>

                            {/* Features expandidas */}
                            {activeDemo === feature.id && (
                                <div className="space-y-2 mb-4 animate-in slide-in-from-top-2 duration-300">
                                    {feature.features.map((item, index) => (
                                        <div key={index} className="flex items-center gap-2 text-sm">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            <span className="text-[#6B4F43]">{item}</span>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* AÃ§Ãµes */}
                            <div className="flex gap-2">
                                <Link href={feature.link} className="flex-1">
                                    <Button
                                        className="w-full bg-[#B89B7A] hover:bg-[#A08968] text-white"
                                        size="sm"
                                    >
                                        Acessar
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setActiveDemo(activeDemo === feature.id ? null : feature.id);
                                    }}
                                >
                                    <Eye className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-[#B89B7A] to-[#A08968] rounded-xl p-8 text-center text-white">
                <Award className="w-16 h-16 mx-auto mb-4 opacity-80" />
                <h2 className="text-2xl font-bold mb-4">
                    Plataforma Completa Ativada
                </h2>
                <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                    VocÃª agora tem acesso a todas as funcionalidades empresariais.
                    Comece criando seu primeiro funil otimizado ou analise os dados existentes.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                    <Link href="/editor">
                        <Button className="bg-white text-[#1A0F3D] hover:bg-gray-100">
                            <Layers className="w-4 h-4 mr-2" />
                            Criar Funil
                        </Button>
                    </Link>
                    <Link href="/admin/analytics">
                        <Button variant="outline" className="border-white text-white hover:bg-white/10">
                            <Activity className="w-4 h-4 mr-2" />
                            Ver Analytics
                        </Button>
                    </Link>
                    <Link href="/admin/ab-tests">
                        <Button variant="outline" className="border-white text-white hover:bg-white/10">
                            <Target className="w-4 h-4 mr-2" />
                            Configurar A/B Test
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Indicador de atualizaÃ§Ã£o */}
            <div className="text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-lg text-green-700">
                    <RefreshCw className="w-4 h-4" />
                    <span className="text-sm font-medium">
                        AtualizaÃ§Ã£o aplicada com sucesso â€¢ Todas as funcionalidades estÃ£o operacionais
                    </span>
                </div>
            </div>
        </div>
    );
};

export default FuncionalidadesAvancadasPage;

