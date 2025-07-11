
import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Trash2, Plus } from 'lucide-react';
import { QuizQuestion, QuizOption } from '@/types/quiz';

interface QuizBuilderProps {
  onSave: (questions: QuizQuestion[]) => void;
}

const QuizBuilder: React.FC<QuizBuilderProps> = ({ onSave }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    if (questions.length === 0) {
      addQuestion();
    }
  }, []);

  const addQuestion = () => {
    const newQuestion: QuizQuestion = {
      id: `question-${Date.now()}`,
      text: '',
      type: 'multiple',
      options: []
    };
    setQuestions([...questions, newQuestion]);
  };

  const addOption = (questionIndex: number) => {
    const newOption: QuizOption = {
      id: `option-${Date.now()}`,
      text: '',
      points: { Natural: 0, Classico: 0, Criativo: 0, Sexy: 0 }
    };
    
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push(newOption);
    setQuestions(updatedQuestions);
  };

  const updateQuestion = (index: number, field: keyof QuizQuestion, value: any) => {
    const updatedQuestions = [...questions];
    (updatedQuestions[index] as any)[field] = value;
    setQuestions(updatedQuestions);
  };

  const updateOption = (questionIndex: number, optionIndex: number, field: keyof QuizOption, value: any) => {
    const updatedQuestions = [...questions];
    (updatedQuestions[questionIndex].options[optionIndex] as any)[field] = value;
    setQuestions(updatedQuestions);
  };

  const deleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const deleteOption = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options = updatedQuestions[questionIndex].options.filter((_, i) => i !== optionIndex);
    setQuestions(updatedQuestions);
  };

  const calculateTotalScore = () => {
    return questions.reduce((total, question) => {
      return total + question.options.reduce((questionTotal, option) => {
        if (typeof option.points === 'object') {
          return questionTotal + Object.values(option.points).reduce((sum: number, points: number) => sum + points, 0);
        }
        return questionTotal;
      }, 0);
    }, 0);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Quiz Builder</h2>
        <div className="space-x-2">
          <Button onClick={addQuestion}>
            <Plus className="w-4 h-4 mr-2" />
            Add Question
          </Button>
          <Button onClick={() => onSave(questions)} className="bg-green-600">
            Save Quiz
          </Button>
        </div>
      </div>

      {questions.map((question, questionIndex) => (
        <Card key={question.id} className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold">Question {questionIndex + 1}</h3>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => deleteQuestion(questionIndex)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Question Text</label>
                <Textarea
                  value={question.text}
                  onChange={(e) => updateQuestion(questionIndex, 'text', e.target.value)}
                  placeholder="Enter your question"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Question Type</label>
                <Select
                  value={question.type}
                  onValueChange={(value: 'single' | 'multiple' | 'strategic' | 'text' | 'image' | 'both') => 
                    updateQuestion(questionIndex, 'type', value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single Choice</SelectItem>
                    <SelectItem value="multiple">Multiple Choice</SelectItem>
                    <SelectItem value="strategic">Strategic</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="both">Both</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Options</h4>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => addOption(questionIndex)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Option
                </Button>
              </div>

              {question.options.map((option, optionIndex) => (
                <div key={option.id} className="border p-4 rounded space-y-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1 space-y-3">
                      <Input
                        value={option.text}
                        onChange={(e) => updateOption(questionIndex, optionIndex, 'text', e.target.value)}
                        placeholder="Option text"
                      />
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {['Natural', 'Classico', 'Criativo', 'Sexy'].map((style) => (
                          <div key={style}>
                            <label className="block text-xs font-medium mb-1">{style}</label>
                            <Input
                              type="number"
                              value={typeof option.points === 'object' ? option.points[style] || 0 : 0}
                              onChange={(e) => {
                                const currentPoints = typeof option.points === 'object' ? option.points : {};
                                updateOption(questionIndex, optionIndex, 'points', {
                                  ...currentPoints,
                                  [style]: parseInt(e.target.value) || 0
                                });
                              }}
                              placeholder="0"
                              className="text-center"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteOption(questionIndex, optionIndex)}
                      className="ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      ))}

      <div className="text-sm text-gray-600">
        Total Questions: {questions.length} | Total Score: {calculateTotalScore()}
      </div>
    </div>
  );
};

export default QuizBuilder;
