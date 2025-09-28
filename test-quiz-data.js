/**
 * Script de teste para verificar se os dados dos usuários do quiz estão sendo salvos corretamente
 */

import { supabase } from '../src/integrations/supabase/client';

async function testQuizData() {
    console.log('🔍 Testando dados do quiz...\n');

    try {
        // Verificar funnels
        console.log('📊 Verificando funnels...');
        const { data: funnels, error: funnelsError } = await supabase
            .from('funnels')
            .select('*')
            .limit(5);

        if (funnelsError) {
            console.error('❌ Erro ao buscar funnels:', funnelsError);
        } else {
            console.log(`✅ Encontrados ${funnels.length} funnels:`, funnels.map(f => f.name));
        }

        // Verificar usuários do quiz
        console.log('\n👥 Verificando quiz_users...');
        const { data: users, error: usersError } = await supabase
            .from('quiz_users')
            .select('*')
            .limit(10);

        if (usersError) {
            console.error('❌ Erro ao buscar quiz_users:', usersError);
        } else {
            console.log(`✅ Encontrados ${users.length} usuários:`,
                users.map(u => ({ name: u.name, email: u.email, created_at: u.created_at }))
            );
        }

        // Verificar sessões do quiz
        console.log('\n🎯 Verificando quiz_sessions...');
        const { data: sessions, error: sessionsError } = await supabase
            .from('quiz_sessions')
            .select('*')
            .limit(10);

        if (sessionsError) {
            console.error('❌ Erro ao buscar quiz_sessions:', sessionsError);
        } else {
            console.log(`✅ Encontradas ${sessions.length} sessões:`,
                sessions.map(s => ({
                    id: s.id.substring(0, 8) + '...',
                    status: s.status,
                    score: s.score,
                    funnel_id: s.funnel_id
                }))
            );
        }

        // Verificar resultados do quiz
        console.log('\n📈 Verificando quiz_results...');
        const { data: results, error: resultsError } = await supabase
            .from('quiz_results')
            .select('*')
            .limit(10);

        if (resultsError) {
            console.error('❌ Erro ao buscar quiz_results:', resultsError);
        } else {
            console.log(`✅ Encontrados ${results.length} resultados:`,
                results.map(r => ({
                    result_type: r.result_type,
                    result_title: r.result_title
                }))
            );
        }

        // Verificar dados combinados (JOIN)
        console.log('\n🔄 Verificando dados combinados (usuários + sessões + resultados)...');
        const { data: combined, error: combinedError } = await supabase
            .from('quiz_sessions')
            .select(`
                *,
                quiz_users!inner(*),
                quiz_results(*)
            `)
            .eq('status', 'completed')
            .limit(5);

        if (combinedError) {
            console.error('❌ Erro ao buscar dados combinados:', combinedError);
        } else {
            console.log(`✅ Encontradas ${combined.length} sessões completas com dados de usuário:`);
            combined.forEach((session, index) => {
                console.log(`  ${index + 1}. Usuario: ${session.quiz_users.name} (${session.quiz_users.email})`);
                console.log(`     Status: ${session.status}, Score: ${session.score}/${session.max_score}`);
                console.log(`     Resultados: ${session.quiz_results?.length || 0}`);
                console.log('');
            });
        }

        console.log('🎉 Teste concluído com sucesso!');

    } catch (error) {
        console.error('❌ Erro durante o teste:', error);
    }
}

// Executar teste
testQuizData();