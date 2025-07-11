import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BarChart3, FileText, Plus, Settings } from 'lucide-react';
import { QuizQuestion } from './QuizQuestion';
import { QuizQuestion as QuizQuestionType, QuizResponse, StyleResult, StyleType, UserResponse } from '@/types/quiz';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from './ui/use-toast';
import { cn } from '@/lib/utils';
import { StrategicQuestions } from './quiz/StrategicQuestions';

interface QuizPageProps {
  // Define any props if needed
}

const QuizPage: React.FC = () => {
  const [questions, setQuestions] = useState<QuizQuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userResponses, setUserResponses] = useState<UserResponse[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [styleResults, setStyleResults] = useState<StyleResult[]>([]);
  const [user, setUser] = useState<{ userName: string; id: string } | null>(null);
  const [showingStrategicQuestions, setShowingStrategicQuestions] = useState(false);
  const [strategicQuestions, setStrategicQuestions] = useState<QuizQuestionType[]>([]);
  const [currentStrategicQuestionIndex, setCurrentStrategicQuestionIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUser({ userName: storedName, id: 'temp-id' });
    }
  }, []);

  useEffect(() => {
    // Fetch questions from API or any data source
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/quiz/questions');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setQuestions(data);

        // Filter strategic questions
        const strategic = data.filter((q: QuizQuestionType) => q.type === 'strategic');
        setStrategicQuestions(strategic);
      } catch (error) {
        console.error("Could not fetch quiz questions:", error);
        toast({
          title: "Erro ao carregar as questões",
          description: "Por favor, tente novamente mais tarde.",
          variant: "destructive",
        });
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerSubmit = (response: UserResponse) => {
    setUserResponses(prevResponses => {
      const existingResponseIndex = prevResponses.findIndex(r => r.questionId === response.questionId);
      if (existingResponseIndex > -1) {
        const newResponses = [...prevResponses];
        newResponses[existingResponseIndex] = response;
        return newResponses;
      } else {
        return [...prevResponses, response];
      }
    });
    
    // Fixed: Handle null value from localStorage properly
    const storedName = localStorage.getItem('userName');
    const userName = storedName || 'Usuário';
    
    if (showingStrategicQuestions) {
      if (currentStrategicQuestionIndex < strategicQuestions.length - 1) {
        setCurrentStrategicQuestionIndex(prevIndex => prevIndex + 1);
      } else {
        // All strategic questions answered, proceed to calculate results
        const styleResults = getStyleResults([...userResponses, response]);
        setStyleResults(styleResults);
        setQuizCompleted(true);
        
        // Redirect to results page
        router.push('/resultado');
      }
    } else {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      } else {
        // All questions answered, proceed to strategic questions or calculate results
        if (strategicQuestions.length > 0) {
          setShowingStrategicQuestions(true);
        } else {
          const styleResults = getStyleResults([...userResponses, response]);
          setStyleResults(styleResults);
          setQuizCompleted(true);
          
          // Redirect to results page
          router.push('/resultado');
        }
      }
    }
  };

  const getStyleResults = (responses: UserResponse[]): StyleResult[] => {
    const styleCounts: { [key: string]: number } = {};
    let totalResponses = 0;

    responses.forEach(response => {
      const question = questions.find(q => q.id === response.questionId);
      if (question) {
        totalResponses++;
        response.selectedOptions.forEach(optionId => {
          const option = question.options.find(opt => opt.id === optionId);
          if (option && option.category) {
            styleCounts[option.category] = (styleCounts[option.category] || 0) + 1;
          }
        });
      }
    });
    
    return Object.entries(styleCounts)
      .map(([styleKey, count]) => ({
        // Fixed: Convert StyleType to proper category string
        category: styleKey.charAt(0).toUpperCase() + styleKey.slice(1),
        score: count,
        percentage: Math.round((count / totalResponses) * 100),
        style: styleKey as StyleType,
        points: count,
        rank: 0
      }))
      .sort((a, b) => b.score - a.score)
      .map((result, index) => ({ ...result, rank: index + 1 }));
  };

  const currentQuestion = showingStrategicQuestions
    ? strategicQuestions[currentStrategicQuestionIndex]
    : questions[currentQuestionIndex];

  const currentAnswers = userResponses.find(r => r.questionId === currentQuestion?.id)?.selectedOptions || [];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#432818]" style={{ fontFamily: 'Playfair Display, serif' }}>
            Quiz Manager
          </h1>
          <p className="text-[#8F7A6A] mt-2">
            Gerencie e monitore seus quizzes de estilo
          </p>
        </div>
        <Button className="bg-[#B89B7A] hover:bg-[#A0895B] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Novo Quiz
        </Button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#8F7A6A]">
              Total de Respostas
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-[#B89B7A]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#432818]">2,543</div>
            <p className="text-xs text-[#8F7A6A]">
              +12% desde ontem
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#8F7A6A]">
              Taxa de Conclusão
            </CardTitle>
            <FileText className="h-4 w-4 text-[#B89B7A]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#432818]">89.2%</div>
            <p className="text-xs text-[#8F7A6A]">
              +5.1% desde ontem
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#8F7A6A]">
              Tempo Médio
            </CardTitle>
            <Settings className="h-4 w-4 text-[#B89B7A]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#432818]">3:42</div>
            <p className="text-xs text-[#8F7A6A]">
              -0:15 desde ontem
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-[#8F7A6A]">
              Conversões
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-[#B89B7A]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#432818]">156</div>
            <p className="text-xs text-[#8F7A6A]">
              +8% desde ontem
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Quizzes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-[#432818]">Quizzes Ativos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-[#D4C4A0] rounded-lg">
              <div>
                <h3 className="font-semibold text-[#432818]">Quiz de Estilo Predominante</h3>
                <p className="text-sm text-[#8F7A6A]">Descoberta de estilo pessoal</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Ativo</span>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-[#D4C4A0] rounded-lg">
              <div>
                <h3 className="font-semibold text-[#432818]">Quiz de Personalidade Fashion</h3>
                <p className="text-sm text-[#8F7A6A]">Identificação de preferências</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Rascunho</span>
                <Button variant="outline" size="sm">
                  Editar
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuizPage;
