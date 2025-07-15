#!/bin/bash
# Script para facilitar operações com arquivos no projeto

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Exibe o diretório atual
echo -e "${YELLOW}Diretório atual:${NC} $(pwd)"

# Função para listar caminhos
list_paths() {
  echo -e "${GREEN}=== Estrutura do Projeto ===${NC}"
  echo -e "${YELLOW}Diretório de componentes:${NC} ./src/components/"
  echo -e "${YELLOW}Componentes de funil:${NC} ./src/components/funnel-blocks/"
  echo -e "${YELLOW}Etapas do funil:${NC} ./src/components/funnel-blocks/steps/"
  echo -e "${YELLOW}Componentes compartilhados:${NC} ./src/components/funnel-blocks/shared/"
  echo -e "${YELLOW}Configuração do editor:${NC} ./src/config/"
  echo -e "${YELLOW}Arquivos de tipos:${NC} ./src/types/"
}

# Função para criar um componente
create_component() {
  local path=$1
  local filename=$2
  local template=$3
  
  echo -e "${YELLOW}Criando componente em ${path}/${filename}${NC}"
  echo "$template" > "${path}/${filename}"
  
  if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Componente criado com sucesso!${NC}"
  else
    echo -e "${RED}✗ Erro ao criar componente!${NC}"
  fi
}

# Função para editar um arquivo
edit_file() {
  local filepath=$1
  
  if [ -f "$filepath" ]; then
    echo -e "${YELLOW}Editando arquivo: $filepath${NC}"
    nano "$filepath"
  else
    echo -e "${RED}Arquivo não encontrado: $filepath${NC}"
  fi
}

# Comando principal
case "$1" in
  "list")
    list_paths
    ;;
  "create")
    if [ "$2" == "step" ]; then
      template="import React from 'react';
import { FunnelStepProps } from '@/types/funnel';

interface ${3}Props extends FunnelStepProps {
  // Propriedades específicas
}

const $3: React.FC<${3}Props> = ({
  id,
  className,
  onNext,
  onPrevious,
  data = {}
}) => {
  return (
    <div className=\"funnel-step\">
      <h2>Novo componente: $3</h2>
      {/* Conteúdo do componente */}
    </div>
  );
};

export default $3;"
      
      create_component "./src/components/funnel-blocks/steps" "$3.tsx" "$template"
    elif [ "$2" == "shared" ]; then
      template="import React from 'react';

interface $3Props {
  // Propriedades do componente
}

const $3: React.FC<$3Props> = (props) => {
  return (
    <div className=\"shared-component\">
      <h3>Componente Compartilhado: $3</h3>
      {/* Conteúdo do componente */}
    </div>
  );
};

export default $3;"
      
      create_component "./src/components/funnel-blocks/shared" "$3.tsx" "$template"
    else
      echo -e "${RED}Tipo de componente desconhecido: $2${NC}"
      echo -e "Tipos disponíveis: step, shared"
    fi
    ;;
  "edit")
    edit_file "$2"
    ;;
  *)
    echo -e "${YELLOW}Uso:${NC}"
    echo -e "  ${GREEN}./path-helper.sh list${NC} - Listar caminhos importantes"
    echo -e "  ${GREEN}./path-helper.sh create step NomeDoComponente${NC} - Criar um novo componente de etapa"
    echo -e "  ${GREEN}./path-helper.sh create shared NomeDoComponente${NC} - Criar um componente compartilhado"
    echo -e "  ${GREEN}./path-helper.sh edit caminho/para/arquivo${NC} - Editar um arquivo existente"
    ;;
esac

exit 0
