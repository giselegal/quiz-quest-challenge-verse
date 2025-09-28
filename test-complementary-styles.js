// Teste específico para análise de estilos complementares (2º e 3º estilos)
console.log('🔍 === ANÁLISE DE ESTILOS COMPLEMENTARES === 🔍');

// Mock baseado na estrutura real dos estilos
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

// Função para simular o processamento dos estilos complementares
function analyzeComplementaryStyles(quizScores) {
    console.log('\n📊 Analisando estilos complementares...');
    console.log('💯 Scores recebidos:', quizScores);

    // Ordenar estilos por pontuação
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

    const totalPoints = sortedStyles.reduce((sum, style) => sum + style.score, 0);

    console.log(`\n🎯 Total de pontos: ${totalPoints}`);

    // Analisar os três primeiros estilos
    const primaryStyle = sortedStyles[0];
    const secondaryStyle = sortedStyles[1];
    const tertiaryStyle = sortedStyles[2];

    console.log('\n🏆 RESULTADO DA ANÁLISE:');

    // Estilo principal
    if (primaryStyle) {
        const percentage = totalPoints > 0 ? ((primaryStyle.score / totalPoints) * 100).toFixed(1) : '0.0';
        console.log(`🥇 ESTILO PRINCIPAL: ${primaryStyle.name}`);
        console.log(`   - Pontuação: ${primaryStyle.score} pontos (${percentage}%)`);
        console.log(`   - Chave: ${primaryStyle.key}`);
        console.log(`   - Características: ${primaryStyle.data.characteristics.join(', ')}`);
    }

    // Estilos complementares
    console.log('\n🎨 ESTILOS COMPLEMENTARES:');

    // 2º estilo
    if (secondaryStyle && secondaryStyle.score > 0) {
        const percentage = totalPoints > 0 ? ((secondaryStyle.score / totalPoints) * 100).toFixed(1) : '0.0';
        console.log(`🥈 2º ESTILO: ${secondaryStyle.name}`);
        console.log(`   - Pontuação: ${secondaryStyle.score} pontos (${percentage}%)`);
        console.log(`   - Chave: ${secondaryStyle.key}`);
        console.log(`   - Características: ${secondaryStyle.data.characteristics.join(', ')}`);
        console.log(`   - Status: ${secondaryStyle.score === primaryStyle.score ? 'EMPATE COM PRINCIPAL' : 'DIFERENTE DO PRINCIPAL'}`);
    } else {
        console.log('🥈 2º ESTILO: Não identificado ou sem pontuação');
    }

    // 3º estilo
    if (tertiaryStyle && tertiaryStyle.score > 0) {
        const percentage = totalPoints > 0 ? ((tertiaryStyle.score / totalPoints) * 100).toFixed(1) : '0.0';
        console.log(`🥉 3º ESTILO: ${tertiaryStyle.name}`);
        console.log(`   - Pontuação: ${tertiaryStyle.score} pontos (${percentage}%)`);
        console.log(`   - Chave: ${tertiaryStyle.key}`);
        console.log(`   - Características: ${tertiaryStyle.data.characteristics.join(', ')}`);
        console.log(`   - Status: ${tertiaryStyle.score === secondaryStyle?.score ? 'EMPATE COM SECUNDÁRIO' : 'DIFERENTE DO SECUNDÁRIO'}`);
    } else {
        console.log('🥉 3º ESTILO: Não identificado ou sem pontuação');
    }

    // Análise de empates
    const stylesWithSameScore = sortedStyles.filter(style => style.score === secondaryStyle?.score);
    if (stylesWithSameScore.length > 1 && secondaryStyle?.score > 0) {
        console.log(`\n⚖️ EMPATE DETECTADO entre estilos complementares:`);
        console.log(`   ${stylesWithSameScore.length} estilos com ${secondaryStyle.score} pontos:`);
        stylesWithSameScore.forEach((style, index) => {
            console.log(`   ${index + 1}. ${style.name} (${style.key})`);
        });
    }

    // Simular string de estilos complementares como no ResultStep
    const secondaryStyleNames = [secondaryStyle, tertiaryStyle]
        .filter(style => style && style.score > 0)
        .map(style => style.name)
        .join(' e ');

    console.log(`\n📝 String para exibição no ResultStep:`);
    if (secondaryStyleNames) {
        console.log(`   "Você também tem influências de: ${secondaryStyleNames}"`);
    } else {
        console.log(`   Nenhum estilo complementar para exibir`);
    }

    return {
        primary: primaryStyle,
        secondary: secondaryStyle,
        tertiary: tertiaryStyle,
        displayString: secondaryStyleNames,
        totalPoints: totalPoints,
        allStyles: sortedStyles
    };
}

// Teste com diferentes cenários
console.log('\n🧪 TESTE 1: Cenário com ganhador claro e empates');
const scenario1 = {
    natural: 2,
    'clássico': 4,
    'contemporâneo': 1,
    elegante: 2,
    'romântico': 1,
    sexy: 2,
    'dramático': 2,
    criativo: 1
};

const result1 = analyzeComplementaryStyles(scenario1);

console.log('\n🧪 TESTE 2: Cenário com empate triplo na liderança');
const scenario2 = {
    natural: 3,
    'clássico': 3,
    'contemporâneo': 3,
    elegante: 1,
    'romântico': 0,
    sexy: 1,
    'dramático': 0,
    criativo: 1
};

const result2 = analyzeComplementaryStyles(scenario2);

console.log('\n🧪 TESTE 3: Cenário com apenas um estilo pontuando');
const scenario3 = {
    natural: 0,
    'clássico': 5,
    'contemporâneo': 0,
    elegante: 0,
    'romântico': 0,
    sexy: 0,
    'dramático': 0,
    criativo: 0
};

const result3 = analyzeComplementaryStyles(scenario3);

console.log('\n🔍 === ANÁLISE CONCLUÍDA === 🔍');