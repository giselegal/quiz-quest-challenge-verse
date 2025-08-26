/**
 * 🔍 DIAGNÓSTICO COMPLETO DRAG & DROP
 * Script abrangente para testar funcionalidade DnD no editor
 */

console.log('🎯 ==============================================');
console.log('🎯 DIAGNÓSTICO COMPLETO DRAG & DROP INICIADO');
console.log('🎯 ==============================================');

// 1. VERIFICAÇÃO DE DEPENDÊNCIAS
console.log('\n📦 1. VERIFICAÇÃO DE DEPENDÊNCIAS DND-KIT');
console.log('==========================================');

try {
  const dndCore = require('@dnd-kit/core');
  console.log('✅ @dnd-kit/core carregado:', Object.keys(dndCore).slice(0, 5));
} catch (e) {
  console.log('❌ @dnd-kit/core não carregado:', e.message);
}

try {
  const dndSortable = require('@dnd-kit/sortable');
  console.log('✅ @dnd-kit/sortable carregado:', Object.keys(dndSortable).slice(0, 5));
} catch (e) {
  console.log('❌ @dnd-kit/sortable não carregado:', e.message);
}

// 2. VERIFICAÇÃO DE ESTRUTURA DOM
console.log('\n🏗️ 2. VERIFICAÇÃO DE ESTRUTURA DOM');
console.log('=================================');

const checkDOMStructure = () => {
  const sidebar = document.querySelector('.components-sidebar, [data-testid="components-sidebar"]');
  const canvas = document.querySelector('.canvas-area, [data-testid="canvas-area"]');
  const draggables = document.querySelectorAll('[data-dnd-kit-draggable-id]');
  const droppables = document.querySelectorAll('[data-dnd-kit-droppable-id]');
  
  console.log('🔍 Estrutura encontrada:');
  console.log(`   Sidebar: ${!!sidebar ? '✅' : '❌'} (${sidebar?.className || 'não encontrada'})`);
  console.log(`   Canvas: ${!!canvas ? '✅' : '❌'} (${canvas?.className || 'não encontrada'})`);
  console.log(`   Draggables: ${draggables.length} encontrados`);
  console.log(`   Droppables: ${droppables.length} encontrados`);
  
  if (draggables.length > 0) {
    console.log('📋 Primeiros draggables encontrados:');
    Array.from(draggables).slice(0, 3).forEach((el, i) => {
      console.log(`   ${i+1}. ID: ${el.getAttribute('data-dnd-kit-draggable-id')}`);
      console.log(`      Classes: ${el.className}`);
    });
  }
  
  if (droppables.length > 0) {
    console.log('🎯 Primeiros droppables encontrados:');
    Array.from(droppables).slice(0, 3).forEach((el, i) => {
      console.log(`   ${i+1}. ID: ${el.getAttribute('data-dnd-kit-droppable-id')}`);
      console.log(`      Classes: ${el.className}`);
    });
  }
  
  return { sidebar, canvas, draggables, droppables };
};

// 3. VERIFICAÇÃO DE EVENTOS DnD
console.log('\n🎮 3. VERIFICAÇÃO DE EVENTOS DnD');
console.log('==============================');

const setupEventListeners = () => {
  // Interceptar logs do console para capturar eventos DnD
  const originalLog = console.log;
  let dndEvents = [];
  
  console.log = (...args) => {
    const message = args.join(' ');
    if (message.includes('🎯 DRAG') || message.includes('DnD')) {
      dndEvents.push({
        timestamp: new Date().toISOString(),
        message: message
      });
    }
    originalLog.apply(console, args);
  };
  
  return () => {
    console.log = originalLog;
    return dndEvents;
  };
};

// 4. TESTE DE INTERAÇÃO SIMULADA
console.log('\n🧪 4. CONFIGURAÇÃO DE TESTE DE INTERAÇÃO');
console.log('======================================');

const simulateDragInteraction = () => {
  const structure = checkDOMStructure();
  
  if (structure.draggables.length === 0) {
    console.log('❌ Nenhum elemento draggable encontrado para teste');
    return false;
  }
  
  if (structure.droppables.length === 0) {
    console.log('❌ Nenhum elemento droppable encontrado para teste');
    return false;
  }
  
  const firstDraggable = structure.draggables[0];
  const firstDroppable = structure.droppables[0];
  
  console.log('🎯 Elementos selecionados para teste:');
  console.log(`   Draggable: ${firstDraggable.getAttribute('data-dnd-kit-draggable-id')}`);
  console.log(`   Droppable: ${firstDroppable.getAttribute('data-dnd-kit-droppable-id')}`);
  
  try {
    // Simular início do drag
    const dragStartEvent = new PointerEvent('pointerdown', {
      bubbles: true,
      cancelable: true,
      pointerId: 1,
      clientX: 100,
      clientY: 100
    });
    
    firstDraggable.dispatchEvent(dragStartEvent);
    console.log('✅ Evento pointerdown simulado');
    
    // Simular movimento
    setTimeout(() => {
      const dragMoveEvent = new PointerEvent('pointermove', {
        bubbles: true,
        cancelable: true,
        pointerId: 1,
        clientX: 200,
        clientY: 200
      });
      
      document.dispatchEvent(dragMoveEvent);
      console.log('✅ Evento pointermove simulado');
      
      // Simular fim do drag
      setTimeout(() => {
        const dragEndEvent = new PointerEvent('pointerup', {
          bubbles: true,
          cancelable: true,
          pointerId: 1,
          clientX: 200,
          clientY: 200
        });
        
        firstDroppable.dispatchEvent(dragEndEvent);
        console.log('✅ Evento pointerup simulado');
        
      }, 100);
    }, 100);
    
    return true;
    
  } catch (error) {
    console.log('❌ Erro ao simular interação:', error.message);
    return false;
  }
};

// 5. VERIFICAÇÃO DE CSS INTERFERENTE
console.log('\n🎨 5. VERIFICAÇÃO DE CSS INTERFERENTE');
console.log('===================================');

const checkInterferingCSS = () => {
  const problematicElements = [];
  
  // Verificar elementos com pointer-events: none
  const allElements = document.querySelectorAll('*');
  Array.from(allElements).forEach(el => {
    const style = window.getComputedStyle(el);
    
    if (style.pointerEvents === 'none' && 
        (el.closest('[data-dnd-kit-draggable-id]') || el.closest('[data-dnd-kit-droppable-id]'))) {
      problematicElements.push({
        element: el,
        issue: 'pointer-events: none',
        context: el.closest('[data-dnd-kit-draggable-id], [data-dnd-kit-droppable-id]')?.getAttribute('data-dnd-kit-draggable-id') || 
                el.closest('[data-dnd-kit-draggable-id], [data-dnd-kit-droppable-id]')?.getAttribute('data-dnd-kit-droppable-id')
      });
    }
    
    // Verificar z-index conflicts
    if (parseInt(style.zIndex) > 1000 && el.contains(document.querySelector('[data-dnd-kit-draggable-id]'))) {
      problematicElements.push({
        element: el,
        issue: `z-index muito alto: ${style.zIndex}`,
        context: 'container de draggable'
      });
    }
  });
  
  if (problematicElements.length > 0) {
    console.log('⚠️ Elementos potencialmente problemáticos encontrados:');
    problematicElements.forEach((item, i) => {
      console.log(`   ${i+1}. ${item.issue} (contexto: ${item.context})`);
    });
  } else {
    console.log('✅ Nenhum CSS interferente óbvio encontrado');
  }
  
  return problematicElements;
};

// 6. FUNÇÃO PRINCIPAL DE DIAGNÓSTICO
console.log('\n🎯 6. EXECUTANDO DIAGNÓSTICO COMPLETO');
console.log('===================================');

const runFullDiagnosis = () => {
  console.log('🏃‍♂️ Iniciando diagnóstico completo...');
  
  // Aguardar carregamento da página
  if (document.readyState !== 'complete') {
    console.log('⏳ Aguardando carregamento completo da página...');
    window.addEventListener('load', runFullDiagnosis);
    return;
  }
  
  const eventListener = setupEventListeners();
  
  setTimeout(() => {
    console.log('\n📊 RESULTADOS DO DIAGNÓSTICO:');
    console.log('============================');
    
    const structure = checkDOMStructure();
    const cssIssues = checkInterferingCSS();
    const canSimulate = simulateDragInteraction();
    
    const events = eventListener();
    
    console.log('\n📈 RESUMO FINAL:');
    console.log('================');
    console.log(`✅ Draggables encontrados: ${structure.draggables.length}`);
    console.log(`✅ Droppables encontrados: ${structure.droppables.length}`);
    console.log(`${cssIssues.length === 0 ? '✅' : '⚠️'} Problemas CSS: ${cssIssues.length}`);
    console.log(`${canSimulate ? '✅' : '❌'} Simulação de drag: ${canSimulate ? 'possível' : 'falhou'}`);
    console.log(`📊 Eventos DnD capturados: ${events.length}`);
    
    if (events.length > 0) {
      console.log('\n📋 Eventos DnD detectados:');
      events.forEach((event, i) => {
        console.log(`   ${i+1}. ${event.timestamp}: ${event.message}`);
      });
    }
    
  }, 3000); // Aguardar 3 segundos para capturar eventos
};

// FUNÇÕES EXPOSTAS GLOBALMENTE PARA TESTE MANUAL
window.debugDnD = {
  runFullDiagnosis,
  checkDOMStructure,
  simulateDragInteraction,
  checkInterferingCSS
};

console.log('\n🛠️ FUNÇÕES DISPONÍVEIS PARA TESTE MANUAL:');
console.log('========================================');
console.log('window.debugDnD.runFullDiagnosis()    - Executa diagnóstico completo');
console.log('window.debugDnD.checkDOMStructure()   - Verifica estrutura DOM');
console.log('window.debugDnD.simulateDragInteraction() - Simula interação de drag');
console.log('window.debugDnD.checkInterferingCSS() - Verifica CSS interferente');

// Executar automaticamente se não estiver em teste
if (typeof module === 'undefined') {
  runFullDiagnosis();
}