import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import React, { useEffect, useState } from 'react';
import { Link } from 'wouter';
import {
    Brain,
    Target,
    TrendingUp,
    Users,
    Zap,
    Star,
    ArrowUpRight,
    ChevronRight,
    Lightbulb,
    BarChart3,
    Activity,
} from 'lucide-react'; interface IAInsight {
    id: string;
    title: string;
    description: string;
    type: 'optimization' | 'prediction' | 'recommendation' | 'alert';
    impact: 'high' | 'medium' | 'low';
    confidence: number;
    data: any;
}

const IAInsightsPage: React.FC = () => {
    const [insights, setInsights] = useState<IAInsight[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simular carregamento de insights de IA
        setTimeout(() => {
            setInsights([
                {
                    id: '1',
                    title: 'Otimizar Etapa 3 do Quiz',
                    description: 'A anÃ¡lise mostra que 23% dos usuÃ¡rios abandonam na etapa 3. Recomendamos simplificar a pergunta ou adicionar mais contexto visual.',
                    type: 'optimization',
                    impact: 'high',
                    confidence: 87,
                    data: { currentConversion: 77, potentialImprovement: 15 }
                },
                {
                    id: '2',
                    title: 'PÃºblico-Alvo Emergente Detectado',
                    description: 'Identificamos um novo segmento de usuÃ¡rios (25-35 anos, interesse em sustentabilidade) com alta taxa de conversÃ£o.',
                    type: 'prediction',
                    impact: 'medium',
                    confidence: 92,
                    data: { segmentSize: 1200, conversionRate: 34 }
                },
                {
                    id: '3',
                    title: 'Melhor HorÃ¡rio para PublicaÃ§Ã£o',
                    description: 'Baseado em dados histÃ³ricos, publicar entre 14h-16h aumenta o engajamento em 28%.',
                    type: 'recommendation',
                    impact: 'medium',
                    confidence: 83,
                    data: { currentEngagement: 12, potentialIncrease: 28 }
                },
                {
                    id: '4',
                    title: 'TendÃªncia de Queda Detectada',
                    description: 'Alertamos sobre uma possÃ­vel queda na conversÃ£o nos prÃ³ximos 7 dias se o padrÃ£o atual continuar.',
                    type: 'alert',
                    impact: 'high',
                    confidence: 76,
                    data: { currentTrend: -5, projectedImpact: -12 }
                }
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const getImpactColor = (impact: string) => {
        switch (impact) {
            case 'high': return 'bg-red-100 text-red-700';
            case 'medium': return 'bg-yellow-100 text-yellow-700';
            case 'low': return 'bg-green-100 text-green-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'optimization': return Target;
            case 'prediction': return TrendingUp;
            case 'recommendation': return Lightbulb;
            case 'alert': return Zap;
            default: return Brain;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#FAF9F7] to-[#F5F2E9] p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#B89B7A] mx-auto mb-4"></div>
                    <p className="text-[#6B4F43]">Analisando dados com IA...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FAF9F7] to-[#F5F2E9] p-6 space-y-8">
            {/* Header */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-[#B89B7A] rounded-xl flex items-center justify-center shadow-lg">
                            <Brain className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#1A0F3D] to-purple-600 bg-clip-text text-transparent">
                                Insights de IA
                            </h1>
                            <div className="flex items-center space-x-2 mt-1">
                                <Badge className="bg-gradient-to-r from-purple-100 to-[#B89B7A]/20 text-purple-700 border-0 px-3 py-1">
                                    <Brain className="h-3 w-3 mr-1" />
                                    Machine Learning
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="border-[#B89B7A]/40 text-[#B89B7A] bg-[#B89B7A]/10"
                                >
                                    <Activity className="h-3 w-3 mr-1" />
                                    {insights.length} insights ativos
                                </Badge>
                            </div>
                        </div>
                    </div>
                    <p className="text-lg text-[#6B4F43] max-w-2xl">
                        RecomendaÃ§Ãµes inteligentes baseadas em anÃ¡lise de dados e machine learning para otimizar seus quizzes e funis.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <Link href="/admin/analytics/real-time">
                        <Button
                            variant="outline"
                            className="border-[#B89B7A]/40 text-[#1A0F3D] hover:bg-[#B89B7A]/10"
                        >
                            <BarChart3 className="h-4 w-4 mr-2" />
                            Ver Analytics
                        </Button>
                    </Link>
                    <Link href="/admin/ab-testing">
                        <Button
                            variant="outline"
                            className="border-[#B89B7A]/40 text-[#1A0F3D] hover:bg-[#B89B7A]/10"
                        >
                            <Target className="h-4 w-4 mr-2" />
                            Criar Teste A/B
                        </Button>
                    </Link>
                </div>
            </div>

            {/* MÃ©tricas de Performance da IA */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-0 shadow-lg bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold text-[#1A0F3D]">
                            PrecisÃ£o da IA
                        </CardTitle>
                        <Brain className="h-5 w-5 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-[#1A0F3D] mb-1">87%</div>
                        <div className="flex items-center text-sm mb-3">
                            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-green-500 font-semibold">+3.2%</span>
                            <span className="ml-1 text-[#6B4F43]">vs mÃªs anterior</span>
                        </div>
                        <Progress value={87} className="h-2" />
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold text-[#1A0F3D]">
                            Insights Aplicados
                        </CardTitle>
                        <Target className="h-5 w-5 text-[#B89B7A]" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-[#1A0F3D] mb-1">12</div>
                        <div className="flex items-center text-sm mb-3">
                            <ArrowUpRight className="h-4 w-4 text-[#B89B7A] mr-1" />
                            <span className="text-[#B89B7A] font-semibold">+5 este mÃªs</span>
                        </div>
                        <Progress value={75} className="h-2" />
                    </CardContent>
                </Card>

                <Card className="border-0 shadow-lg bg-white">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-semibold text-[#1A0F3D]">
                            Impacto MÃ©dio
                        </CardTitle>
                        <TrendingUp className="h-5 w-5 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-[#1A0F3D] mb-1">+18%</div>
                        <div className="flex items-center text-sm mb-3">
                            <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                            <span className="text-green-500 font-semibold">ConversÃ£o</span>
                        </div>
                        <Progress value={85} className="h-2" />
                    </CardContent>
                </Card>
            </div>

            {/* Lista de Insights */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-[#1A0F3D]">Insights Recomendados</h2>
                    <Badge className="bg-purple-100 text-purple-700">
                        {insights.filter(i => i.impact === 'high').length} alta prioridade
                    </Badge>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {insights.map((insight) => {
                        const IconComponent = getTypeIcon(insight.type);
                        return (
                            <Card key={insight.id} className="border-0 shadow-lg bg-white hover:shadow-xl transition-all duration-300">
                                <CardHeader className="pb-3">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-[#B89B7A] rounded-lg flex items-center justify-center">
                                                <IconComponent className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <CardTitle className="text-lg font-bold text-[#1A0F3D]">
                                                    {insight.title}
                                                </CardTitle>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Badge className={getImpactColor(insight.impact)}>
                                                        {insight.impact === 'high' ? 'Alta' : insight.impact === 'medium' ? 'MÃ©dia' : 'Baixa'} prioridade
                                                    </Badge>
                                                    <Badge variant="outline" className="text-xs">
                                                        {insight.confidence}% confianÃ§a
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-[#6B4F43] text-sm leading-relaxed">
                                        {insight.description}
                                    </p>

                                    {/* Dados especÃ­ficos do insight */}
                                    {insight.type === 'optimization' && (
                                        <div className="bg-[#FAF9F7] rounded-lg p-3 space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-[#6B4F43]">ConversÃ£o atual:</span>
                                                <span className="font-semibold text-[#1A0F3D]">{insight.data.currentConversion}%</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-[#6B4F43]">Melhoria potencial:</span>
                                                <span className="font-semibold text-green-600">+{insight.data.potentialImprovement}%</span>
                                            </div>
                                        </div>
                                    )}

                                    {insight.type === 'prediction' && (
                                        <div className="bg-[#FAF9F7] rounded-lg p-3 space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-[#6B4F43]">Tamanho do segmento:</span>
                                                <span className="font-semibold text-[#1A0F3D]">{insight.data.segmentSize.toLocaleString()} usuÃ¡rios</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-[#6B4F43]">Taxa de conversÃ£o:</span>
                                                <span className="font-semibold text-green-600">{insight.data.conversionRate}%</span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between pt-2">
                                        <div className="flex items-center gap-2">
                                            <Star className="h-4 w-4 text-yellow-500" />
                                            <span className="text-xs text-[#6B4F43]">Baseado em ML</span>
                                        </div>
                                        <Button size="sm" variant="outline" className="border-[#B89B7A]/40">
                                            Aplicar
                                            <ChevronRight className="h-3 w-3 ml-1" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>
            </div>

            {/* AÃ§Ãµes e IntegraÃ§Ãµes */}
            <Card className="border-0 shadow-lg bg-white">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-[#1A0F3D]">IntegraÃ§Ãµes de IA DisponÃ­veis</CardTitle>
                    <p className="text-[#6B4F43]">Funcionalidades de inteligÃªncia artificial ativas no sistema</p>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-3 p-4 bg-[#FAF9F7] rounded-lg">
                            <Brain className="h-8 w-8 text-purple-500" />
                            <div>
                                <h4 className="font-semibold text-[#1A0F3D]">AnÃ¡lise Preditiva</h4>
                                <p className="text-xs text-[#6B4F43]">PrevisÃ£o de comportamento</p>
                            </div>
                            <Badge className="ml-auto bg-green-100 text-green-700">Ativo</Badge>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-[#FAF9F7] rounded-lg">
                            <Target className="h-8 w-8 text-[#B89B7A]" />
                            <div>
                                <h4 className="font-semibold text-[#1A0F3D]">OtimizaÃ§Ã£o A/B</h4>
                                <p className="text-xs text-[#6B4F43]">Testes automatizados</p>
                            </div>
                            <Badge className="ml-auto bg-green-100 text-green-700">Ativo</Badge>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-[#FAF9F7] rounded-lg">
                            <Users className="h-8 w-8 text-blue-500" />
                            <div>
                                <h4 className="font-semibold text-[#1A0F3D]">SegmentaÃ§Ã£o Smart</h4>
                                <p className="text-xs text-[#6B4F43]">IdentificaÃ§Ã£o de pÃºblicos</p>
                            </div>
                            <Badge className="ml-auto bg-green-100 text-green-700">Ativo</Badge>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default IAInsightsPage;

