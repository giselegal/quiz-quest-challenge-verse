#!/bin/bash

# 🔧 TESTE DE CONECTIVIDADE FTP - DIAGNÓSTICO COMPLETO
echo "� TESTE DE CONECTIVIDADE FTP - HOSTINGER"
echo "========================================"

# Configurações FTP atuais do workflow
FTP_SERVER="ftp.giselegalvao.com.br"
FTP_USER="u116045488.giselegalvao"
FTP_PATH="/u116045488/domains/giselegalvao.com.br/public_html/quiz-de-estilo/"

echo "📋 Configurações do Deploy:"
echo "  Server: $FTP_SERVER"
echo "  User: $FTP_USER"  
echo "  Path: $FTP_PATH"
echo "  Password: ❌ FALTANDO - CONFIGURE NO GITHUB SECRETS"
echo ""

echo "🔍 Executando testes de conectividade..."

# Teste 1: Resolução DNS
echo "1. Testando resolução DNS..."
if nslookup $FTP_SERVER > /dev/null 2>&1; then
    echo "   ✅ DNS resolve corretamente"
    IP=$(nslookup $FTP_SERVER | grep -A1 "Name:" | tail -1 | awk '{print $2}')
    echo "   IP: $IP"
else
    echo "   ❌ Erro na resolução DNS"
fi

# Teste 2: Conectividade básica
echo ""
echo "2. Testando conectividade na porta 21..."
if timeout 10s bash -c "echo 'QUIT' | nc $FTP_SERVER 21" > /dev/null 2>&1; then
    echo "   ✅ Porta 21 acessível"
else
    echo "   ❌ Porta 21 inacessível ou filtrada"
fi

# Teste 3: Curl FTP
echo ""
echo "3. Testando com curl..."
if curl -s --connect-timeout 10 --max-time 20 "ftp://$FTP_SERVER" > /dev/null 2>&1; then
    echo "   ✅ Servidor FTP responde ao curl"
else
    echo "   ❌ Servidor FTP não responde ao curl"
fi

echo ""
echo "🎯 DIAGNÓSTICO:"
echo "   • Servidor FTP: $FTP_SERVER"
echo "   • Usuário: $FTP_USER"
echo "   • ❌ PROBLEMA PRINCIPAL: Secret FTP_PASSWORD não configurada"
echo ""

echo "⚡ SOLUÇÃO IMEDIATA:"
echo "   1. Acesse: https://github.com/[SEU-USUARIO]/quiz-quest-challenge-verse/settings/secrets/actions"
echo "   2. Clique: 'New repository secret'"
echo "   3. Nome: FTP_PASSWORD"
echo "   4. Valor: [Senha do FTP do Hostinger]"
echo "   5. Salve a secret"
echo "   6. Execute o workflow manualmente"
echo ""

echo "🔗 Links úteis:"
echo "   • GitHub Actions: https://github.com/[SEU-USUARIO]/quiz-quest-challenge-verse/actions"
echo "   • Site após deploy: https://giselegalvao.com.br/quiz-de-estilo/"
echo ""

echo "✅ Teste concluído! Configure a secret FTP_PASSWORD para continuar."
