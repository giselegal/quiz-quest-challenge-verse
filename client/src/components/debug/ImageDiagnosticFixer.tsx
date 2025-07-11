import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

// Fixed: Proper interfaces for state
interface ImageAnalysis {
  totalImagesRendered: number;
  totalImagesWithIssues: number;
  totalDownloadedBytes: number;
  estimatedPerformanceImpact: string;
}

interface ImageIssue {
  url: string;
  element: HTMLImageElement;
  issues: string[];
  dimensions: {
    natural: { width: number; height: number };
    display: { width: number; height: number };
  };
}

interface CloudinaryOptimization {
  url: string;
  format: string;
  quality: string;
  width: string;
  height: string;
  transformations: string[];
  suggestions: string[];
}

const ImageDiagnosticFixer: React.FC = () => {
  // Fixed: Proper state typing
  const [analysis, setAnalysis] = useState<ImageAnalysis | null>(null);
  const [issues, setIssues] = useState<ImageIssue[]>([]);
  const [optimization, setOptimization] = useState<CloudinaryOptimization | null>(null);

  const analyzeImages = () => {
    const images = document.querySelectorAll('img');
    const imageData: ImageIssue[] = [];
    let totalBytes = 0;

    images.forEach((img: HTMLImageElement) => {
      let imageSize = 0;
      if (img.src) {
        try {
          const url = new URL(img.src);
          if (url.protocol.startsWith('http')) {
            fetch(img.src, { method: 'HEAD', mode: 'cors' })
              .then(response => {
                if (response.ok) {
                  const contentLength = response.headers.get('content-length');
                  if (contentLength) {
                    imageSize = parseInt(contentLength, 10);
                    totalBytes += imageSize;
                  }
                }
              })
              .catch(error => {
                console.error('Erro ao obter o tamanho da imagem:', error);
              });
          }
        } catch (e) {
          console.warn("Invalid URL", img.src);
        }
      }

      const issueData: ImageIssue = {
        url: img.src,
        element: img,
        issues: [],
        dimensions: {
          natural: { width: img.naturalWidth, height: img.naturalHeight },
          display: { width: img.offsetWidth, height: img.offsetHeight }
        }
      };

      imageData.push(issueData);
    });

    const analysisData: ImageAnalysis = {
      totalImagesRendered: images.length,
      totalImagesWithIssues: imageData.filter(img => img.issues.length > 0).length,
      totalDownloadedBytes: totalBytes,
      estimatedPerformanceImpact: 'Medium'
    };

    setAnalysis(analysisData);
    setIssues(imageData);

    // Create optimization suggestions
    if (imageData.length > 0) {
      const optimizationData: CloudinaryOptimization = {
        url: imageData[0].url,
        format: 'webp',
        quality: 'auto',
        width: 'auto',
        height: 'auto',
        transformations: ['f_auto', 'q_auto'],
        suggestions: ['Use WebP format', 'Enable auto quality', 'Add responsive sizes']
      };
      setOptimization(optimizationData);
    }
  };

  const fixImageElement = (imgElement: HTMLImageElement) => {
    const optimizedUrl = `https://res.cloudinary.com/dqljyf76t/image/fetch/f_auto,q_auto/${imgElement.src}`;
    imgElement.src = optimizedUrl;
  };

  useEffect(() => {
    analyzeImages();
  }, []);

  return (
    <div className="image-diagnostic-fixer p-6">
      <Card>
        <CardContent>
          <Button onClick={analyzeImages}>Analisar Imagens</Button>
          
          {analysis && (
            <div className="analysis-results">
              <p>Total de imagens: {analysis.totalImagesRendered}</p>
              <p>Imagens com problemas: {analysis.totalImagesWithIssues}</p>
              <p>Bytes baixados: {analysis.totalDownloadedBytes}</p>
              <p>Impacto estimado: {analysis.estimatedPerformanceImpact}</p>
            </div>
          )}

          {optimization && (
            <div className="optimization-suggestions">
              <p>Formato: {optimization.format}</p>
              <p>Qualidade: {optimization.quality}</p>
              <p>Largura: {optimization.width}</p>
              <p>Transformações: {optimization.transformations.join(', ')}</p>
              <ul>
                {optimization.suggestions.map((sugestão: string, i: number) => (
                  <li key={i}>{sugestão}</li>
                ))}
              </ul>
            </div>
          )}

          {issues.map((issue, index) => (
            <div key={index} className="issue-item">
              <Button onClick={() => fixImageElement(issue.element)}>
                Corrigir
              </Button>
              <p>URL: {issue.url}</p>
              <div className="issue-details">
                <p>URL original: {issue.url}</p>
                <ul>
                  {issue.issues.map((issue: string, i: number) => (
                    <li key={i}>{issue}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ImageDiagnosticFixer;
