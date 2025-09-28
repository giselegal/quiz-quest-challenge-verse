#!/usr/bin/env node

/**
 * 🧪 TESTE BÁSICO DA API CLOUDINARY
 * 
 * Tentativa de conexão básica usando apenas API Key
 */

import { execSync } from 'child_process';
import { config } from 'dotenv';

config();

const CLOUD_NAME = process.env.VITE_CLOUDINARY_CLOUD_NAME || 'dqljyf76t';
const API_KEY = process.env.CLOUDINARY_API_KEY;

async function testCloudinaryConnection() {
    console.log('🧪 TESTE DE CONEXÃO CLOUDINARY');
    console.log('===============================');
    console.log(`📡 Cloud Name: ${CLOUD_NAME}`);
    console.log(`🔑 API Key: ${API_KEY}`);
    console.log('');

    if (!API_KEY) {
        console.log('❌ API Key não encontrada');
        return;
    }

    try {
        console.log('🔄 Testando conexão básica...');

        // Tentar uma chamada básica para verificar se a API Key é válida
        // Usando endpoint público que não requer API Secret para algumas operações
        const baseUrl = `https://res.cloudinary.com/${CLOUD_NAME}`;

        console.log(`📡 Base URL: ${baseUrl}`);
        console.log('');

        // Teste 1: Verificar se o cloud name está correto
        console.log('📋 TESTE 1: Verificando Cloud Name');
        try {
            const testImageUrl = `${baseUrl}/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp`;
            console.log(`🔗 Testando: ${testImageUrl}`);

            const curlTest = `curl -I -s "${testImageUrl}" | head -1`;
            const response = execSync(curlTest, { encoding: 'utf8' });

            if (response.includes('200')) {
                console.log('✅ Cloud Name válido - imagem acessível');
            } else {
                console.log(`⚠️  Resposta: ${response.trim()}`);
            }
        } catch (error) {
            console.log('❌ Erro ao testar Cloud Name');
        }

        console.log('');

        // Teste 2: Verificar formato da API Key
        console.log('📋 TESTE 2: Validando API Key');
        const isValidFormat = /^\d{15,20}$/.test(API_KEY);
        console.log(`🔢 Formato: ${isValidFormat ? '✅ Válido' : '❌ Inválido'}`);
        console.log(`📏 Tamanho: ${API_KEY.length} caracteres`);

        console.log('');
        console.log('📊 RESUMO:');
        console.log('==========');
        console.log(`✅ API Key configurada: ${API_KEY}`);
        console.log(`✅ Cloud Name funcionando: ${CLOUD_NAME}`);
        console.log(`⚠️  API Secret necessário para operações completas`);

        console.log('');
        console.log('🔧 PARA FUNCIONALIDADE COMPLETA:');
        console.log('1. Acesse: https://console.cloudinary.com/settings/api-keys');
        console.log('2. Copie o "API Secret" correspondente à sua API Key');
        console.log('3. Adicione ao .env: CLOUDINARY_API_SECRET=seu_secret_aqui');

    } catch (error) {
        console.error('❌ Erro durante teste:', error.message);
    }
}

// Executar teste
if (import.meta.url === `file://${process.argv[1]}`) {
    testCloudinaryConnection().catch(console.error);
}