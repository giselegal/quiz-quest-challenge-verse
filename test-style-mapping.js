// Script de teste para verificar a estrutura de dados dos estilos
console.log('🔍 Testando estrutura de dados dos estilos...');

// Simular os dados que estão sendo usados
const initialScores = {
    natural: 0,
    classico: 0,
    contemporaneo: 0,
    elegante: 0,
    romantico: 0,
    sexy: 0,
    dramatico: 0,
    criativo: 0,
};

// Simular algumas respostas
const mockAnswers = {
    'step-2': ['classico', 'elegante'],
    'step-3': ['natural', 'classico'],
    'step-4': ['contemporaneo', 'classico', 'elegante']
};

// Testar o cálculo
const newScores = { ...initialScores };

Object.entries(mockAnswers).forEach(([stepId, selections]) => {
    selections.forEach(selectionId => {
        if (selectionId in newScores) {
            newScores[selectionId] += 1;
        } else {
            console.warn(`⚠️ Estilo não encontrado nos scores: ${selectionId}`);
        }
    });
});

console.log('📊 Scores calculados:', newScores);

// Simular o mapeamento de estilos
const mockStyleMapping = {
    'clássico': { id: 'clássico', name: 'Clássico' },
    'natural': { id: 'natural', name: 'Natural' },
    'contemporâneo': { id: 'contemporâneo', name: 'Contemporâneo' },
    'elegante': { id: 'elegante', name: 'Elegante' },
    'romântico': { id: 'romântico', name: 'Romântico' },
    'sexy': { id: 'sexy', name: 'Sexy' },
    'dramático': { id: 'dramático', name: 'Dramático' },
    'criativo': { id: 'criativo', name: 'Criativo' }
};

// Testar mapeamento
const sortedStyles = Object.entries(newScores)
    .sort(([, a], [, b]) => b - a)
    .map(([styleId]) => {
        const style = mockStyleMapping[styleId];
        console.log(`🎨 Mapeando: ${styleId} ->`, style);
        return style;
    })
    .filter(style => style !== undefined);

console.log('🏆 Estilos ordenados:', sortedStyles);
console.log('🎯 Estilo vencedor:', sortedStyles[0]);

if (sortedStyles.length === 0) {
    console.error('❌ PROBLEMA: Nenhum estilo foi mapeado!');
} else {
    console.log('✅ Mapeamento funcionando corretamente');
}