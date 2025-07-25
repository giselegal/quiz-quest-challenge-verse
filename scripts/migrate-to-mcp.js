#!/usr/bin/env node

/**
 * MCP Migration Helper Script
 * 
 * This script helps migrate existing code to use the MCP Protocol
 * Run with: node scripts/migrate-to-mcp.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectRoot = path.join(__dirname, '..');

// Migration patterns
const migrations = [
  {
    name: 'Supabase Direct Calls',
    pattern: /import\s+{\s*supabase\s*}\s+from\s+['"]@\/integrations\/supabase\/client['"];?/g,
    replacement: "import { useFunnelService } from '@/contexts/MCPContext';",
    description: 'Replace direct Supabase imports with MCP hooks'
  },
  {
    name: 'Supabase Query Calls',
    pattern: /supabase\.from\(['"`](\w+)['"`]\)\.select\(/g,
    replacement: (match, tableName) => {
      if (tableName === 'funnels') {
        return 'funnelService.getFunnelsByUser(userId, { // TODO: add proper query params';
      }
      return `// TODO: Convert to MCP service - ${match}`;
    },
    description: 'Convert Supabase queries to MCP service calls'
  },
  {
    name: 'Supabase Insert Calls',
    pattern: /supabase\.from\(['"`](\w+)['"`]\)\.insert\(/g,
    replacement: (match, tableName) => {
      if (tableName === 'funnels') {
        return 'funnelService.createFunnel({';
      }
      return `// TODO: Convert to MCP service - ${match}`;
    },
    description: 'Convert Supabase inserts to MCP service calls'
  },
  {
    name: 'Supabase Update Calls',
    pattern: /supabase\.from\(['"`](\w+)['"`]\)\.update\(/g,
    replacement: (match, tableName) => {
      if (tableName === 'funnels') {
        return 'funnelService.updateFunnel(id, {';
      }
      return `// TODO: Convert to MCP service - ${match}`;
    },
    description: 'Convert Supabase updates to MCP service calls'
  },
  {
    name: 'Supabase Delete Calls',
    pattern: /supabase\.from\(['"`](\w+)['"`]\)\.delete\(/g,
    replacement: (match, tableName) => {
      if (tableName === 'funnels') {
        return 'funnelService.deleteFunnel(id);';
      }
      return `// TODO: Convert to MCP service - ${match}`;
    },
    description: 'Convert Supabase deletes to MCP service calls'
  }
];

// File extensions to process
const fileExtensions = ['.ts', '.tsx', '.js', '.jsx'];

// Directories to scan
const scanDirs = ['src/components', 'src/pages', 'src/hooks', 'src/services'];

/**
 * Get all files in directory recursively
 */
function getAllFiles(dir, files = []) {
  if (!fs.existsSync(dir)) {
    return files;
  }

  const dirFiles = fs.readdirSync(dir);
  
  for (const file of dirFiles) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllFiles(filePath, files);
    } else if (fileExtensions.some(ext => file.endsWith(ext))) {
      files.push(filePath);
    }
  }
  
  return files;
}

/**
 * Apply migrations to a file
 */
function migrateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let newContent = content;
  let hasChanges = false;
  const appliedMigrations = [];

  for (const migration of migrations) {
    if (migration.pattern.test(newContent)) {
      newContent = newContent.replace(migration.pattern, migration.replacement);
      hasChanges = true;
      appliedMigrations.push(migration.name);
    }
  }

  return { hasChanges, newContent, appliedMigrations };
}

/**
 * Create backup of file
 */
function createBackup(filePath) {
  const backupPath = `${filePath}.mcp-backup`;
  fs.copyFileSync(filePath, backupPath);
  return backupPath;
}

/**
 * Add MCP Provider to App component
 */
function addMCPProvider() {
  const appFiles = [
    'src/App.tsx',
    'src/App.ts',
    'src/app.tsx',
    'src/app.ts',
    'src/main.tsx',
    'src/main.ts'
  ];

  for (const appFile of appFiles) {
    const fullPath = path.join(projectRoot, appFile);
    
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Check if MCP Provider is already added
      if (content.includes('MCPProvider')) {
        console.log(`✅ MCP Provider already exists in ${appFile}`);
        continue;
      }

      // Add import
      let newContent = content;
      if (!newContent.includes("import { MCPProvider }")) {
        newContent = `import { MCPProvider } from '@/contexts/MCPContext';\n` + newContent;
      }

      // Wrap main component with MCPProvider
      newContent = newContent.replace(
        /<([A-Z]\w*[^>]*>[\s\S]*?<\/\1>)/,
        `<MCPProvider>\n    $1\n  </MCPProvider>`
      );

      if (newContent !== content) {
        createBackup(fullPath);
        fs.writeFileSync(fullPath, newContent);
        console.log(`✅ Added MCP Provider to ${appFile}`);
      }
      
      break; // Only modify the first app file found
    }
  }
}

/**
 * Generate migration report
 */
function generateReport(results) {
  const report = {
    totalFiles: results.length,
    modifiedFiles: results.filter(r => r.hasChanges).length,
    migrationsApplied: results.reduce((acc, r) => acc + r.appliedMigrations.length, 0),
    backupsCreated: results.filter(r => r.hasChanges).length
  };

  console.log('\n📊 Migration Report:');
  console.log(`Total files scanned: ${report.totalFiles}`);
  console.log(`Files modified: ${report.modifiedFiles}`);
  console.log(`Migrations applied: ${report.migrationsApplied}`);
  console.log(`Backups created: ${report.backupsCreated}`);
  
  return report;
}

/**
 * Main migration function
 */
function runMigration() {
  console.log('🚀 Starting MCP Protocol Migration...\n');

  // Check if MCP files exist
  const mcpFiles = [
    'src/lib/mcp-adapter.ts',
    'src/services/mcp-services.ts',
    'src/contexts/MCPContext.tsx'
  ];

  for (const file of mcpFiles) {
    const fullPath = path.join(projectRoot, file);
    if (!fs.existsSync(fullPath)) {
      console.error(`❌ Required MCP file not found: ${file}`);
      console.log('Please ensure all MCP files are created first.');
      process.exit(1);
    }
  }

  console.log('✅ MCP files verified\n');

  // Get all files to migrate
  const allFiles = [];
  for (const dir of scanDirs) {
    const fullDir = path.join(projectRoot, dir);
    getAllFiles(fullDir, allFiles);
  }

  console.log(`📁 Found ${allFiles.length} files to scan\n`);

  // Apply migrations
  const results = [];
  
  for (const filePath of allFiles) {
    const relativePath = path.relative(projectRoot, filePath);
    process.stdout.write(`Processing ${relativePath}... `);
    
    try {
      const result = migrateFile(filePath);
      
      if (result.hasChanges) {
        createBackup(filePath);
        fs.writeFileSync(filePath, result.newContent);
        console.log(`✅ Modified (${result.appliedMigrations.join(', ')})`);
      } else {
        console.log('⏭️ No changes needed');
      }
      
      results.push({
        filePath: relativePath,
        hasChanges: result.hasChanges,
        appliedMigrations: result.appliedMigrations
      });
      
    } catch (error) {
      console.log(`❌ Error: ${error.message}`);
      results.push({
        filePath: relativePath,
        hasChanges: false,
        appliedMigrations: [],
        error: error.message
      });
    }
  }

  console.log('\n🔧 Adding MCP Provider to App...');
  addMCPProvider();

  // Generate report
  const report = generateReport(results);

  // Instructions
  console.log('\n📋 Next Steps:');
  console.log('1. Review the modified files and TODO comments');
  console.log('2. Configure your .env.local file with MCP settings');
  console.log('3. Test your application with: npm run dev');
  console.log('4. Check MCP status with <MCPStatus /> component');
  console.log('5. Remove backup files after confirming everything works');
  
  console.log('\n💡 Backup files created with .mcp-backup extension');
  console.log('   Remove them with: find . -name "*.mcp-backup" -delete');
  
  console.log('\n🎯 Migration completed successfully!');
}

/**
 * Rollback migration
 */
function rollbackMigration() {
  console.log('🔄 Rolling back MCP migration...\n');
  
  const backupFiles = [];
  
  // Find all backup files
  function findBackups(dir) {
    if (!fs.existsSync(dir)) return;
    
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        findBackups(filePath);
      } else if (file.endsWith('.mcp-backup')) {
        backupFiles.push(filePath);
      }
    }
  }
  
  for (const dir of scanDirs) {
    const fullDir = path.join(projectRoot, dir);
    findBackups(fullDir);
  }
  
  console.log(`Found ${backupFiles.length} backup files`);
  
  for (const backupPath of backupFiles) {
    const originalPath = backupPath.replace('.mcp-backup', '');
    fs.copyFileSync(backupPath, originalPath);
    fs.unlinkSync(backupPath);
    console.log(`✅ Restored ${path.relative(projectRoot, originalPath)}`);
  }
  
  console.log('\n🎯 Rollback completed!');
}

// CLI Interface
const command = process.argv[2];

switch (command) {
  case 'migrate':
  case undefined:
    runMigration();
    break;
    
  case 'rollback':
    rollbackMigration();
    break;
    
  case 'help':
  case '--help':
  case '-h':
    console.log('MCP Migration Helper');
    console.log('');
    console.log('Usage:');
    console.log('  node scripts/migrate-to-mcp.js          # Run migration');
    console.log('  node scripts/migrate-to-mcp.js migrate  # Run migration');
    console.log('  node scripts/migrate-to-mcp.js rollback # Rollback changes');
    console.log('  node scripts/migrate-to-mcp.js help     # Show this help');
    break;
    
  default:
    console.error(`Unknown command: ${command}`);
    console.log('Use "help" for usage information');
    process.exit(1);
}