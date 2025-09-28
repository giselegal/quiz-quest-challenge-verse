// Teste completo do sistema de quiz
console.log('🎯 === TESTE COMPLETO DO QUIZ === 🎯');

// 1. TESTE DO MAPEAMENTO DE ESTILOS - MOCK DOS DADOS REAIS
console.log('\n📊 1. Testando com dados mockados baseados na estrutura real...');

// Mock baseado na estrutura corrigida do STYLE_DEFINITIONS
const STYLE_DEFINITIONS_MOCK = {
    'natural': {
        id: 'natural',
        name: 'Natural',
        type: 'natural',
        characteristics: ['autêntico', 'relaxado', 'espontâneo'],
        recommendations: ['tecidos naturais', 'cores terrosas'],
    },
    'clássico': {
        id: 'clássico',
        name: 'Clássico',
        type: 'clássico',
        characteristics: ['elegante', 'sofisticado', 'atemporal'],
        recommendations: ['peças básicas', 'cores neutras'],
    },
    'contemporâneo': {
        id: 'contemporâneo',
        name: 'Contemporâneo',
        type: 'contemporâneo',
        characteristics: ['moderno', 'inovador', 'urbano'],
        recommendations: ['cortes modernos', 'tecnologia'],
    },
    'elegante': {
        id: 'elegante',
        name: 'Elegante',
        type: 'elegante',
        characteristics: ['refinado', 'sofisticado', 'gracioso'],
        recommendations: ['alfaiataria', 'acessórios finos'],
    },
    'romântico': {
        id: 'romântico',
        name: 'Romântico',
        type: 'romântico',
        characteristics: ['delicado', 'feminino', 'suave'],
        recommendations: ['rendas', 'tons pastel'],
    },
    'sexy': {
        id: 'sexy',
        name: 'Sexy',
        type: 'sexy',
        characteristics: ['sensual', 'confiante', 'ousado'],
        recommendations: ['decotes', 'vermelho'],
    },
    'dramático': {
        id: 'dramático',
        name: 'Dramático',
        type: 'dramático',
        characteristics: ['marcante', 'impactante', 'contraste'],
        recommendations: ['ombros marcados', 'preto e branco'],
    },
    'criativo': {
        id: 'criativo',
        name: 'Criativo',
        type: 'criativo',
        characteristics: ['único', 'artístico', 'expressivo'],
        recommendations: ['estampas', 'cores vibrantes'],
    }
};

console.log('✅ STYLE_DEFINITIONS mockado carregado com sucesso');
console.log('📝 Estilos disponíveis:', Object.keys(STYLE_DEFINITIONS_MOCK));

// 2. TESTE DA INTERFACE QuizScores vs STYLE_DEFINITIONS
console.log('\n🔍 2. Verificando consistência das chaves...');

// Interface QuizScores esperada (com acentos)
const expectedQuizScoresKeys = [
    'natural',
    'clássico',
    'contemporâneo',
    'elegante',
    'romântico',
    'sexy',
    'dramático',
    'criativo'
];

const styleDefinitionKeys = Object.keys(STYLE_DEFINITIONS_MOCK);

console.log('🎯 Chaves esperadas no QuizScores:', expectedQuizScoresKeys);
console.log('🎨 Chaves no STYLE_DEFINITIONS:', styleDefinitionKeys);

// Verificar correspondência
const missingInDefinitions = expectedQuizScoresKeys.filter(key => !styleDefinitionKeys.includes(key));
const extraInDefinitions = styleDefinitionKeys.filter(key => !expectedQuizScoresKeys.includes(key));

if (missingInDefinitions.length > 0) {
    console.error('❌ FALTANDO no STYLE_DEFINITIONS:', missingInDefinitions);
} else {
    console.log('✅ Todas as chaves esperadas existem no STYLE_DEFINITIONS');
}

if (extraInDefinitions.length > 0) {
    console.warn('⚠️ EXTRAS no STYLE_DEFINITIONS:', extraInDefinitions);
} else {
    console.log('✅ Nenhuma chave extra no STYLE_DEFINITIONS');
}

// 3. TESTE DE SIMULAÇÃO DE QUIZ COMPLETO
console.log('\n🎮 3. Simulando quiz completo...');

// Simular respostas do quiz como seria no sistema real
const mockQuizAnswers = {
    'step-2': ['clássico', 'elegante'],
    'step-5': ['natural', 'clássico'],
    'step-8': ['contemporâneo', 'clássico', 'elegante'],
    'step-11': ['romântico', 'dramático'],
    'step-14': ['criativo', 'sexy'],
    'step-17': ['natural', 'sexy'],
    'step-20': ['dramático', 'clássico']
};

// Inicializar scores com chaves corretas (com acentos)
const quizScores = {
    natural: 0,
    'clássico': 0,
    'contemporâneo': 0,
    elegante: 0,
    'romântico': 0,
    sexy: 0,
    'dramático': 0,
    criativo: 0
};

console.log('🚀 Scores iniciais:', quizScores);

// Processar respostas
Object.entries(mockQuizAnswers).forEach(([stepId, selections]) => {
    console.log(`\n📝 Processando ${stepId}:`, selections);

    selections.forEach(styleKey => {
        if (styleKey in quizScores) {
            quizScores[styleKey] += 1;
            console.log(`  ✅ ${styleKey}: +1 ponto`);
        } else {
            console.error(`  ❌ ERRO: Chave "${styleKey}" não encontrada nos scores!`);
        }
    });
});

console.log('\n📊 Scores finais:', quizScores);

// 4. TESTE DE ORDENAÇÃO E RESULTADO
console.log('\n🏆 4. Determinando resultado...');

const sortedStyles = Object.entries(quizScores)
    .sort(([, scoreA], [, scoreB]) => scoreB - scoreA)
    .map(([styleKey, score]) => {
        const styleData = STYLE_DEFINITIONS_MOCK[styleKey];

        if (!styleData) {
            console.error(`❌ ERRO: Estilo "${styleKey}" não encontrado no STYLE_DEFINITIONS!`);
            return null;
        }

        return {
            key: styleKey,
            score: score,
            name: styleData.name,
            data: styleData
        };
    })
    .filter(style => style !== null);

console.log('🎯 Estilos ordenados por pontuação:');

// Calcular total de pontos para porcentagens
const totalPoints = sortedStyles.reduce((sum, style) => sum + style.score, 0);

sortedStyles.forEach((style, index) => {
    const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '   ';
    const percentage = totalPoints > 0 ? ((style.score / totalPoints) * 100).toFixed(1) : '0.0';
    console.log(`  ${medal} ${style.name}: ${style.score} pontos (${percentage}%) - ${style.key}`);
});

const winnerStyle = sortedStyles[0];
const secondStyle = sortedStyles[1];
const thirdStyle = sortedStyles[2];

if (winnerStyle) {
    console.log(`\n🎉 RESULTADO FINAL: ${winnerStyle.name} com ${winnerStyle.score} pontos!`);

    // Análise detalhada dos estilos complementares
    console.log('\n🔍 ANÁLISE DOS ESTILOS COMPLEMENTARES:');

    if (secondStyle && secondStyle.score > 0) {
        const secondPercentage = totalPoints > 0 ? ((secondStyle.score / totalPoints) * 100).toFixed(1) : '0.0';
        console.log(`🥈 2º Estilo: ${secondStyle.name}`);
        console.log(`   - Pontuação: ${secondStyle.score} pontos (${secondPercentage}%)`);
        console.log(`   - Características: ${secondStyle.data.characteristics.join(', ')}`);
        console.log(`   - Chave: ${secondStyle.key}`);
    } else {
        console.log('🥈 2º Estilo: Não identificado ou sem pontuação');
    }

    if (thirdStyle && thirdStyle.score > 0) {
        const thirdPercentage = totalPoints > 0 ? ((thirdStyle.score / totalPoints) * 100).toFixed(1) : '0.0';
        console.log(`🥉 3º Estilo: ${thirdStyle.name}`);
        console.log(`   - Pontuação: ${thirdStyle.score} pontos (${thirdPercentage}%)`);
        console.log(`   - Características: ${thirdStyle.data.characteristics.join(', ')}`);
        console.log(`   - Chave: ${thirdStyle.key}`);
    } else {
        console.log('🥉 3º Estilo: Não identificado ou sem pontuação');
    }

    // Verificar se há empates
    const tiedStyles = sortedStyles.filter(style => style.score === secondStyle?.score);
    if (tiedStyles.length > 1) {
        console.log(`\n⚖️ EMPATE DETECTADO: ${tiedStyles.length} estilos com ${secondStyle.score} pontos:`);
        tiedStyles.forEach(style => {
            console.log(`   - ${style.name} (${style.key})`);
        });
    }
    console.log('📋 Dados do estilo vencedor:', {
        id: winnerStyle.data.id,
        name: winnerStyle.data.name,
        characteristics: winnerStyle.data.characteristics
    });
} else {
    console.error('❌ FALHA: Não foi possível determinar o estilo vencedor!');
}

// 5. TESTE DE INTEGRIDADE DOS DADOS
console.log('\n🔍 5. Verificando integridade dos dados de cada estilo...');

Object.entries(STYLE_DEFINITIONS_MOCK).forEach(([key, style]) => {
    const requiredFields = ['id', 'name', 'type', 'characteristics', 'recommendations'];
    const missingFields = requiredFields.filter(field => !style.hasOwnProperty(field));

    if (missingFields.length > 0) {
        console.error(`❌ ${style.name} (${key}): campos faltando: ${missingFields.join(', ')}`);
    } else {
        console.log(`✅ ${style.name} (${key}): estrutura completa`);
    }
});

console.log('\n🎯 === TESTE CONCLUÍDO === 🎯');