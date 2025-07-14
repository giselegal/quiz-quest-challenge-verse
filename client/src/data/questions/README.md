# Organização das Questões do Quiz

## Estrutura Geral

O sistema de questões está organizado de forma modular para facilitar manutenção e escalabilidade.

### 📁 Arquitetura de Arquivos

```
/client/src/data/
├── quizQuestions.ts          # Quiz principal (questões 1-10)
├── caktoquizQuestions.ts     # Fluxo customizado alternativo
└── questions/
    ├── index.ts              # Índice central de todas as questões
    │
    ├── # QUESTÕES PRINCIPAIS (ID numérico 1-10)
    ├── clothingQuestions.ts        # Q1, Q3 - Roupas e silhueta
    ├── personalityQuestions.ts     # Q2 - Personalidade
    ├── stylePreferencesQuestions.ts # Q5, Q10 - Preferências e ocasiões
    ├── outerwearQuestions.ts       # Q6, Q7 - Casacos e looks de inverno
    ├── accessoriesQuestions.ts     # Q8 - Acessórios
    ├── accessoryStyleQuestions.ts  # Q9 - Estilo de acessórios
    │
    └── # QUESTÕES ESTRATÉGICAS (ID tipo 'strategic-X')
        ├── selfPerceptionQuestions.ts    # strategic-1 - Autopercepção
        ├── styleExperienceQuestions.ts   # strategic-3 - Experiência de aprendizado
        ├── purchaseIntentQuestions.ts    # strategic-5 - Intenção de compra
        └── desiredOutcomesQuestions.ts   # strategic-7 - Resultados desejados
```

## 🎯 Quiz Principal (`quizQuestions.ts`)

Questões principais para análise de estilo pessoal:

### Ordem das Questões (1-10):
1. **Q1**: Tipo de roupa favorita (conforto vs elegância)
2. **Q2**: Personalidade (características pessoais)
3. **Q3**: Silhueta preferida (formas e cortes)
4. **Q5**: Preferências de estilo gerais
5. **Q6**: Casacos e jaquetas (outerwear)
6. **Q7**: Looks de inverno
7. **Q8**: Acessórios (bolsas, sapatos, joias)
8. **Q9**: Estilo de acessórios
9. **Q10**: Ocasiões especiais

### 🔧 Características Técnicas:
- ✅ Ordem garantida por `.sort()` automático
- ✅ Importações organizadas alfabeticamente
- ✅ Comentários descritivos para cada módulo
- ✅ JSDoc completo com mapeamento de questões

## 📊 Questões Estratégicas

Questões complementares para lead generation e segmentação:

### Strategic Questions:
- **strategic-1**: Como você se sente sobre seu estilo hoje?
- **strategic-3**: Como você aprende melhor sobre estilo?
- **strategic-5**: Já considerou investir em consultoria?
- **strategic-7**: Que resultados gostaria de alcançar?

## 🎨 Categorias de Estilo

Cada questão mapeia para uma ou mais categorias:
- **Natural**: Conforto, praticidade, espontaneidade
- **Clássico**: Sobriedade, tradição, elegância atemporal
- **Contemporâneo**: Modernidade, praticidade com estilo
- **Elegante**: Sofisticação, refinamento, minimalismo
- **Romântico**: Delicadeza, feminilidade, fluidez
- **Sexy**: Sensualidade, destaque ao corpo

## 🛠️ Uso e Manutenção

### Para adicionar novas questões:
1. Criar arquivo na pasta `questions/`
2. Seguir padrão de nomenclatura: `[categoria]Questions.ts`
3. Exportar array do tipo `QuizQuestion[]`
4. Adicionar importação em `quizQuestions.ts` ou questões estratégicas
5. Atualizar documentação

### Para modificar ordem:
- A ordem é garantida automaticamente pelo `.sort()` baseado no `id`
- Para questões principais: usar ID numérico (1-10)
- Para questões estratégicas: usar formato `strategic-X`

### Para questões com imagens:
- Usar Cloudinary com conta `der8kogzu`
- Seguir padrão de nomenclatura: `Q[número]_-_[opção]_[hash].png`
- Sempre incluir URLs completas com transformações

## 📋 Checklist de Qualidade

- [ ] Todas as questões têm IDs únicos
- [ ] Imagens funcionam e estão otimizadas
- [ ] Ordem está correta (1-10 para principais)
- [ ] Categorias de estilo estão mapeadas
- [ ] Importações estão organizadas alfabeticamente
- [ ] JSDoc está completo e atualizado
- [ ] Testes de ordem passam sem erros
