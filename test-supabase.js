// Teste simples para verificar conexão com Supabase
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pwtjuuhchtbzttrzoutw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3dGp1dWhjaHRienR0cnpvdXR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTIzNDQ0NjAsImV4cCI6MjA2NzkyMDQ2MH0.EP0qLHBZK8nyxcod0FEVRQln4R_yVSWEGQwuIbJfP_w';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testSupabase() {
    console.log('🔄 Testando conexão com Supabase...');

    try {
        // Testar inserção simples
        const testData = {
            id: `test-${Date.now()}`,
            name: 'Teste de Conexão',
            description: 'Teste para verificar se Supabase está funcionando',
            user_id: 'test-user',
            is_published: false,
            version: 1,
            settings: {
                context: 'test',
                templateId: null,
                isFromTemplate: false,
                category: 'test'
            },
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        console.log('📤 Inserindo dados de teste...');
        const result = await supabase
            .from('funnels')
            .insert([testData])
            .select()
            .single();

        if (result.error) {
            console.error('❌ Erro na inserção:', result.error);
        } else {
            console.log('✅ Inserção bem-sucedida:', result.data);

            // Limpar o teste
            console.log('🧹 Limpando dados de teste...');
            await supabase
                .from('funnels')
                .delete()
                .eq('id', testData.id);
            console.log('✅ Limpeza concluída');
        }

    } catch (error) {
        console.error('❌ Erro no teste:', error);
    }
}

testSupabase();