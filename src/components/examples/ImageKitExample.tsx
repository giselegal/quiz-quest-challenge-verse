import React from 'react';
import { IKImage, IKContext } from 'imagekitio-react';

/**
 * Exemplo de como usar o ImageKit corretamente
 */
const ImageKitExample: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Exemplo de ImageKit</h2>
      
      {/* Context ImageKit configurado */}
      <IKContext
        publicKey="public_aefgGxZYG6EbJCM3mnwW7cw/r0g="
        urlEndpoint="https://ik.imagekit.io/1wxfl3468"
        transformationPosition="path"
        authenticationEndpoint="http://www.yourserver.com/auth"
      >
        {/* Logo com transformações */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Logo</h3>
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
        </div>

        {/* Imagem hero */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Imagem Hero</h3>
          <IKImage
            path="/hero-image.jpg"
            transformation={[{
              height: "400",
              width: "600",
              quality: "85",
              format: "webp"
            }]}
            alt="Imagem principal"
            loading="lazy"
          />
        </div>

        {/* Estilos */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Estilos</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { path: '/style-natural.webp', alt: 'Estilo Natural' },
              { path: '/style-classic.webp', alt: 'Estilo Clássico' },
              { path: '/style-contemporary.webp', alt: 'Estilo Contemporâneo' },
              { path: '/style-elegant.webp', alt: 'Estilo Elegante' },
            ].map((style, index) => (
              <IKImage
                key={index}
                path={style.path}
                transformation={[{
                  height: "200",
                  width: "200",
                  quality: "80",
                  format: "webp"
                }]}
                alt={style.alt}
                loading="lazy"
                className="rounded-lg"
              />
            ))}
          </div>
        </div>

        {/* Imagens das páginas */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2">Imagens das Páginas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { path: '/problem-image.webp', alt: 'Imagem do Problema' },
              { path: '/solution-quiz-image.webp', alt: 'Imagem da Solução' },
              { path: '/guides-benefits-image.webp', alt: 'Imagem dos Benefícios' },
            ].map((image, index) => (
              <IKImage
                key={index}
                path={image.path}
                transformation={[{
                  height: "250",
                  width: "350",
                  quality: "80",
                  format: "webp"
                }]}
                alt={image.alt}
                loading="lazy"
                className="rounded-lg"
              />
            ))}
          </div>
        </div>
      </IKContext>
    </div>
  );
};

export default ImageKitExample;
