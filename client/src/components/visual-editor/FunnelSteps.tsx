import React from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface FunnelStepsProps {
  setCurrentFunnel: (fn: (prev: any) => any) => void;
}

export const FunnelSteps: React.FC<FunnelStepsProps> = ({ setCurrentFunnel }) => {
  return (
    <div className="space-y-1">
      {/* Página Inicial */}
      <Button
        variant="outline"
        size="sm"
        className="w-full justify-start h-8 text-xs"
        onClick={() => {
          const introPage = {
            id: "intro-page",
            title: "Página Inicial",
            type: "intro" as const,
            progress: 0,
            showHeader: true,
            showProgress: true,
            components: [
              {
                id: "intro-title",
                type: "title" as const,
                data: {
                  text: "Teste de Estilo Pessoal",
                  fontSize: "2rem",
                  color: "#432818"
                },
                style: {
                  textAlign: "center" as const,
                  marginBottom: "2rem"
                }
              },
              {
                id: "intro-input",
                type: "input" as const,
                data: {
                  label: "NOME *",
                  placeholder: "Digite seu nome aqui..",
                  required: true,
                  type: "text"
                },
                style: {
                  width: "100%",
                  marginBottom: "1rem"
                }
              },
              {
                id: "intro-button",
                type: "button" as const,
                data: {
                  text: "Continuar",
                  variant: "primary"
                },
                style: {
                  width: "100%",
                  backgroundColor: "#432818",
                  color: "white"
                }
              }
            ]
          };
          setCurrentFunnel(prev => ({ ...prev, pages: [...prev.pages, introPage] }));
          toast({ title: "Página inicial adicionada", description: "Estrutura básica criada" });
        }}
      >
        Página Inicial
      </Button>

      {/* Questões do Quiz */}
      <Button
        variant="outline"
        size="sm"
        className="w-full justify-start h-8 text-xs"
        onClick={() => {
          const questionPage = {
            id: "quiz-question",
            title: "Questão do Quiz",
            type: "question" as const,
            progress: 50,
            showHeader: true,
            showProgress: true,
            components: [
              {
                id: "question-title",
                type: "title" as const,
                data: {
                  text: "QUAL O SEU TIPO DE ROUPA FAVORITA?",
                  fontSize: "1.8rem",
                  color: "#432818"
                },
                style: {
                  textAlign: "center" as const,
                  marginBottom: "2rem"
                }
              },
              {
                id: "question-subtitle",
                type: "subtitle" as const,
                data: {
                  text: "Escolha até 3 opções que mais combinam com você",
                  fontSize: "1rem",
                  color: "#8F7A6A"
                },
                style: {
                  textAlign: "center" as const,
                  marginBottom: "2rem"
                }
              }
            ]
          };
          setCurrentFunnel(prev => ({ ...prev, pages: [...prev.pages, questionPage] }));
          toast({ title: "Questão adicionada", description: "Página de questão criada" });
        }}
      >
        Questões do Quiz
      </Button>

      {/* Tela de Carregamento */}
      <Button
        variant="outline"
        size="sm"
        className="w-full justify-start h-8 text-xs"
        onClick={() => {
          const loadingPage = {
            id: "loading-page",
            title: "Carregamento",
            type: "loading" as const,
            progress: 95,
            showHeader: true,
            showProgress: true,
            components: [
              {
                id: "loading-title",
                type: "title" as const,
                data: {
                  text: "Descobrindo seu estilo...",
                  fontSize: "2rem",
                  color: "#432818"
                },
                style: {
                  textAlign: "center" as const,
                  marginBottom: "2rem"
                }
              },
              {
                id: "loading-text",
                type: "text" as const,
                data: {
                  text: "Analisando suas respostas",
                  fontSize: "1.2rem",
                  color: "#8F7A6A"
                },
                style: {
                  textAlign: "center" as const
                }
              }
            ]
          };
          setCurrentFunnel(prev => ({ ...prev, pages: [...prev.pages, loadingPage] }));
          toast({ title: "Carregamento adicionado", description: "Tela de loading criada" });
        }}
      >
        Tela de Carregamento
      </Button>

      {/* Página de Resultado */}
      <Button
        variant="outline"
        size="sm"
        className="w-full justify-start h-8 text-xs"
        onClick={() => {
          const resultPage = {
            id: "result-page",
            title: "Resultado",
            type: "result" as const,
            progress: 100,
            showHeader: true,
            showProgress: false,
            components: [
              {
                id: "result-title",
                type: "title" as const,
                data: {
                  text: "Seu Estilo é: Clássico!",
                  fontSize: "2.5rem",
                  color: "#432818"
                },
                style: {
                  textAlign: "center" as const,
                  marginBottom: "2rem"
                }
              },
              {
                id: "result-description",
                type: "text" as const,
                data: {
                  text: "Você tem um estilo clássico e elegante.",
                  fontSize: "1.1rem",
                  color: "#666"
                },
                style: {
                  textAlign: "center" as const,
                  marginBottom: "2rem"
                }
              }
            ]
          };
          setCurrentFunnel(prev => ({ ...prev, pages: [...prev.pages, resultPage] }));
          toast({ title: "Resultado adicionado", description: "Página de resultado criada" });
        }}
      >
        Página de Resultado
      </Button>

      {/* Página de Oferta */}
      <Button
        variant="outline"
        size="sm"
        className="w-full justify-start h-8 text-xs"
        onClick={() => {
          const offerPage = {
            id: "offer-page",
            title: "Oferta",
            type: "offer" as const,
            progress: 100,
            showHeader: false,
            showProgress: false,
            components: [
              {
                id: "offer-title",
                type: "title" as const,
                data: {
                  text: "Transforme Seu Estilo!",
                  fontSize: "2.5rem",
                  color: "#432818"
                },
                style: {
                  textAlign: "center" as const,
                  marginBottom: "2rem"
                }
              },
              {
                id: "offer-button",
                type: "button" as const,
                data: {
                  text: "QUERO TRANSFORMAR MEU ESTILO AGORA!",
                  variant: "primary"
                },
                style: {
                  width: "100%",
                  backgroundColor: "#D4AF37",
                  color: "white",
                  padding: "1.5rem 2rem",
                  fontSize: "1.2rem"
                }
              }
            ]
          };
          setCurrentFunnel(prev => ({ ...prev, pages: [...prev.pages, offerPage] }));
          toast({ title: "Oferta adicionada", description: "Página de oferta criada" });
        }}
      >
        Página de Oferta
      </Button>
    </div>
  );
};