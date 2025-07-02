# GitHub Secrets Necessárias para Deploy

Para o deploy automático funcionar corretamente, configure as seguintes secrets no GitHub:

## Secrets do Repositório

1. **FTP_PASSWORD**: Senha do FTP do Hostinger
   - Acesse: Settings > Secrets and variables > Actions > New repository secret
   - Nome: `FTP_PASSWORD`
   - Valor: [senha do FTP]

## Configurações de Deploy no Workflow

O workflow está configurado com os seguintes valores:

- Server: `ftp.giselegalvao.com.br`
- Username: `u116045488.giselegalvao`
- Diretório remoto: `/u116045488/domains/giselegalvao.com.br/public_html/quiz-de-estilo/`

## Como Configurar as Secrets

1. Vá para o repositório no GitHub
2. Clique em "Settings"
3. No menu lateral, clique em "Secrets and variables" > "Actions"
4. Clique em "New repository secret"
5. Adicione a secret `FTP_PASSWORD` com a senha do FTP

## Verificação do Deploy

Após configurar as secrets e fazer push:

1. O workflow será executado automaticamente
2. Verifique em "Actions" se o deploy foi bem-sucedido
3. Acesse https://giselegalvao.com.br/quiz-de-estilo/ para testar

## Troubleshooting

Se o deploy falhar:

1. Verifique se a secret `FTP_PASSWORD` está configurada
2. Confirme se as credenciais do FTP estão corretas
3. Verifique os logs do workflow em "Actions"
