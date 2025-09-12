/**
 * 🧪 TESTE DO SISTEMA INDEXEDDB AVANÇADO
 * 
 * Script para testar se o sistema de IndexedDB está sendo usado corretamente
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧪 TESTE: Sistema de IndexedDB Avançado');
console.log('=' .repeat(50));

// Simular situação de produção
const testAdvancedStorage = {
  
  // Teste 1: Verificar estrutura dos arquivos
  checkFiles: () => {
    console.log('📁 1. Verificando arquivos do sistema...');
    
    const requiredFiles = [
      'src/services/AdvancedFunnelStorage.ts',
      'src/services/FunnelStorageAdapter.ts', 
      'src/services/FunnelDataMigration.ts',
      'src/utils/storage/AdvancedStorageSystem.ts',
      'src/utils/storage/IndexedDBStorageService.ts'
    ];
    
    let allExist = true;
    requiredFiles.forEach(file => {
      const exists = fs.existsSync(file);
      console.log(`  ${exists ? '✅' : '❌'} ${file}`);
      if (!exists) allExist = false;
    });
    
    return allExist;
  },
  
  // Teste 2: Verificar imports nos arquivos que usam funnelLocalStore
  checkUsage: () => {
    console.log('\n📋 2. Verificando uso do funnelLocalStore...');
    
    try {
      const usageFiles = execSync('grep -r -l "funnelLocalStore\\." src/', { encoding: 'utf8' });
      const files = usageFiles.trim().split('\n').filter(f => f);
      
      console.log(`  📄 Encontrados ${files.length} arquivos usando funnelLocalStore:`);
      files.forEach(file => console.log(`     • ${file}`));
      
      // Verificar se usam métodos async
      const asyncUsage = execSync('grep -r "funnelLocalStore.*Async" src/ || true', { encoding: 'utf8' });
      const asyncFiles = asyncUsage.trim().split('\n').filter(f => f && !f.includes('grep'));
      
      console.log(`  🔄 Arquivos usando métodos async: ${asyncFiles.length}`);
      asyncFiles.forEach(file => console.log(`     • ${file}`));
      
      return { total: files.length, async: asyncFiles.length };
    } catch (error) {
      console.log('  ❌ Erro ao verificar uso:', error.message);
      return { total: 0, async: 0 };
    }
  },
  
  // Teste 3: Verificar documentação
  checkDocs: () => {
    console.log('\n📚 3. Verificando documentação...');
    const fs = require('fs');
    
    const docFiles = [
      'IMPLEMENTACAO_FINALIZADA_STORAGE_AVANCADO.md',
      'docs/ADVANCED_STORAGE_SYSTEM.md',
      'docs/storage/STORAGE_ANALYSIS_AND_PROPOSAL.md'
    ];
    
    let docsExist = 0;
    docFiles.forEach(file => {
      const exists = fs.existsSync(file);
      console.log(`  ${exists ? '✅' : '❌'} ${file}`);
      if (exists) docsExist++;
    });
    
    return docsExist;
  },
  
  // Teste 4: Análise de compatibilidade
  checkCompatibility: () => {
    console.log('\n🔄 4. Verificando compatibilidade...');
    const fs = require('fs');
    
    // Verificar se FunnelStorageAdapter mantém API compatível
    const adapterPath = 'src/services/FunnelStorageAdapter.ts';
    if (fs.existsSync(adapterPath)) {
      const content = fs.readFileSync(adapterPath, 'utf8');
      
      const methods = ['list', 'listAsync', 'get', 'getAsync', 'upsert', 'upsertAsync'];
      const hasAllMethods = methods.every(method => content.includes(`${method}(`));
      
      console.log(`  ✅ API compatível: ${hasAllMethods ? 'SIM' : 'NÃO'}`);
      console.log(`  📊 Métodos encontrados: ${methods.filter(m => content.includes(`${m}(`)).join(', ')}`);
      
      // Verificar se há inicialização automática
      const hasAutoInit = content.includes('StorageInitializer.ensureInitialized');
      console.log(`  🔄 Inicialização automática: ${hasAutoInit ? 'SIM' : 'NÃO'}`);
      
      return hasAllMethods;
    }
    
    return false;
  },
  
  // Resultado final
  generateReport: (results) => {
    console.log('\n📊 RELATÓRIO FINAL:');
    console.log('=' .repeat(30));
    
    const { files, usage, docs, compatibility } = results;
    
    console.log(`✅ Arquivos do sistema: ${files ? 'OK' : 'PROBLEMA'}`);
    console.log(`📄 Arquivos usando sistema: ${usage.total}`);
    console.log(`🔄 Usando métodos async: ${usage.async}/${usage.total} (${Math.round(usage.async/usage.total*100) || 0}%)`);
    console.log(`📚 Documentação disponível: ${docs}/3 arquivos`);
    console.log(`🔄 API compatível: ${compatibility ? 'SIM' : 'NÃO'}`);
    
    const score = [files, usage.async > 0, docs > 0, compatibility].filter(Boolean).length;
    console.log(`\n🎯 SCORE GERAL: ${score}/4`);
    
    if (score >= 3) {
      console.log('✅ Sistema bem implementado - apenas precisa de mais uso dos métodos async');
    } else if (score >= 2) {
      console.log('⚠️ Sistema implementado mas com problemas de integração');
    } else {
      console.log('❌ Sistema com problemas sérios de implementação');
    }
    
    console.log('\n💡 RECOMENDAÇÕES:');
    if (usage.async < usage.total) {
      console.log('  • Migrar códigos para usar métodos *Async() do funnelLocalStore');
    }
    if (!compatibility) {
      console.log('  • Verificar se FunnelStorageAdapter está completo');  
    }
    if (docs < 3) {
      console.log('  • Completar documentação do sistema');
    }
  }
};

// Executar testes
try {
  const results = {
    files: testAdvancedStorage.checkFiles(),
    usage: testAdvancedStorage.checkUsage(), 
    docs: testAdvancedStorage.checkDocs(),
    compatibility: testAdvancedStorage.checkCompatibility()
  };
  
  testAdvancedStorage.generateReport(results);
  
} catch (error) {
  console.error('❌ Erro durante os testes:', error.message);
}