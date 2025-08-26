#!/bin/bash

# 🔧 SCRIPT DE VERIFICAÇÃO E CORREÇÃO DE IMPORTS DnD
# Script para identificar e corrigir problemas de importação no sistema de drag & drop

echo "🔍 VERIFICAÇÃO COMPLETA DE IMPORTS DnD"
echo "====================================="

# 1. Verificar imports em arquivos principais
echo "📦 1. VERIFICANDO IMPORTS EM ARQUIVOS PRINCIPAIS"
echo "-----------------------------------------------"

# Verificar EditorPro.tsx
echo "📄 EditorPro.tsx:"
if grep -q "@dnd-kit/core" src/components/editor/EditorPro.tsx; then
    echo "  ✅ @dnd-kit/core importado"
else
    echo "  ❌ @dnd-kit/core não importado"
fi

if grep -q "@dnd-kit/sortable" src/components/editor/EditorPro.tsx; then
    echo "  ✅ @dnd-kit/sortable importado"
else
    echo "  ❌ @dnd-kit/sortable não importado"
fi

# Verificar DraggableComponentItem.tsx
echo "📄 DraggableComponentItem.tsx:"
if grep -q "@dnd-kit/core" src/components/editor/dnd/DraggableComponentItem.tsx; then
    echo "  ✅ @dnd-kit/core importado"
else
    echo "  ❌ @dnd-kit/core não importado"
fi

if grep -q "@dnd-kit/utilities" src/components/editor/dnd/DraggableComponentItem.tsx; then
    echo "  ✅ @dnd-kit/utilities importado"
else
    echo "  ❌ @dnd-kit/utilities não importado"
fi

# Verificar CanvasDropZone.simple.tsx
echo "📄 CanvasDropZone.simple.tsx:"
if grep -q "@dnd-kit/core" src/components/editor/canvas/CanvasDropZone.simple.tsx; then
    echo "  ✅ @dnd-kit/core importado"
else
    echo "  ❌ @dnd-kit/core não importado"
fi

if grep -q "@dnd-kit/sortable" src/components/editor/canvas/CanvasDropZone.simple.tsx; then
    echo "  ✅ @dnd-kit/sortable importado"
else
    echo "  ❌ @dnd-kit/sortable não importado"
fi

# 2. Verificar se arquivos essenciais existem
echo ""
echo "📁 2. VERIFICANDO EXISTÊNCIA DE ARQUIVOS ESSENCIAIS"
echo "-------------------------------------------------"

files_to_check=(
    "src/components/editor/EditorPro.tsx"
    "src/components/editor/dnd/DraggableComponentItem.tsx"
    "src/components/editor/canvas/CanvasDropZone.simple.tsx"
    "src/pages/MainEditor.tsx"
)

for file in "${files_to_check[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✅ $file existe"
    else
        echo "  ❌ $file não encontrado"
    fi
done

# 3. Verificar se não há DndProvider perdido sendo referenciado
echo ""
echo "🔗 3. VERIFICANDO REFERÊNCIAS A DndProvider"
echo "-------------------------------------------"

# Buscar por imports de DndProvider que podem estar quebrados
echo "Procurando imports de DndProvider que podem estar quebrados:"
grep -r "DndProvider" src/ --include="*.tsx" --include="*.ts" | head -10

# 4. Verificar erros de TypeScript
echo ""
echo "🔧 4. VERIFICAÇÃO DE TIPOS TYPESCRIPT"
echo "-----------------------------------"

echo "Executando verificação de tipos..."
if npm run check 2>&1 | grep -E "(error|Error)" | head -10; then
    echo "⚠️ Erros de TypeScript encontrados (primeiros 10 listados acima)"
else
    echo "✅ Nenhum erro de TypeScript crítico encontrado"
fi

# 5. Verificar estrutura de componentes DnD
echo ""
echo "🏗️ 5. VERIFICANDO ESTRUTURA DE COMPONENTES DnD"
echo "---------------------------------------------"

echo "Verificando uso de hooks @dnd-kit:"
echo "useDraggable:"
grep -c "useDraggable" src/components/editor/dnd/*.tsx 2>/dev/null || echo "0"

echo "useDroppable:"
grep -c "useDroppable" src/components/editor/canvas/*.tsx 2>/dev/null || echo "0"

echo "DndContext:"
grep -c "DndContext" src/components/editor/EditorPro.tsx 2>/dev/null || echo "0"

# 6. Criar arquivo de correção se necessário
echo ""
echo "🛠️ 6. PREPARANDO CORREÇÕES SE NECESSÁRIO"
echo "========================================"

# Verificar se precisamos criar DndProvider
if ! find src -name "DndProvider.tsx" | grep -q .; then
    echo "⚠️ DndProvider.tsx não encontrado - pode precisar ser criado"
    echo "💡 Sugestão: Verificar se EditorPro já está usando DndContext diretamente"
fi

# 7. Testar compilação rápida
echo ""
echo "⚡ 7. TESTE RÁPIDO DE COMPILAÇÃO"
echo "=============================="

echo "Testando se o projeto compila sem erros críticos..."
if npm run build 2>&1 | grep -E "(error|Error|failed)" | head -5; then
    echo "❌ Erros de compilação encontrados"
else
    echo "✅ Compilação bem-sucedida"
fi

echo ""
echo "🎉 VERIFICAÇÃO COMPLETA CONCLUÍDA"
echo "==============================="
echo ""
echo "📋 PRÓXIMOS PASSOS RECOMENDADOS:"
echo "1. Verificar se existem erros de import nos arquivos listados acima"
echo "2. Confirmar se DndContext está sendo usado corretamente no EditorPro"
echo "3. Testar drag & drop no navegador (/editor)"
echo "4. Executar debug-dnd-comprehensive.js no console do navegador"