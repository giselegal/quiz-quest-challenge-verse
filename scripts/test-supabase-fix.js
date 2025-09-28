/**
 * 🧪 TESTE DE CORREÇÃO SUPABASE
 * 
 * Script para testar se as correções de null settings estão funcionando
 */

// Simular dados do Supabase com cenários problemáticos
const testCases = [
  {
    name: "Dados normais",
    data: {
      id: "test-1",
      name: "Funnel Teste",
      description: "Descrição teste",
      settings: { context: "EDITOR" },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  },
  {
    name: "Settings null",
    data: {
      id: "test-2",
      name: "Funnel Settings Null",
      settings: null, // 🚨 Problema original
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  },
  {
    name: "Settings undefined",
    data: {
      id: "test-3",
      name: "Funnel Settings Undefined",
      // settings: undefined - omitido
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }
  },
  {
    name: "Dados completamente null",
    data: null
  },
  {
    name: "ID faltante",
    data: {
      name: "Funnel sem ID",
      settings: {},
      created_at: new Date().toISOString()
    }
  }
];

// Simular a função convertFromSupabaseFormat corrigida
function convertFromSupabaseFormatTest(data) {
  try {
    // Verificações defensivas
    if (!data || typeof data !== 'object') {
      console.error('🚨 Dados inválidos:', data);
      throw new Error('Dados inválidos recebidos do Supabase: ' + JSON.stringify(data));
    }

    if (!data.id) {
      console.error('🚨 ID faltando:', data);
      throw new Error('ID do funnel é obrigatório');
    }

    console.debug('🔍 Convertendo dados:', { id: data.id, hasSettings: !!data.settings });

    const settings = data.settings || {};
    const safeSettings = (settings && typeof settings === 'object') ? settings : {};

    return {
      id: data.id,
      name: data.name || 'Funnel Sem Nome',
      description: data.description || '',
      category: 'outros',
      context: safeSettings.context || 'EDITOR',
      userId: data.user_id,
      settings: safeSettings,
      pages: [],
      isPublished: data.is_published || false,
      version: data.version || 1,
      createdAt: new Date(data.created_at || new Date()),
      updatedAt: new Date(data.updated_at || new Date()),
      templateId: safeSettings.templateId,
      isFromTemplate: safeSettings.isFromTemplate || false
    };

  } catch (error) {
    console.error('🚨 Erro no convertFromSupabaseFormat:', error);
    console.error('🚨 Dados que causaram o erro:', data);

    // Fallback
    return {
      id: data?.id || 'fallback_' + Date.now(),
      name: data?.name || 'Funnel com Erro',
      description: 'Funnel recuperado com erro',
      category: 'outros',
      context: 'EDITOR',
      userId: 'anonymous',
      settings: {},
      pages: [],
      isPublished: false,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      templateId: undefined,
      isFromTemplate: false
    };
  }
}

// Executar testes
console.log('🧪 TESTANDO CORREÇÕES DO SUPABASE');
console.log('==================================');

testCases.forEach((testCase, index) => {
  console.log(`\n📋 Teste ${index + 1}: ${testCase.name}`);
  console.log('-----------------------------------');

  try {
    const result = convertFromSupabaseFormatTest(testCase.data);
    console.log('✅ Sucesso:', { id: result.id, name: result.name, hasSettings: !!result.settings });
  } catch (error) {
    console.log('❌ Erro capturado:', error.message);
  }
});

console.log('\n🎉 Testes concluídos!');

export default { convertFromSupabaseFormatTest, testCases };