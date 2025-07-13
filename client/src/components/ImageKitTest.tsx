import React from 'react';

/**
 * Componente para testar se todas as imagens Cloudinary estão carregando
 */
const ImageKitTest: React.FC = () => {
  const images = [
    {
      name: 'Logo',
      url: 'https://res.cloudinary.com/der8kogzu/image/upload/LOGO_DA_MARCA_GISELE_l78gin.png',
      alt: 'Logo da marca'
    },
    {
      name: 'Gisele - Pose Acessibilidade',
      url: 'https://res.cloudinary.com/der8kogzu/image/upload/GISELE-GALVÃO-POSE-ACESSIBILIDADE_iyt9rg.jpg',
      alt: 'Gisele Galvão'
    },
    {
      name: 'Mulher Sem Estilo',
      url: 'https://res.cloudinary.com/der8kogzu/image/upload/MULHER_SEM_ESTILO_E_PERDIDA_HH_0TRK1A_hse63r.png',
      alt: 'Mulher sem estilo e perdida'
    },
    {
      name: '8 Estilos Universais',
      url: 'https://res.cloudinary.com/der8kogzu/image/upload/IMAGEM_8_ESTILOS_UNIVERSAIS_Sd9XfgcdH_ievpxw.png',
      alt: '8 Estilos Universais'
    },
    {
      name: 'Mockups Guias',
      url: 'https://res.cloudinary.com/der8kogzu/image/upload/MOCKUPS_IMAGENS_DO_GUIA_DE_ESILOS_xdkpdn.png',
      alt: 'Mockups dos guias de estilo'
    },
    {
      name: 'Bônus 1 - Peças Chave',
      url: 'https://res.cloudinary.com/der8kogzu/image/upload/PEÇAS_-_CHAVE_DO_GUARDA-ROUPA_DE_SUCESSO_-_REVISTA_-_BÔNUS_1_lbv7qe.png',
      alt: 'Bônus peças-chave'
    },
    {
      name: 'Bônus 2 - Visagismo',
      url: 'https://res.cloudinary.com/der8kogzu/image/upload/PEÇAS_-_CHAVE_DO_GUARDA-ROUPA_DE_SUCESSO_-_IMAGENS_CELULAR_-_REVISTA_-_BÔNUS_1_jacoih.png',
      alt: 'Bônus visagismo'
    },
    {
      name: 'Garantia',
      url: 'https://res.cloudinary.com/der8kogzu/image/upload/Cópia_de_01.__Página___-_Produto_de_Entrada_1080_x_1000_px_1_ugzu3n.png',
      alt: 'Garantia do produto'
    },
    // Guias de Estilo
    {
      name: 'Guia Natural',
      url: 'https://res.cloudinary.com/der8kogzu/image/upload/GUIA_NATURAL_dlhcwm.png',
      alt: 'Guia Estilo Natural'
    },
    {
      name: 'Guia Clássico',
      url: 'https://res.cloudinary.com/der8kogzu/image/upload/GUIA_CLÁSSICO_rfpptj.png',
      alt: 'Guia Estilo Clássico'
    },
    {
      name: 'Guia Contemporâneo',
      url: 'https://res.cloudinary.com/der8kogzu/image/upload/GUIA_CONTEMPORÂNEO_hqqqzp.png',
      alt: 'Guia Estilo Contemporâneo'
    },
    {
      name: 'Guia Elegante',
      url: 'https://res.cloudinary.com/der8kogzu/image/upload/GUIA_ELEGANTE_mdozq9.png',
      alt: 'Guia Estilo Elegante'
    },
    // Imagens do Quiz Q1
    {
      name: 'Q1 - Natural',
      url: 'https://res.cloudinary.com/der8kogzu/image/upload/Q1_-_A_xlh5cg.png',
      alt: 'Quiz - Estilo Natural'
    },
    {
      name: 'Q1 - Clássico',
      url: 'https://res.cloudinary.com/der8kogzu/image/upload/Q1_-_B_bm79bg.png',
      alt: 'Quiz - Estilo Clássico'
    },
    {
      name: 'Q1 - Contemporâneo',
      url: 'https://res.cloudinary.com/der8kogzu/image/upload/Q1_-_C_n2at5j.png',
      alt: 'Quiz - Estilo Contemporâneo'
    },
    {
      name: 'Q1 - Elegante',
      url: 'https://res.cloudinary.com/der8kogzu/image/upload/Q1_-_D_psbhs9.png',
      alt: 'Quiz - Estilo Elegante'
    }
  ];

  const handleImageLoad = (imageName: string) => {
    console.log(`✅ ${imageName} carregou com sucesso`);
  };

  const handleImageError = (imageName: string, url: string) => {
    console.error(`❌ ${imageName} falhou ao carregar: ${url}`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Teste Cloudinary - Quiz Quest</h1>
      
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Status do Teste</h2>
        <p className="text-sm text-gray-600">
          Verifique o console do navegador para ver quais imagens carregaram com sucesso (✅) ou falharam (❌).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-sm">
            <h3 className="font-semibold mb-2 text-center">{image.name}</h3>
            
            <div className="relative bg-gray-100 rounded-lg overflow-hidden" style={{ aspectRatio: '4/3' }}>
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
                onLoad={() => handleImageLoad(image.name)}
                onError={() => handleImageError(image.name, image.url)}
                loading="lazy"
              />
            </div>
            
            <div className="mt-2">
              <p className="text-xs text-gray-500 break-all">{image.url}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-4 bg-green-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Como Verificar</h2>
        <ol className="text-sm text-gray-700 space-y-1">
          <li>1. Abra o Console do Navegador (F12 → Console)</li>
          <li>2. Recarregue a página</li>
          <li>3. Verifique as mensagens de sucesso (✅) ou erro (❌)</li>
          <li>4. Imagens que não carregarem aparecerão quebradas</li>
        </ol>
      </div>
    </div>
  );
};

export default ImageKitTest;
