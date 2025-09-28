#!/usr/bin/env node

/**
 * 🔍 TESTE DA API KEY CLOUDINARY
 * 
 * Script para testar se a API Key está funcionando
 */

import { config } from 'dotenv';

config();

const CLOUD_NAME = process.env.VITE_CLOUDINARY_CLOUD_NAME || 'dqljyf76t';
const API_KEY = process.env.CLOUDINARY_API_KEY;

console.log('🔍 TESTE DA API KEY CLOUDINARY');
console.log('==============================');
console.log(`📡 Cloud Name: ${CLOUD_NAME}`);
console.log(`🔑 API Key: ${API_KEY}`);
console.log('');

if (!API_KEY || API_KEY === 'your_api_key_here') {
    console.log('❌ API Key não configurada');
    process.exit(1);
}

// Análise da API Key
console.log('📊 ANÁLISE DA API KEY:');
console.log('======================');
console.log(`📏 Comprimento: ${API_KEY.length} caracteres`);
console.log(`🔢 É numérica: ${/^\d+$/.test(API_KEY) ? 'Sim' : 'Não'}`);
console.log(`✅ Formato válido: ${API_KEY.length >= 15 && /^\d+$/.test(API_KEY) ? 'Sim' : 'Não'}`);
console.log('');

// Verificar o formato esperado do Cloudinary
const isValidFormat = /^\d{15,20}$/.test(API_KEY);
console.log(`🎯 Compatível com Cloudinary: ${isValidFormat ? '✅ Sim' : '❌ Não'}`);
console.log('');

if (isValidFormat) {
    console.log('🎉 A chave parece estar no formato correto!');
    console.log('');
    console.log('📋 PRÓXIMOS PASSOS:');
    console.log('1. Obtenha o API Secret correspondente');
    console.log('2. Adicione-o ao .env como CLOUDINARY_API_SECRET');
    console.log('3. Execute novamente: npm run cloudinary:today');
} else {
    console.log('⚠️  A chave pode não estar no formato esperado');
    console.log('');
    console.log('📋 VERIFICAÇÕES:');
    console.log('1. Confirme se é realmente uma API Key do Cloudinary');
    console.log('2. Verifique se não há caracteres extras');
    console.log('3. Confirme se foi copiada corretamente');
}

console.log('');
console.log('🔗 Para obter credenciais completas:');
console.log('   https://console.cloudinary.com/settings/api-keys');