import React, { useState, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { DragHandle } from './DragHandle';
import { QuizQuestion } from '@/types/quiz';
import { toast } from '@/components/ui/use-toast';

interface QuizBuilderProps {
  initialQuestions?: QuizQuestion[];
  onSave: (questions: QuizQuestion[]) => void;
  className?: string;
}

const QuizBuilder: React.FC<QuizBuilderProps> = ({
  initialQuestions = [],
  onSave,
  className = ""
}) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>(initialQuestions);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  const addQuestion = useCallback(() => {
    const newQuestion: QuizQuestion = {
      id: `question-${Date.now()}`,
      title: 'Nova Pergunta',
      type: 'text',
      multiSelect: 1,
      options: [
        {
          id: `option-${Date.now()}-1`,
          text: 'Opção 1',
          styleCategory: 'Natural',
          points: 1
        }
      ]
    };
    setQuestions([...questions, newQuestion]);
    setSelectedQuestionIndex(questions.length);
  }, [questions]);

  const updateQuestion = useCallback((index: number, updatedQuestion: QuizQuestion) => {
    const newQuestions = [...questions];
    newQuestions[index] = updatedQuestion;
    setQuestions(newQuestions);
  }, [questions]);

  const deleteQuestion = useCallback((index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
    setSelectedQuestionIndex(null);
  }, [questions]);

  const addOption = useCallback((questionIndex: number) => {
    const newOption = {
      id: `option-${Date.now()}`,
      text: 'Nova Opção',
      styleCategory: 'Natural',
      points: 1
    };
    const newQuestions = [...questions];
    if (newQuestions[questionIndex]) {
      newQuestions[questionIndex].options = [...newQuestions[questionIndex].options, newOption];
      setQuestions(newQuestions);
    }
  }, [questions]);

  const updateOption = useCallback((questionIndex: number, optionIndex: number, updatedOption: any) => {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex] && newQuestions[questionIndex].options[optionIndex]) {
      newQuestions[questionIndex].options[optionIndex] = {
        ...newQuestions[questionIndex].options[optionIndex],
        ...updatedOption
      };
      setQuestions(newQuestions);
    }
  }, [questions]);

  const deleteOption = useCallback((questionIndex: number, optionIndex: number) => {
    const newQuestions = [...questions];
    if (newQuestions[questionIndex]) {
      newQuestions[questionIndex].options.splice(optionIndex, 1);
      setQuestions(newQuestions);
    }
  }, [questions]);

  const moveQuestion = useCallback((dragIndex: number, hoverIndex: number) => {
    const draggedQuestion = questions[dragIndex];
    const newQuestions = [...questions];
    newQuestions.splice(dragIndex, 1);
    newQuestions.splice(hoverIndex, 0, draggedQuestion);
    setQuestions(newQuestions);
    setSelectedQuestionIndex(hoverIndex);
  }, [questions]);

  const handleSave = useCallback(() => {
    try {
      onSave(questions);
      toast({
        title: "Quiz salvo com sucesso",
        description: "As alterações foram salvas com sucesso."
      });
    } catch (error) {
      console.error("Erro ao salvar o quiz:", error);
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar as alterações.",
        variant: "destructive"
      });
    }
  }, [questions, onSave, toast]);

  const calculateStyleScores = (questions: QuizQuestion[]) => {
    const scores: { [key: string]: number } = {};
    
    questions.forEach(question => {
      question.options.forEach(option => {
        if (option.styleCategory) {
          scores[option.styleCategory] = (scores[option.styleCategory] || 0) + (option.points || 1);
        }
      });
    });
    
    return scores;
  };

  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Editor de Quiz</h2>
        <div>
          <Button onClick={handleSave} className="mr-2">Salvar Quiz</Button>
          <Button onClick={togglePreviewMode}>
            {previewMode ? 'Voltar ao Editor' : 'Visualizar Quiz'}
          </Button>
        </div>
      </div>

      {!previewMode ? (
        <DndProvider backend={HTML5Backend}>
          <div className="flex">
            <div className="w-1/2 pr-4">
              <h3 className="text-xl mb-2">Perguntas</h3>
              {questions.map((question, index) => (
                <Card
                  key={question.id}
                  className={`mb-2 p-4 cursor-move ${selectedQuestionIndex === index ? 'bg-gray-100' : ''}`}
                >
                  <div className="flex items-center">
                    <DragHandle onMove={() => moveQuestion(index, index)} />
                    <button
                      className="flex-1 text-left"
                      onClick={() => setSelectedQuestionIndex(index)}
                    >
                      {question.title}
                    </button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteQuestion(index)}
                      className="text-red-500"
                    >
                      Excluir
                    </Button>
                  </div>
                </Card>
              ))}
              <Button onClick={addQuestion}>Adicionar Pergunta</Button>
            </div>

            <div className="w-1/2">
              {selectedQuestionIndex !== null && (
                <>
                  <h3 className="text-xl mb-2">Editar Pergunta</h3>
                  <Card className="p-4">
                    <div className="mb-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Título da Pergunta
                      </label>
                      <Input
                        type="text"
                        value={questions[selectedQuestionIndex].title}
                        onChange={(e) => {
                          const newQuestions = [...questions];
                          newQuestions[selectedQuestionIndex].title = e.target.value;
                          setQuestions(newQuestions);
                        }}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Tipo de Pergunta
                      </label>
                      <Input
                        type="text"
                        value={questions[selectedQuestionIndex].type}
                        onChange={(e) => {
                          const newQuestions = [...questions];
                          newQuestions[selectedQuestionIndex].type = e.target.value;
                          setQuestions(newQuestions);
                        }}
                      />
                    </div>
                    <div className="mb-2">
                      <label className="block text-gray-700 text-sm font-bold mb-2">
                        Multi Select
                      </label>
                      <Input
                        type="number"
                        value={questions[selectedQuestionIndex].multiSelect}
                        onChange={(e) => {
                          const newQuestions = [...questions];
                          newQuestions[selectedQuestionIndex].multiSelect = parseInt(e.target.value);
                          setQuestions(newQuestions);
                        }}
                      />
                    </div>
                    <h4 className="text-lg mt-4 mb-2">Opções</h4>
                    {questions[selectedQuestionIndex].options.map((option, optionIndex) => (
                      <Card key={option.id} className="mb-2 p-4">
                        <div className="mb-2">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Texto da Opção
                          </label>
                          <Textarea
                            value={option.text}
                            onChange={(e) => {
                              updateOption(selectedQuestionIndex, optionIndex, { text: e.target.value });
                            }}
                          />
                        </div>
                        <div className="mb-2">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Style Category
                          </label>
                          <Input
                            type="text"
                            value={option.styleCategory}
                            onChange={(e) => {
                              updateOption(selectedQuestionIndex, optionIndex, { styleCategory: e.target.value });
                            }}
                          />
                        </div>
                        <div className="mb-2">
                          <label className="block text-gray-700 text-sm font-bold mb-2">
                            Points
                          </label>
                          <Input
                            type="number"
                            value={option.points}
                            onChange={(e) => {
                              updateOption(selectedQuestionIndex, optionIndex, { points: parseInt(e.target.value) });
                            }}
                          />
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteOption(selectedQuestionIndex, optionIndex)}
                          className="text-red-500"
                        >
                          Excluir Opção
                        </Button>
                      </Card>
                    ))}
                    <Button onClick={() => addOption(selectedQuestionIndex)}>
                      Adicionar Opção
                    </Button>
                  </Card>
                </>
              )}
            </div>
          </div>
        </DndProvider>
      ) : (
        <div className="p-4">
          <h3 className="text-xl mb-2">Visualização do Quiz</h3>
          {questions.map((question) => (
            <Card key={question.id} className="mb-4 p-4">
              <h4 className="text-lg font-bold">{question.title}</h4>
              <ul>
                {question.options.map((option) => (
                  <li key={option.id}>{option.text}</li>
                ))}
              </ul>
            </Card>
          ))}
          <pre>{JSON.stringify(calculateStyleScores(questions), null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default QuizBuilder;
