import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QuizResultProps {
  resultId?: string;
}

const QuizResult: React.FC<QuizResultProps> = ({ resultId: propResultId }) => {
  const { resultId: paramResultId } = useParams();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const resultId = propResultId || paramResultId;

  useEffect(() => {
    try {
      const savedResult = localStorage.getItem('quizResult');
      if (savedResult) {
        const parsedResult = JSON.parse(savedResult);
        setQuizData(parsedResult);
      }
    } catch (error) {
      console.error('Erro ao carregar resultado:', error);
    }
    setLoading(false);
  }, []);

  const getResultMessage = (resultId: string) => {
    const score = parseInt(resultId.replace('result_', ''));
    
    if (score >= 25) {
      return {
        title: "Alto Potencial de Crescimento!",
        description: "Você tem uma excelente base para expandir seu negócio. Continue focando em estratégias de conversão e fidelização.",
        color: "text-green-600",
        bgColor: "bg-green-50"
      };
    } else if (score >= 15) {
      return {
        title: "Bom Caminho para o Sucesso",
        description: "Você está no caminho certo! Foque em melhorar o engajamento e otimizar seus processos de vendas.",
        color: "text-blue-600", 
        bgColor: "bg-blue-50"
      };
    } else {
      return {
        title: "Grandes Oportunidades pela Frente",
        description: "Há muito potencial para crescimento! Recomendamos focar na atração de clientes e construção de autoridade.",
        color: "text-orange-600",
        bgColor: "bg-orange-50"
      };
    }
  };

  const handleRetakeQuiz = () => {
    localStorage.removeItem('quizResult');
    navigate('/quiz');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!resultId || !quizData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-xl font-semibold mb-4">Resultado não encontrado</h2>
            <p className="text-muted-foreground mb-6">
              Não foi possível encontrar os dados do seu quiz. Que tal fazer o quiz novamente?
            </p>
            <Button onClick={() => navigate('/quiz')}>
              Fazer Quiz Novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const result = getResultMessage(resultId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted p-4">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl font-bold text-primary mb-2">
            Seu Resultado
          </h1>
          <p className="text-muted-foreground">
            Baseado nas suas respostas, aqui está sua análise personalizada
          </p>
        </div>

        <Card className={`${result.bgColor} border-0 shadow-lg mb-8`}>
          <CardHeader>
            <CardTitle className={`text-2xl ${result.color} text-center`}>
              {result.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-center text-foreground">
              {result.description}
            </p>
          </CardContent>
        </Card>

        {quizData.answers && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg">Suas Respostas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {Object.entries(quizData.answers).map(([questionId, option]: [string, any]) => (
                  <div key={questionId} className="border-l-4 border-primary pl-4">
                    <p className="font-medium text-sm text-muted-foreground">
                      {questionId.toUpperCase()}
                    </p>
                    <p className="text-foreground">
                      {option.text}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handleRetakeQuiz}
            variant="outline"
            className="flex-1 sm:flex-none"
          >
            Refazer Quiz
          </Button>
          <Button 
            onClick={handleGoHome}
            className="flex-1 sm:flex-none"
          >
            Voltar ao Início
          </Button>
        </div>

        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p>
            Quiz concluído em {new Date(quizData.completedAt).toLocaleString('pt-BR')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;