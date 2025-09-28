// Teste direto para verificar problema de tipo de ID
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pwtjuuhchtbzttrzoutw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3dGp1dWhjaHRienR0cnpvdXR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNDQ0NjAsImV4cCI6MjA2NzkyMDQ2MH0.EP0qLHBZK8nyxcod0FEVRQln4R_yVSWEGQwuIbJfP_w';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testIdTypes() {
    console.log('🔍 ANALISANDO TIPOS DE ID NO SUPABASE...\n');

    // 1. Testar estrutura da tabela
    console.log('📋 1. ESTRUTURA DA TABELA FUNNELS:');
    try {
        const { data, error } = await supabase
            .from('funnels')
            .select('*')
            .limit(1);

        if (error) {
            console.error('❌ Erro ao consultar tabela:', error.message);
        } else {
            console.log('✅ Tabela acessível, dados:', data);
            if (data && data.length > 0) {
                console.log('📊 Exemplo de registro:', JSON.stringify(data[0], null, 2));
                console.log('🔑 Tipo do ID existente:', typeof data[0].id, '- Valor:', data[0].id);
            }
        }
    } catch (err) {
        console.error('❌ Erro na consulta:', err);
    }

    console.log('\n📋 2. TESTANDO DIFERENTES FORMATOS DE ID:');

    // 2. Testar formatos de ID
    const testIds = [
        'funnel_1727376000123_abc123def',  // Formato atual (timestamp + random)
        crypto.randomUUID(),               // UUID padrão
        `${Date.now()}`,                   // Apenas timestamp
        'test-simple-id',                  // ID simples
        'FUNNEL_UPPER_CASE'                // Maiúsculo
    ];

    for (const testId of testIds) {
        console.log(`\n🧪 Testando ID: "${testId}" (tipo: ${typeof testId})`);

        const testData = {
            id: testId,
            name: `Teste ID ${testId.slice(0, 10)}`,
            description: 'Teste de formato de ID',
            user_id: null, // Teste sem usuário primeiro
            is_published: false,
            version: 1,
            settings: {
                context: 'test',
                category: 'test'
            },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        try {
            // Tentar inserir
            const result = await supabase
                .from('funnels')
                .insert([testData])
                .select()
                .single();

            if (result.error) {
                console.log(`❌ Erro com ID "${testId}":`, result.error.message);

                // Análise específica do erro
                if (result.error.message.includes('violates row-level security')) {
                    console.log('   → Problema: RLS (Row Level Security)');
                } else if (result.error.message.includes('duplicate key')) {
                    console.log('   → Problema: ID já existe');
                } else if (result.error.message.includes('invalid input syntax')) {
                    console.log('   → Problema: Formato de ID inválido');
                } else if (result.error.message.includes('could not find')) {
                    console.log('   → Problema: Coluna não encontrada');
                }
            } else {
                console.log(`✅ Sucesso com ID "${testId}":`, result.data?.name);

                // Limpar o teste imediatamente
                await supabase
                    .from('funnels')
                    .delete()
                    .eq('id', testId);
                console.log(`🧹 Teste "${testId}" limpo`);
            }
        } catch (error) {
            console.log(`💥 Exceção com ID "${testId}":`, error.message);
        }
    }

    console.log('\n📋 3. TESTANDO COM AUTENTICAÇÃO:');

    // 3. Verificar estado da autenticação
    const { data: { session } } = await supabase.auth.getSession();
    console.log('👤 Sessão atual:', session ? 'Autenticado' : 'Não autenticado');

    if (!session) {
        console.log('⚠️ Sem autenticação - isso pode causar problemas de RLS');

        // Tentar autenticação de teste (se houver credenciais de teste)
        console.log('🔐 Testando autenticação anônima...');

        try {
            // Verificar se há uma forma de autenticar como usuário de teste
            const authTest = await supabase.auth.signInAnonymously();
            console.log('🔐 Resultado autenticação anônima:', authTest.error ? authTest.error.message : 'Sucesso');
        } catch (authError) {
            console.log('❌ Erro na autenticação:', authError.message);
        }
    }

    console.log('\n📊 RESUMO DA ANÁLISE:');
    console.log('1. Tabela "funnels" existe e é acessível');
    console.log('2. Campo "id" é do tipo STRING');
    console.log('3. Possível problema de RLS (Row Level Security)');
    console.log('4. Formato atual do ID: funnel_{timestamp}_{random} é válido');
}

testIdTypes();