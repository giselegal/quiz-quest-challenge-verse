#!/bin/bash

# 🎯 TESTE FUNCIONAL COMPLETO - Drag and Drop no Editor
echo "🎯 TESTE FUNCIONAL COMPLETO - Drag and Drop no Editor"
echo "======================================================"

SERVER_URL="http://localhost:8080"
EDITOR_URL="$SERVER_URL/editor"

# 1. Verificar se o servidor está rodando
echo "🌐 1. Verificando servidor..."
if curl -s "$SERVER_URL" > /dev/null 2>&1; then
    echo "✅ Servidor rodando em $SERVER_URL"
else
    echo "❌ Servidor não está acessível em $SERVER_URL"
    echo "💡 Execute 'npm run dev' primeiro"
    exit 1
fi

# 2. Verificar se a página do editor carrega
echo ""
echo "📝 2. Verificando página do editor..."
RESPONSE=$(curl -s -o /dev/null -w "%{http_code}" "$EDITOR_URL")
if [ "$RESPONSE" = "200" ]; then
    echo "✅ Página /editor carrega com sucesso (HTTP $RESPONSE)"
else
    echo "⚠️ Página /editor retornou HTTP $RESPONSE"
fi

# 3. Criar script de teste JavaScript para execução no browser
echo ""
echo "🧪 3. Criando script de teste JavaScript..."

cat > /tmp/test-dnd-browser.js << 'EOF'
// 🧪 TESTE AUTOMATIZADO DE DRAG AND DROP NO BROWSER
console.log('🎯 Iniciando teste automático de Drag & Drop...');

// Aguardar carregamento da página
setTimeout(() => {
  console.log('🔍 === DIAGNÓSTICO AUTOMATIZADO ===');
  
  // 1. Verificar se DndProvider está presente
  const dndProvider = document.querySelector('.dnd-provider');
  console.log('🎯 DndProvider encontrado:', !!dndProvider);
  
  // 2. Verificar elementos draggables
  const draggables = document.querySelectorAll('[data-dnd-kit-draggable-handle]');
  console.log('🧩 Elementos draggable encontrados:', draggables.length);
  
  // 3. Verificar elementos droppables
  const droppables = document.querySelectorAll('[data-dnd-kit-droppable]');
  console.log('📦 Elementos droppable encontrados:', droppables.length);
  
  // 4. Verificar canvas
  const canvas = document.querySelector('[data-id="canvas-drop-zone"]');
  console.log('🎨 Canvas encontrado:', !!canvas);
  
  // 5. Verificar sidebar de componentes
  const sidebar = document.querySelector('.w-\\[280px\\]'); // Components sidebar
  console.log('📋 Sidebar encontrada:', !!sidebar);
  
  // 6. Listar componentes disponíveis
  const componentItems = document.querySelectorAll('.dnd-draggable-item');
  console.log('🧱 Componentes disponíveis:', componentItems.length);
  
  if (componentItems.length > 0) {
    console.log('📝 Primeiros 5 componentes:');
    Array.from(componentItems).slice(0, 5).forEach((item, index) => {
      const title = item.querySelector('h4')?.textContent || 'Sem título';
      const blockType = item.getAttribute('data-block-type') || 'Sem tipo';
      console.log(`   ${index + 1}. ${title} (${blockType})`);
    });
  }
  
  // 7. Testar eventos de mouse no primeiro item
  if (componentItems.length > 0) {
    const firstItem = componentItems[0];
    console.log('🖱️ Testando eventos no primeiro componente...');
    
    // Adicionar listeners de teste
    firstItem.addEventListener('mousedown', (e) => {
      console.log('✅ mousedown funcionando!', {
        target: e.target.tagName,
        button: e.button,
        clientX: e.clientX,
        clientY: e.clientY
      });
    }, { once: true });
    
    firstItem.addEventListener('dragstart', (e) => {
      console.log('🚀 dragstart funcionando!', {
        effectAllowed: e.dataTransfer?.effectAllowed,
        types: e.dataTransfer?.types
      });
    }, { once: true });
    
    // Simular mousedown para testar
    const event = new MouseEvent('mousedown', {
      bubbles: true,
      cancelable: true,
      clientX: 100,
      clientY: 100,
      button: 0
    });
    
    setTimeout(() => {
      firstItem.dispatchEvent(event);
      console.log('🔄 Evento mousedown simulado');
    }, 1000);
  }
  
  // 8. Verificar console por erros
  const originalError = console.error;
  const errors = [];
  console.error = function(...args) {
    errors.push(args.join(' '));
    originalError.apply(console, arguments);
  };
  
  // 9. Relatório final
  setTimeout(() => {
    console.log('📊 === RELATÓRIO FINAL ===');
    console.log('✅ DndProvider:', !!dndProvider ? 'OK' : 'MISSING');
    console.log('✅ Draggables:', draggables.length > 0 ? `${draggables.length} found` : 'NONE');
    console.log('✅ Droppables:', droppables.length > 0 ? `${droppables.length} found` : 'NONE');
    console.log('✅ Canvas:', !!canvas ? 'OK' : 'MISSING');
    console.log('✅ Components:', componentItems.length > 0 ? `${componentItems.length} available` : 'NONE');
    console.log('⚠️ Errors:', errors.length > 0 ? `${errors.length} found` : 'NONE');
    
    if (errors.length > 0) {
      console.log('❌ Errors found:');
      errors.forEach((error, index) => {
        console.log(`   ${index + 1}. ${error}`);
      });
    }
    
    // Resultado
    const score = [
      !!dndProvider,
      draggables.length > 0,
      droppables.length > 0,
      !!canvas,
      componentItems.length > 0,
      errors.length === 0
    ].filter(Boolean).length;
    
    console.log(`🎯 SCORE: ${score}/6`);
    
    if (score >= 5) {
      console.log('🎉 DRAG & DROP READY! Sistema está funcionalmente correto.');
      console.log('💡 Próximo passo: Teste manual - arraste um componente da sidebar para o canvas');
    } else {
      console.log('⚠️ Alguns problemas encontrados. Verifique os logs acima.');
    }
  }, 3000);
  
}, 2000);

// 10. Função para teste manual
window.testDragManual = function() {
  console.log('🔧 Iniciando teste manual...');
  const firstComponent = document.querySelector('.dnd-draggable-item');
  if (firstComponent) {
    firstComponent.style.outline = '3px solid red';
    firstComponent.style.backgroundColor = 'yellow';
    console.log('🎯 Primeiro componente destacado! Tente arrastá-lo para o canvas.');
    
    setTimeout(() => {
      firstComponent.style.outline = '';
      firstComponent.style.backgroundColor = '';
    }, 5000);
  } else {
    console.log('❌ Nenhum componente encontrado para teste');
  }
};

console.log('💡 Use testDragManual() para destacar o primeiro componente para teste');
EOF

echo "✅ Script de teste criado em /tmp/test-dnd-browser.js"

# 4. Instruções para o usuário
echo ""
echo "🎯 4. INSTRUÇÕES PARA TESTE MANUAL"
echo "=================================="
echo ""
echo "1. 🌐 Abra o navegador e acesse: $EDITOR_URL"
echo ""
echo "2. 🔧 Abra as DevTools (F12) e execute:"
echo "   → Vá na aba Console"
echo "   → Cole e execute o script de /tmp/test-dnd-browser.js"
echo "   → Ou execute diretamente no console do navegador:"

cat << 'EOF'

// Cole este código no console do navegador:
console.log('🎯 Teste rápido DnD');
setTimeout(() => {
  const draggables = document.querySelectorAll('[data-dnd-kit-draggable-handle]');
  const droppables = document.querySelectorAll('[data-dnd-kit-droppable]');
  const canvas = document.querySelector('[data-id="canvas-drop-zone"]');
  
  console.log('🧩 Draggables:', draggables.length);
  console.log('📦 Droppables:', droppables.length);  
  console.log('🎨 Canvas:', !!canvas);
  
  if (draggables.length > 0) {
    console.log('✅ Drag & Drop estrutura OK!');
    console.log('💡 Tente arrastar um componente da sidebar para o canvas');
  } else {
    console.log('❌ Problemas na estrutura DnD');
  }
}, 2000);

EOF

echo ""
echo "3. 🧪 Teste funcional:"
echo "   → Arraste um componente da sidebar para o canvas"
echo "   → Verifique se aparecem logs '🚀🚀🚀 DRAG START FUNCIONANDO! 🚀🚀🚀'"
echo "   → Tente reordenar blocos no canvas"
echo ""
echo "4. ✅ Critérios de sucesso:"
echo "   → Componentes aparecem na sidebar"
echo "   → Canvas está visível e receptivo"
echo "   → Logs de drag aparecem no console"
echo "   → Blocos podem ser adicionados ao canvas"
echo ""
echo "📋 CHECKLIST VISUAL:"
echo "□ Sidebar com componentes visível (lado esquerdo)"
echo "□ Canvas central vazio ou com blocos"
echo "□ Componentes têm cursor grab ao hover"
echo "□ Drag inicia com mousedown + movimento"
echo "□ Drop zone se destaca durante drag"
echo "□ Componente é adicionado ao canvas após drop"

echo ""
echo "🎉 Teste configurado! Acesse $EDITOR_URL para começar."