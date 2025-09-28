/**
 * Tentativa alternativa usando RPC functions
 */
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabase = createClient(
    process.env.VITE_SUPABASE_URL,
    process.env.VITE_SUPABASE_ANON_KEY
);

async function testRPCInsert() {
    console.log('🔄 Testando inserção via RPC...');

    try {
        // Tentar inserir um profile usando uma função customizada que pode não existir
        const { data, error } = await supabase.rpc('insert_test_data', {
            table_name: 'profiles',
            data_json: {
                id: '550e8400-e29b-41d4-a716-446655440004',
                email: 'test@example.com',
                name: 'Test User',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }
        });

        if (error) {
            console.log('❌ RPC não disponível:', error.message);
            console.log('🎯 Use os comandos SQL no painel do Supabase');
        } else {
            console.log('✅ RPC funcionou!', data);
        }
    } catch (error) {
        console.log('❌ RPC falhou:', error.message);
        console.log('🎯 Use os comandos SQL no painel do Supabase');
    }
}

async function testDirectInsertWithAuth() {
    console.log('🔄 Testando inserção com diferentes métodos de auth...');

    // Tentar diferentes abordagens
    const methods = [
        'Inserção simples',
        'Upsert',
        'Insert com on_conflict'
    ];

    for (const method of methods) {
        console.log(`\n📝 Testando: ${method}`);

        try {
            let result;

            switch (method) {
                case 'Inserção simples':
                    result = await supabase
                        .from('profiles')
                        .insert([{
                            id: '550e8400-e29b-41d4-a716-446655440005',
                            email: 'simple@test.com',
                            name: 'Simple Test'
                        }]);
                    break;

                case 'Upsert':
                    result = await supabase
                        .from('profiles')
                        .upsert([{
                            id: '550e8400-e29b-41d4-a716-446655440006',
                            email: 'upsert@test.com',
                            name: 'Upsert Test'
                        }]);
                    break;

                case 'Insert com on_conflict':
                    result = await supabase
                        .from('profiles')
                        .insert([{
                            id: '550e8400-e29b-41d4-a716-446655440007',
                            email: 'conflict@test.com',
                            name: 'Conflict Test'
                        }], { onConflict: 'id' });
                    break;
            }

            if (result.error) {
                console.log(`❌ ${method} falhou:`, result.error.message);
            } else {
                console.log(`✅ ${method} funcionou!`);
                return true; // Se algum método funcionar, retorna true
            }
        } catch (error) {
            console.log(`❌ ${method} erro:`, error.message);
        }
    }

    return false;
}

async function main() {
    console.log('🚀 Testando métodos alternativos de inserção...\n');

    // Testar RPC
    await testRPCInsert();

    console.log('\n' + '='.repeat(60) + '\n');

    // Testar métodos diretos
    const success = await testDirectInsertWithAuth();

    if (!success) {
        console.log('\n🎯 CONCLUSÃO: Todas as tentativas falharam devido ao RLS');
        console.log('📋 SOLUÇÃO: Execute os comandos SQL manualmente no painel:');
        console.log('🌐 https://pwtjuuhchtbzttrzoutw.supabase.co');
        console.log('📁 SQL Editor > Novo Query > Cole os comandos gerados');
        console.log('\n💡 Os comandos estão prontos no arquivo gerado acima!');
    }
}

main();