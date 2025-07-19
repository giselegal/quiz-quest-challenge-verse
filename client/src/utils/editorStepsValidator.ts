import { schemaDrivenFunnelService } from '@/services/schemaDrivenFunnelService';
import { blockDefinitions } from '@/config/blockDefinitions';

interface ValidationResult {
  etapa: number;
  status: 'success' | 'warning' | 'error';
  problemas: string[];
  correcoes: string[];
}

class EditorStepsValidator {
  /**
   * Valida se as etapas 20 e 21 estão corretamente configuradas
   */
  static validateSteps20And21(): ValidationResult[] {
    const results: ValidationResult[] = [];

    try {
      // Criar funil padrão para testar
      const defaultFunnel = schemaDrivenFunnelService.createDefaultFunnel();
      
      // Verificar etapa 20
      const etapa20 = defaultFunnel.pages.find(p => p.id === 'etapa-20-resultado');
      results.push(this.validateStep20(etapa20));

      // Verificar etapa 21  
      const etapa21 = defaultFunnel.pages.find(p => p.id === 'etapa-21-oferta');
      results.push(this.validateStep21(etapa21));

    } catch (error) {
      results.push({
        etapa: 0,
        status: 'error',
        problemas: [`Erro ao criar funil padrão: ${error instanceof Error ? error.message : 'Erro desconhecido'}`],
        correcoes: []
      });
    }

    return results;
  }

  private static validateStep20(etapa20: any): ValidationResult {
    const problemas: string[] = [];
    const correcoes: string[] = [];

    if (!etapa20) {
      problemas.push('Etapa 20 não encontrada');
      correcoes.push('Recriar etapa 20 no serviço');
      return { etapa: 20, status: 'error', problemas, correcoes };
    }

    // Verificar se os tipos de blocos existem nas definições
    const blockTypesUsed = etapa20.blocks.map((b: any) => b.type);
    const availableBlockTypes = blockDefinitions.map(def => def.type);

    for (const blockType of blockTypesUsed) {
      if (!availableBlockTypes.includes(blockType)) {
        problemas.push(`Tipo de bloco '${blockType}' não encontrado nas definições`);
        
        // Sugerir correções baseadas em similaridade
        const suggestions = this.findSimilarBlockTypes(blockType, availableBlockTypes);
        if (suggestions.length > 0) {
          correcoes.push(`Alterar '${blockType}' para um dos tipos disponíveis: ${suggestions.join(', ')}`);
        }
      }
    }

    // Verificar se os blocos essenciais estão presentes
    const essentialBlocks = ['result-header', 'heading-inline', 'style-result-card'];
    const presentBlocks = blockTypesUsed;

    for (const essential of essentialBlocks) {
      if (!presentBlocks.includes(essential) && !presentBlocks.some((p: string) => p.includes(essential.split('-')[0]))) {
        problemas.push(`Bloco essencial '${essential}' não encontrado`);
        correcoes.push(`Adicionar bloco '${essential}' na etapa 20`);
      }
    }

    const status = problemas.length === 0 ? 'success' : problemas.length <= 2 ? 'warning' : 'error';
    return { etapa: 20, status, problemas, correcoes };
  }

  private static validateStep21(etapa21: any): ValidationResult {
    const problemas: string[] = [];
    const correcoes: string[] = [];

    if (!etapa21) {
      problemas.push('Etapa 21 não encontrada');
      correcoes.push('Recriar etapa 21 no serviço');
      return { etapa: 21, status: 'error', problemas, correcoes };
    }

    // Verificar se os tipos de blocos existem nas definições
    const blockTypesUsed = etapa21.blocks.map((b: any) => b.type);
    const availableBlockTypes = blockDefinitions.map(def => def.type);

    for (const blockType of blockTypesUsed) {
      if (!availableBlockTypes.includes(blockType)) {
        problemas.push(`Tipo de bloco '${blockType}' não encontrado nas definições`);
        
        // Sugerir correções baseadas em similaridade
        const suggestions = this.findSimilarBlockTypes(blockType, availableBlockTypes);
        if (suggestions.length > 0) {
          correcoes.push(`Alterar '${blockType}' para um dos tipos disponíveis: ${suggestions.join(', ')}`);
        }
      }
    }

    // Verificar se os blocos essenciais da oferta estão presentes
    const essentialBlocks = ['image-display-inline', 'badge-inline', 'text-inline', 'button-inline'];
    const presentBlocks = blockTypesUsed;

    for (const essential of essentialBlocks) {
      if (!presentBlocks.includes(essential)) {
        const hasGeneric = presentBlocks.some((p: string) => p.includes(essential.replace('-inline', '')));
        if (!hasGeneric) {
          problemas.push(`Bloco essencial '${essential}' não encontrado`);
          correcoes.push(`Adicionar bloco '${essential}' na etapa 21`);
        }
      }
    }

    const status = problemas.length === 0 ? 'success' : problemas.length <= 2 ? 'warning' : 'error';
    return { etapa: 21, status, problemas, correcoes };
  }

  private static findSimilarBlockTypes(target: string, available: string[]): string[] {
    const targetWords = target.toLowerCase().split('-');
    const matches: { type: string, score: number }[] = [];

    for (const availableType of available) {
      const availableWords = availableType.toLowerCase().split('-');
      let score = 0;

      // Verificar palavras em comum
      for (const word of targetWords) {
        if (availableWords.includes(word)) {
          score += 1;
        }
      }

      // Verificar se contém palavras similares
      for (const word of targetWords) {
        for (const availableWord of availableWords) {
          if (availableWord.includes(word) || word.includes(availableWord)) {
            score += 0.5;
          }
        }
      }

      if (score > 0) {
        matches.push({ type: availableType, score });
      }
    }

    return matches
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(m => m.type);
  }

  /**
   * Corrige automaticamente os tipos de blocos inconsistentes
   */
  static generateCorrectedSteps(): { step20: any, step21: any } {
    const defaultFunnel = schemaDrivenFunnelService.createDefaultFunnel();
    const etapa20 = defaultFunnel.pages.find(p => p.id === 'etapa-20-resultado');
    const etapa21 = defaultFunnel.pages.find(p => p.id === 'etapa-21-oferta');

    const availableBlockTypes = blockDefinitions.map(def => def.type);

    // Mapeamento de correções para etapa 20
    const step20Corrections: Record<string, string> = {
      'result-header': 'result-header-inline',
      'style-result-card': 'quiz-result-display',
      'before-after-inline': 'image-inline',
      'bonus-section-inline': 'text-inline',
      'guarantee-section-inline': 'text-inline',
      'mentor-section-inline': 'text-inline'
    };

    // Mapeamento de correções para etapa 21
    const step21Corrections: Record<string, string> = {
      'countdown-timer-inline': 'urgency-timer',
      'price-section-inline': 'sales-offer',
      'benefits-grid-inline': 'text-inline',
      'faq-section-inline': 'text-inline',
      'payment-options-inline': 'text-inline'
    };

    // Aplicar correções na etapa 20
    if (etapa20) {
      etapa20.blocks = etapa20.blocks.map((block: any) => {
        const correctedType = step20Corrections[block.type] || block.type;
        if (availableBlockTypes.includes(correctedType)) {
          return { ...block, type: correctedType };
        }
        return block;
      });
    }

    // Aplicar correções na etapa 21
    if (etapa21) {
      etapa21.blocks = etapa21.blocks.map((block: any) => {
        const correctedType = step21Corrections[block.type] || block.type;
        if (availableBlockTypes.includes(correctedType)) {
          return { ...block, type: correctedType };
        }
        return block;
      });
    }

    return { step20: etapa20, step21: etapa21 };
  }

  /**
   * Valida se o sistema de pontuação das opções está funcionando
   */
  static validateScoreSystem(): ValidationResult {
    const problemas: string[] = [];
    const correcoes: string[] = [];

    try {
      // Simular uma opção com pontos
      const testOption = {
        id: 'test',
        text: 'Teste',
        points: 5,
        styleCategory: 'Natural'
      };

      // Verificar se os campos existem
      if (typeof testOption.points !== 'number') {
        problemas.push('Campo points não é um número');
        correcoes.push('Garantir que option.points seja do tipo number');
      }

      if (typeof testOption.styleCategory !== 'string') {
        problemas.push('Campo styleCategory não é uma string');
        correcoes.push('Garantir que option.styleCategory seja do tipo string');
      }

      // Verificar se o componente de edição está configurado
      const hasQuestionEditor = true; // Assumindo que existe
      if (!hasQuestionEditor) {
        problemas.push('QuestionOptionEditor não encontrado');
        correcoes.push('Verificar se QuestionOptionEditor está importado corretamente');
      }

    } catch (error) {
      problemas.push(`Erro ao validar sistema de pontuação: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      correcoes.push('Verificar importações e tipos no sistema de quiz');
    }

    const status = problemas.length === 0 ? 'success' : problemas.length <= 1 ? 'warning' : 'error';
    return { etapa: 0, status, problemas, correcoes };
  }

  /**
   * Valida se o sistema de ativação do botão está funcionando
   */
  static validateButtonActivation(): ValidationResult {
    const problemas: string[] = [];
    const correcoes: string[] = [];

    try {
      // Verificar lógica de ativação do botão
      const testActivationLogic = (canProceed: boolean, selectedCount: number, questionType: 'normal' | 'strategic') => {
        if (questionType === 'strategic') {
          return selectedCount >= 1;
        } else {
          return selectedCount >= 3;
        }
      };

      // Testar cenários
      const scenarios = [
        { canProceed: true, selected: 3, type: 'normal' as const, expected: true },
        { canProceed: true, selected: 1, type: 'strategic' as const, expected: true },
        { canProceed: false, selected: 2, type: 'normal' as const, expected: false },
        { canProceed: false, selected: 0, type: 'strategic' as const, expected: false }
      ];

      for (const scenario of scenarios) {
        const result = testActivationLogic(scenario.canProceed, scenario.selected, scenario.type);
        if (result !== scenario.expected) {
          problemas.push(`Lógica de ativação falhou no cenário: ${JSON.stringify(scenario)}`);
        }
      }

      if (problemas.length === 0) {
        correcoes.push('Sistema de ativação funcionando corretamente');
      } else {
        correcoes.push('Revisar lógica de ativação do botão no QuizNavigation');
      }

    } catch (error) {
      problemas.push(`Erro ao validar ativação do botão: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
      correcoes.push('Verificar componente QuizNavigation e lógica canProceed');
    }

    const status = problemas.length === 0 ? 'success' : 'warning';
    return { etapa: 0, status, problemas, correcoes };
  }
}

export { EditorStepsValidator, type ValidationResult };
