/**
 * ðŸ“Š PÃGINA DE ANALYTICS DO ADMIN AVANÃ‡ADO
 * 
 * Integra o dashboard real-time com dados do Supabase
 * e componentes avanÃ§ados de analytics
 */

import React, { useState, useEffect } from 'react';
// OTIMIZAÃ‡Ã•ES: Usar componentes avanÃ§ados ao invÃ©s dos bÃ¡sicos
import AdvancedAnalytics from '@/components/dashboard/AdvancedAnalytics';
import { AnalyticsDashboard } from '@/components/admin/analytics/AdvancedAnalytics';
import ABTestComparison from '@/components/analytics/ABTestComparison';
// OTIMIZAÃ‡Ã•ES: Usar serviÃ§os avanÃ§ados de analytics
import { QuizAnalyticsService } from '@/services/core/QuizAnalyticsService';
import * as realTimeAnalytics from '@/services/realTimeAnalytics';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  BarChart3,
  Target,
  TrendingUp,
  Users,
  Activity,
  Zap,
  RefreshCw
} from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedQuizId, setSelectedQuizId] = useState('quiz-default');
  const [isAdvancedMode, setIsAdvancedMode] = useState(false);

  // Mock data de quizzes para demonstraÃ§Ã£o
  const availableQuizzes = [
    { id: 'quiz-default', name: 'Quiz Principal', status: 'active' },
    { id: 'quiz-roupa', name: 'Com que roupa eu vou?', status: 'active' },
    { id: 'quiz-teste', name: 'Quiz de Teste', status: 'draft' },
  ];

  const tabs = [
    {
      id: 'dashboard',
      label: 'Dashboard Geral',
      icon: BarChart3,
      description: 'VisÃ£o consolidada de todos os quizzes'
    },
    {
      id: 'advanced',
      label: 'Analytics AvanÃ§ado',
      icon: Activity,
      description: 'AnÃ¡lise detalhada por quiz'
    },
    {
      id: 'abtest',
      label: 'Testes A/B',
      icon: Target,
      description: 'ComparaÃ§Ã£o e otimizaÃ§Ã£o'
    },
  ];

  useEffect(() => {
    // Ativar modo avanÃ§ado automaticamente ao entrar na pÃ¡gina
    setIsAdvancedMode(true);
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Header com status de funcionalidades avanÃ§adas */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <h1
              className="text-3xl font-bold text-[#1A0F3D]"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              Analytics & MÃ©tricas
            </h1>
            <Badge variant="default" className="bg-green-500 hover:bg-green-600">
              <Zap className="w-3 h-3 mr-1" />
              Funcionalidades AvanÃ§adas Ativas
            </Badge>
          </div>
          <p className="text-[#8F7A6A]">
            Dashboard empresarial com analytics em tempo real, testes A/B e anÃ¡lise de conversÃ£o
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={isAdvancedMode ? "default" : "outline"}
            onClick={() => setIsAdvancedMode(!isAdvancedMode)}
            className="flex items-center gap-2"
          >
            <Activity className="w-4 h-4" />
            {isAdvancedMode ? 'Modo AvanÃ§ado' : 'Ativar Modo AvanÃ§ado'}
          </Button>
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sincronizar
          </Button>
        </div>
      </div>

      {/* Indicadores de funcionalidades ativas */}
      {isAdvancedMode && (
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-green-800 flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Funcionalidades Empresariais Ativadas
              </h3>
              <p className="text-green-700 text-sm mt-1">
                Analytics avanÃ§ado, testes A/B, funil de conversÃ£o e dashboards em tempo real
              </p>
            </div>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div className="flex flex-col items-center">
                <BarChart3 className="w-5 h-5 text-blue-600 mb-1" />
                <span className="text-xs text-blue-700">Analytics</span>
              </div>
              <div className="flex flex-col items-center">
                <Target className="w-5 h-5 text-purple-600 mb-1" />
                <span className="text-xs text-purple-700">A/B Tests</span>
              </div>
              <div className="flex flex-col items-center">
                <TrendingUp className="w-5 h-5 text-green-600 mb-1" />
                <span className="text-xs text-green-700">ConversÃ£o</span>
              </div>
              <div className="flex flex-col items-center">
                <Users className="w-5 h-5 text-orange-600 mb-1" />
                <span className="text-xs text-orange-700">Comportamento</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NavegaÃ§Ã£o por tabs */}
      <div className="border-b border-[#E5DDD5]">
        <nav className="-mb-px flex space-x-8">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${activeTab === tab.id
                  ? 'border-[#B89B7A] text-[#B89B7A]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <Icon className="w-4 h-4" />
                <div className="text-left">
                  <div>{tab.label}</div>
                  <div className="text-xs text-gray-400 group-hover:text-gray-500">
                    {tab.description}
                  </div>
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Seletor de quiz para analytics avanÃ§ado */}
      {(activeTab === 'advanced' || activeTab === 'abtest') && (
        <div className="bg-white border border-[#E5DDD5] rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-[#1A0F3D] mb-1">Selecionar Quiz para AnÃ¡lise</h3>
              <p className="text-sm text-[#8F7A6A]">
                Escolha o quiz para anÃ¡lise detalhada e testes A/B
              </p>
            </div>
            <select
              value={selectedQuizId}
              onChange={(e) => setSelectedQuizId(e.target.value)}
              className="px-3 py-2 border border-[#D4C4A0] rounded-md focus:ring-[#B89B7A] focus:border-[#B89B7A]"
            >
              {availableQuizzes.map(quiz => (
                <option key={quiz.id} value={quiz.id}>
                  {quiz.name} {quiz.status === 'draft' ? '(Rascunho)' : ''}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* ConteÃºdo das tabs */}
      <div className="min-h-[600px]">
        {activeTab === 'dashboard' && (
          <div>
            <AdvancedAnalytics />
          </div>
        )}

        {activeTab === 'advanced' && isAdvancedMode && (
          <div>
            <AnalyticsDashboard />
          </div>
        )}

        {activeTab === 'abtest' && isAdvancedMode && (
          <div className="bg-white border border-[#E5DDD5] rounded-lg">
            <ABTestComparison timeRange="7d" />
          </div>
        )}

        {(activeTab === 'advanced' || activeTab === 'abtest') && !isAdvancedMode && (
          <div className="bg-white border border-[#E5DDD5] rounded-lg p-12 text-center">
            <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#1A0F3D] mb-2">
              Funcionalidades AvanÃ§adas DisponÃ­veis
            </h3>
            <p className="text-[#8F7A6A] mb-6 max-w-md mx-auto">
              Ative o modo avanÃ§ado para acessar analytics detalhado,
              testes A/B e anÃ¡lises de conversÃ£o empresariais.
            </p>
            <Button onClick={() => setIsAdvancedMode(true)} className="bg-[#B89B7A] hover:bg-[#A08968]">
              <Zap className="w-4 h-4 mr-2" />
              Ativar Funcionalidades AvanÃ§adas
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalyticsPage;

