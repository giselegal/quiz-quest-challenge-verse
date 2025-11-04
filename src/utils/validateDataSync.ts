/**
 * 🔍 VALIDADOR DE SINCRONIZAÇÃO DE DADOS
 * Verifica se stepTemplatesMapping.ts está sincronizado com quiz21StepsComplete.ts
 */

import { STEP_TEMPLATES_MAPPING } from '@/config/stepTemplatesMapping';
import { QUIZ_QUESTIONS_COMPLETE } from '@/templates/quiz21StepsComplete';

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
  details: {
    totalStepsInQuiz: number;
    totalStepsInMapping: number;
    missingSteps: number[];
    extraSteps: number[];
  };
}

export function validateDataSync(): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Verificar se temos todas as 21 steps
  const quizSteps = Object.keys(QUIZ_QUESTIONS_COMPLETE)
    .map(Number)
    .sort((a, b) => a - b);
  const mappingSteps = Object.keys(STEP_TEMPLATES_MAPPING)
    .map(Number)
    .sort((a, b) => a - b);

  const missingSteps = quizSteps.filter(step => !mappingSteps.includes(step));
  const extraSteps = mappingSteps.filter(step => !quizSteps.includes(step));

  // Verificar sequência 1-21
  for (let i = 1; i <= 21; i++) {
    if (!QUIZ_QUESTIONS_COMPLETE[i]) {
      errors.push(`❌ QUIZ_QUESTIONS_COMPLETE missing step ${i}`);
    }
    if (!STEP_TEMPLATES_MAPPING[i]) {
      errors.push(`❌ STEP_TEMPLATES_MAPPING missing step ${i}`);
    }
  }

  // Verificar se os nomes estão sincronizados
  for (let i = 1; i <= 21; i++) {
    const quizData = QUIZ_QUESTIONS_COMPLETE[i];
    const quizName = Array.isArray(quizData) ? quizData[0] : String(quizData || '');
    const mappingTemplate = STEP_TEMPLATES_MAPPING[i];

    if (quizName && mappingTemplate) {
      if (
        !mappingTemplate.name.includes(quizName) &&
        !quizName.includes(mappingTemplate.name.split(' ')[0])
      ) {
        warnings.push(`⚠️ Step ${i}: Nome possivelmente dessincronizado`);
        warnings.push(`   Quiz: "${quizName}"`);
        warnings.push(`   Mapping: "${mappingTemplate.name}"`);
      }
    }
  }

  const isValid = errors.length === 0;

  return {
    isValid,
    errors,
    warnings,
    details: {
      totalStepsInQuiz: quizSteps.length,
      totalStepsInMapping: mappingSteps.length,
      missingSteps,
      extraSteps,
    },
  };
}

// Função para executar e logar validação
export function runValidation(): void {
  const result = validateDataSync();

  console.log('🔍 === VALIDAÇÃO DE SINCRONIZAÇÃO DE DADOS ===');
  console.log(`Status: ${result.isValid ? '✅ VÁLIDO' : '❌ INVÁLIDO'}`);
  console.log(`Steps no Quiz: ${result.details.totalStepsInQuiz}`);
  console.log(`Steps no Mapping: ${result.details.totalStepsInMapping}`);

  if (result.errors.length > 0) {
    console.log('\n❌ ERROS ENCONTRADOS:');
    result.errors.forEach(error => console.log(error));
  }

  if (result.warnings.length > 0) {
    console.log('\n⚠️ AVISOS:');
    result.warnings.forEach(warning => console.log(warning));
  }

  if (result.details.missingSteps.length > 0) {
    console.log(`\n🔍 Steps ausentes no mapping: ${result.details.missingSteps.join(', ')}`);
  }

  if (result.details.extraSteps.length > 0) {
    console.log(`\n🔍 Steps extras no mapping: ${result.details.extraSteps.join(', ')}`);
  }

  console.log('🔍 === FIM DA VALIDAÇÃO ===\n');
}

// Auto-executar se estiver em desenvolvimento
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  runValidation();
}
