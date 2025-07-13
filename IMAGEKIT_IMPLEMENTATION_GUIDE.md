# Guia de Implementação ImageKit

Este guia explica como usar o ImageKit no projeto Quiz Quest Challenge Verse para substituir as imagens do Cloudinary.

## Configuração

### 1. Credenciais ImageKit

As credenciais estão configuradas em `client/src/services/imageKitService.ts`:

```typescript
export const imageKitConfig = {
  publicKey: "public_aefgGxZYG6EbJCM3mnwW7cw/r0g=",
  urlEndpoint: "https://ik.imagekit.io/1wxfl3468",
  transformationPosition: "path" as const,
  authenticationEndpoint: "http://www.yourserver.com/auth",
};
```

### 2. Imagens Mapeadas

As seguintes imagens foram mapeadas do Cloudinary para o ImageKit:

- **Logo**: `/logo.webp`
- **Hero Image**: `/hero-image.jpg`
- **Estilos**: `/style-{tipo}.webp` (natural, classic, contemporary, elegant, romantic, sexy, dramatic, creative)
- **Guias**: `/guide-{tipo}.webp`
- **Páginas**: `/problem-image.webp`, `/solution-quiz-image.webp`, `/guides-benefits-image.webp`, etc.

## Como Usar

### 1. Usando o Componente IKImage diretamente

```tsx
import React from 'react';
import { IKImage, IKContext } from 'imagekitio-react';

const MeuComponente = () => {
  return (
    <IKContext
      publicKey="public_aefgGxZYG6EbJCM3mnwW7cw/r0g="
      urlEndpoint="https://ik.imagekit.io/1wxfl3468"
      transformationPosition="path"
    >
      <IKImage
        path="/logo.webp"
        transformation={[{
          height: "50",
          width: "120",
          quality: "80",
          format: "webp"
        }]}
        alt="Logo da marca"
        loading="eager"
      />
    </IKContext>
  );
};
```

### 2. Usando URLs diretas (método recomendado)

Para facilitar o uso, você pode usar URLs diretas do ImageKit:

```tsx
// Logo otimizado
const logoUrl = "https://ik.imagekit.io/1wxfl3468/tr:w-120,h-50,q-80,f-webp/logo.webp";

// Imagem de estilo
const styleUrl = "https://ik.imagekit.io/1wxfl3468/tr:w-400,h-300,q-80,f-webp/style-natural.webp";

// Usar em componente
<img src={logoUrl} alt="Logo" />
```

### 3. Transformações Disponíveis

- `w-{width}`: Define largura
- `h-{height}`: Define altura  
- `q-{quality}`: Define qualidade (0-100)
- `f-{format}`: Define formato (webp, jpg, png, auto)
- `c-{crop}`: Define modo de crop (maintain_ratio, at_max, etc.)

## Substituições Realizadas

### QuizIntro.tsx
- ✅ Logo: Cloudinary → ImageKit
- ✅ Hero Image: Cloudinary → ImageKit

### quiz-descubra-seu-estilo.tsx  
- ✅ Todas as imagens de venda: Cloudinary → ImageKit

### styleConfig.ts
- ✅ Já estava configurado com ImageKit

## URLs Atualizadas

### Antes (Cloudinary):
```
https://res.cloudinary.com/dqljyf76t/image/upload/v1744911572/LOGO_DA_MARCA_GISELE_r14oz2.webp
```

### Depois (ImageKit):
```
https://ik.imagekit.io/1wxfl3468/tr:w-120,h-50,q-80,f-webp/logo.webp
```

## Benefícios

1. **Performance**: Carregamento mais rápido das imagens
2. **Otimização automática**: Conversão para WebP quando suportado
3. **CDN global**: Melhor entrega das imagens
4. **Transformações dinâmicas**: Redimensionamento on-the-fly
5. **Economia de largura de banda**: Compressão inteligente

## Próximos Passos

1. Upload das imagens para o ImageKit usando os paths mapeados
2. Teste das páginas para verificar se as imagens carregam corretamente
3. Configurar fallbacks para imagens que não carregarem
4. Implementar lazy loading onde necessário

## Exemplo Completo

Veja o arquivo `client/src/components/examples/ImageKitExample.tsx` para um exemplo completo de implementação.
