import React from 'react';

/**
 * Componente para testar se todas as imagens ImageKit estão carregando
 */
const ImageKitTest: React.FC = () => {
  const images = [
    {
      name: 'Logo',
      url: 'https://ik.imagekit.io/1wxfl3468/tr:w-120,h-50,q-80,f-webp/Estilos%20Universais%20Quiz/LOGO%20DA%20MARCA%20GISELE.png',
      alt: 'Logo da marca'
    },
    {
      name: 'Gisele - Pose Acessibilidade',
      url: 'https://ik.imagekit.io/1wxfl3468/tr:w-400,h-500,q-85,f-webp/Estilos%20Universais%20Quiz/GISELE-GALV%C3%83O-POSE-ACESSIBILIDADE.jpg',
      alt: 'Gisele Galvão'
    },
    {
      name: 'Mulher Sem Estilo',
      url: 'https://ik.imagekit.io/1wxfl3468/tr:w-500,h-350,q-80,f-webp/Estilos%20Universais%20Quiz/MULHER%20SEM%20ESTILO%20E%20PERDIDA_HH_0TRK1A',
      alt: 'Mulher sem estilo e perdida'
    },
    {
      name: '8 Estilos Universais',
      url: 'https://ik.imagekit.io/1wxfl3468/tr:w-500,h-350,q-80,f-webp/Estilos%20Universais%20Quiz/IMAGEM%208%20ESTILOS%20UNIVERSAIS_Sd9XfgcdH',
      alt: '8 Estilos Universais'
    },
    {
      name: 'Mockups Guias',
      url: 'https://ik.imagekit.io/1wxfl3468/tr:w-500,h-350,q-80,f-webp/Estilos%20Universais%20Quiz/MOCKUPS%20IMAGENS%20DO%20GUIA%20DE%20ESILOS',
      alt: 'Mockups dos guias de estilo'
    },
    {
      name: 'Bônus 1 - Peças Chave',
      url: 'https://ik.imagekit.io/1wxfl3468/tr:w-400,h-300,q-80,f-webp/Estilos%20Universais%20Quiz/PE%C3%87AS%20-%20CHAVE%20DO%20GUARDA-ROUPA%20DE%20SUCESSO%20-%20REVISTA%20-%20%20B%C3%94NUS%201',
      alt: 'Bônus peças-chave'
    },
    {
      name: 'Bônus 2 - Visagismo',
      url: 'https://ik.imagekit.io/1wxfl3468/tr:w-400,h-300,q-80,f-webp/Estilos%20Universais%20Quiz/PE%C3%87AS%20-%20CHAVE%20DO%20GUARDA-ROUPA%20DE%20SUCESSO%20-%20IMAGENS%20CELULAR%20-%20GUIA%20VISAGISMO%20-%20B%C3%94NUS%201',
      alt: 'Bônus visagismo'
    },
    {
      name: 'Garantia',
      url: 'https://ik.imagekit.io/1wxfl3468/tr:w-300,h-200,q-80,f-webp/Estilos%20Universais%20Quiz/C%C3%B3pia%20de%2001.%20_P%C3%A1gina$$_%20-%20Produto%20de%20Entrada%20%20(1080%20x%201000%20px)%20(1).png',
      alt: 'Garantia do produto'
    },
    // Guias de Estilo
    {
      name: 'Guia Natural',
      url: 'https://ik.imagekit.io/1wxfl3468/tr:w-300,h-400,q-80,f-webp/Estilos%20Universais%20Quiz/GUIA%20NATURAL.png',
      alt: 'Guia Estilo Natural'
    },
    {
      name: 'Guia Clássico',
      url: 'https://ik.imagekit.io/1wxfl3468/tr:w-300,h-400,q-80,f-webp/Estilos%20Universais%20Quiz/GUIA%20CL%C3%81SSICO.png',
      alt: 'Guia Estilo Clássico'
    },
    {
      name: 'Guia Contemporâneo',
      url: 'https://ik.imagekit.io/1wxfl3468/tr:w-300,h-400,q-80,f-webp/Estilos%20Universais%20Quiz/GUIA%20CONTEMPOR%C3%82NEO.png',
      alt: 'Guia Estilo Contemporâneo'
    },
    {
      name: 'Guia Elegante',
      url: 'https://ik.imagekit.io/1wxfl3468/tr:w-300,h-400,q-80,f-webp/Estilos%20Universais%20Quiz/GUIA%20ELEGANTE.png',
      alt: 'Guia Estilo Elegante'
    },
    // Imagens do Quiz Q1
    {
      name: 'Q1 - Natural',
      url: 'https://ik.imagekit.io/1wxfl3468/tr:w-200,h-150,q-80,f-webp/Estilos%20Universais%20Quiz/Q1%20-%20A).png',
      alt: 'Quiz - Estilo Natural'
    },
    {
      name: 'Q1 - Clássico',
      url: 'https://ik.imagekit.io/1wxfl3468/tr:w-200,h-150,q-80,f-webp/Estilos%20Universais%20Quiz/Q1%20-%20B).png',
      alt: 'Quiz - Estilo Clássico'
    },
    {
      name: 'Q1 - Contemporâneo',
      url: 'https://ik.imagekit.io/1wxfl3468/tr:w-200,h-150,q-80,f-webp/Estilos%20Universais%20Quiz/Q1%20-%20C).png',
      alt: 'Quiz - Estilo Contemporâneo'
    },
    {
      name: 'Q1 - Elegante',
      url: 'https://ik.imagekit.io/1wxfl3468/tr:w-200,h-150,q-80,f-webp/Estilos%20Universais%20Quiz/Q1%20-%20D).png',
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
      <h1 className="text-3xl font-bold mb-6 text-center">Teste ImageKit - Quiz Quest</h1>
      
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
