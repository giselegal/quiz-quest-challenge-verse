import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Trophy, 
  Crown, 
  Star, 
  Award, 
  Heart, 
  Sparkles,
  Plus,
  Trash2,
  Copy,
  Eye,
  Edit
} from 'lucide-react';

interface QuizResult {
  id: string;
  title: string;
  description: string;
  image?: string;
  characteristics?: string[];
  color?: string;
  icon?: string;
}

interface ResultsLibraryProps {
  onResultSelect?: (result: QuizResult) => void;
  className?: string;
}

const ResultsLibrary: React.FC<ResultsLibraryProps> = ({
  onResultSelect,
  className = ''
}) => {
  const [results, setResults] = useState<QuizResult[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingResult, setEditingResult] = useState<QuizResult | null>(null);

  // Templates de resultados pré-definidos
  const templates = [
    {
      id: 'elegante',
      title: 'Estilo Elegante',
      description: 'Seu estilo reflete sofisticação e refinamento em cada detalhe.',
      characteristics: [
        'Peças estruturadas e bem cortadas',
        'Cores neutras e sóbrias',
        'Acessórios refinados',
        'Tecidos nobres e de qualidade'
      ],
      color: '#B89B7A',
      icon: 'crown',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911574/ELEGANTE_PREDOMINANTE_awmgit.webp'
    },
    {
      id: 'natural',
      title: 'Estilo Natural',
      description: 'Você valoriza o conforto e a autenticidade acima de tudo.',
      characteristics: [
        'Conforto em primeiro lugar',
        'Tecidos naturais e respiráveis',
        'Cores terrosas e suaves',
        'Silhuetas relaxadas'
      ],
      color: '#8FA389',
      icon: 'star',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911575/NATURAL_PREDOMINANTE_baqkts.webp'
    },
    {
      id: 'contemporaneo',
      title: 'Estilo Contemporâneo',
      description: 'Você está sempre em sintonia com as tendências atuais.',
      characteristics: [
        'Tendências da moda atual',
        'Mix de texturas modernas',
        'Cores em alta',
        'Peças statement'
      ],
      color: '#AA6B5D',
      icon: 'award',
      image: 'https://res.cloudinary.com/dqljyf76t/image/upload/v1744911573/CONTEMPORANEO_PREDOMINANTE_xllhxm.webp'
    }
  ];

  // Carregar resultados salvos
  useEffect(() => {
    const loadResults = () => {
      try {
        const savedResults = localStorage.getItem('quiz-results-library');
        if (savedResults) {
          setResults(JSON.parse(savedResults));
        } else {
          // Usar templates como base inicial
          setResults(templates);
          localStorage.setItem('quiz-results-library', JSON.stringify(templates));
        }
      } catch (error) {
        console.error('Erro ao carregar resultados:', error);
        setResults(templates);
      }
    };

    loadResults();
  }, []);

  // Salvar resultados
  const saveResults = (newResults: QuizResult[]) => {
    setResults(newResults);
    localStorage.setItem('quiz-results-library', JSON.stringify(newResults));
  };

  // Adicionar novo resultado
  const addResult = () => {
    const newResult: QuizResult = {
      id: `result-${Date.now()}`,
      title: 'Novo Resultado',
      description: 'Descrição do resultado...',
      characteristics: ['Característica 1', 'Característica 2'],
      color: '#6366F1',
      icon: 'trophy'
    };

    setEditingResult(newResult);
    setIsCreating(true);
  };

  // Salvar resultado editado
  const saveResult = (result: QuizResult) => {
    if (isCreating) {
      saveResults([...results, result]);
      setIsCreating(false);
    } else {
      const updatedResults = results.map(r => r.id === result.id ? result : r);
      saveResults(updatedResults);
    }
    setEditingResult(null);
  };

  // Deletar resultado
  const deleteResult = (id: string) => {
    const updatedResults = results.filter(r => r.id !== id);
    saveResults(updatedResults);
  };

  // Duplicar resultado
  const duplicateResult = (result: QuizResult) => {
    const duplicated = {
      ...result,
      id: `result-${Date.now()}`,
      title: `${result.title} (Cópia)`
    };
    saveResults([...results, duplicated]);
  };

  // Ícones disponíveis
  const iconOptions = [
    { key: 'trophy', icon: Trophy, name: 'Troféu' },
    { key: 'crown', icon: Crown, name: 'Coroa' },
    { key: 'star', icon: Star, name: 'Estrela' },
    { key: 'award', icon: Award, name: 'Prêmio' },
    { key: 'heart', icon: Heart, name: 'Coração' },
    { key: 'sparkles', icon: Sparkles, name: 'Brilhos' }
  ];

  const getIcon = (iconKey?: string) => {
    const iconOption = iconOptions.find(opt => opt.key === iconKey);
    return iconOption ? iconOption.icon : Trophy;
  };

  // Formulário de edição
  const renderEditForm = () => {
    if (!editingResult) return null;

    return (
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>
            {isCreating ? 'Criar Novo Resultado' : 'Editar Resultado'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Título</Label>
            <Input
              value={editingResult.title}
              onChange={(e) => setEditingResult({
                ...editingResult,
                title: e.target.value
              })}
              placeholder="Nome do resultado"
            />
          </div>

          <div>
            <Label>Descrição</Label>
            <Textarea
              value={editingResult.description}
              onChange={(e) => setEditingResult({
                ...editingResult,
                description: e.target.value
              })}
              placeholder="Descrição do resultado"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Cor de Destaque</Label>
              <Input
                type="color"
                value={editingResult.color || '#6366F1'}
                onChange={(e) => setEditingResult({
                  ...editingResult,
                  color: e.target.value
                })}
              />
            </div>

            <div>
              <Label>Ícone</Label>
              <div className="flex gap-2 mt-1">
                {iconOptions.map(({ key, icon: IconComponent }) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setEditingResult({
                      ...editingResult,
                      icon: key
                    })}
                    className={`p-2 rounded border ${
                      editingResult.icon === key 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-300'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <Label>URL da Imagem (opcional)</Label>
            <Input
              value={editingResult.image || ''}
              onChange={(e) => setEditingResult({
                ...editingResult,
                image: e.target.value
              })}
              placeholder="https://exemplo.com/imagem.jpg"
            />
          </div>

          <div>
            <Label>Características (uma por linha)</Label>
            <Textarea
              value={editingResult.characteristics?.join('\n') || ''}
              onChange={(e) => {
                const characteristics = e.target.value
                  .split('\n')
                  .filter(c => c.trim());
                setEditingResult({
                  ...editingResult,
                  characteristics
                });
              }}
              placeholder="Característica 1&#10;Característica 2&#10;Característica 3"
              rows={4}
            />
          </div>

          <div className="flex gap-2">
            <Button onClick={() => saveResult(editingResult)}>
              Salvar
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setEditingResult(null);
                setIsCreating(false);
              }}
            >
              Cancelar
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">📚 Biblioteca de Resultados</h2>
          <p className="text-gray-600">
            Gerencie os resultados disponíveis para seus quizzes
          </p>
        </div>
        
        <Button onClick={addResult}>
          <Plus className="w-4 h-4 mr-2" />
          Novo Resultado
        </Button>
      </div>

      {/* Formulário de edição */}
      {renderEditForm()}

      {/* Lista de resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((result) => {
          const IconComponent = getIcon(result.icon);
          
          return (
            <Card key={result.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <IconComponent 
                      className="w-6 h-6" 
                      style={{ color: result.color }} 
                    />
                    <CardTitle className="text-lg">{result.title}</CardTitle>
                  </div>
                  <Badge style={{ backgroundColor: result.color, color: 'white' }}>
                    {result.characteristics?.length || 0} características
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {result.image && (
                  <img 
                    src={result.image}
                    alt={result.title}
                    className="w-full h-32 object-cover rounded-md"
                  />
                )}

                <p className="text-sm text-gray-600 line-clamp-3">
                  {result.description}
                </p>

                {result.characteristics && result.characteristics.length > 0 && (
                  <div>
                    <p className="text-xs font-medium text-gray-700 mb-1">
                      Características:
                    </p>
                    <div className="space-y-1">
                      {result.characteristics.slice(0, 2).map((char, index) => (
                        <div key={index} className="text-xs text-gray-600">
                          • {char}
                        </div>
                      ))}
                      {result.characteristics.length > 2 && (
                        <div className="text-xs text-gray-500">
                          +{result.characteristics.length - 2} mais...
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex gap-1 pt-2">
                  {onResultSelect && (
                    <Button 
                      size="sm" 
                      variant="default"
                      onClick={() => onResultSelect(result)}
                      className="flex-1"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Usar
                    </Button>
                  )}
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => setEditingResult(result)}
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => duplicateResult(result)}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => deleteResult(result.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {results.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg mb-2">Nenhum resultado encontrado</p>
          <p className="text-gray-400 mb-4">Crie seu primeiro resultado para começar</p>
          <Button onClick={addResult} variant="outline">
            <Plus className="w-4 h-4 mr-2" />
            Criar Primeiro Resultado
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResultsLibrary;
