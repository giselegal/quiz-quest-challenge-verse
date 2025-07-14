
import React, { useState, useEffect, useRef } from 'react';
import { QuizQuestion } from '../QuizQuestion';
import { UserResponse } from '@/types/quiz';
import { strategicQuestions } from '@/data/strategicQuestions';
import { AnimatedWrapper } from '../ui/animated-wrapper';
import { preloadCriticalImages, preloadImagesByUrls } from '@/utils/imageManager';
import OptimizedImage from '../ui/OptimizedImage';
import { getAllImages } from '@/data/imageBank'; // Importar para acessar o banco de imagens

// Imagens críticas da página de resultados a serem pré-carregadas
const RESULT_CRITICAL_IMAGES = [
  // URLs das imagens mais importantes da página de resultados - usando novas URLs funcionais
  'https://res.cloudinary.com/der8kogzu/image/upload/v1752430326/MOCKUPS_DE_TODOS_OS_PRODUTOS_-_GUIAS_DE_ESILOS_E_B?NUS_legwsb.png',
  'https://res.cloudinary.com/der8kogzu/image/upload/v1752430348/IMANGES_MULHERES_8_ESTILOS_UNIVERSAIS_blvkgv.png',
  'https://res.cloudinary.com/der8kogzu/image/upload/v1752430327/MULHER_ELEGANTE_COM_GUIA_DE_ESTILO_euxps7.png'
];

interface StrategicQuestionsProps {
  currentQuestionIndex: number;
  answers: string[] | Record<string, string[]>;
  onAnswer: (response: UserResponse) => void;
}

export const StrategicQuestions: React.FC<StrategicQuestionsProps> = ({
  currentQuestionIndex,
  answers,
  onAnswer
}) => {
  const [mountKey, setMountKey] = useState(Date.now());
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const resultImagesPreloadStarted = useRef<boolean>(false);
  
  useEffect(() => {
    if (!imagesPreloaded) {
      // Preload da questão estratégica atual
      preloadCriticalImages(["strategic"]);
      setImagesPreloaded(true);
    }
    
    // Pré-carregamento progressivo das imagens de resultado
    // baseado no índice da questão estratégica atual
    if (!resultImagesPreloadStarted.current) {
      resultImagesPreloadStarted.current = true;
      
      // Agenda o pré-carregamento para começar após um pequeno delay
      // para não competir com os recursos da questão atual
      setTimeout(() => {
        console.log(`[Otimização] Iniciando pré-carregamento progressivo de imagens de resultado`);
        
        // Inicia o preload da categoria principal de resultado
        preloadCriticalImages(['results']);
      }, 500); // Pequeno delay para não competir com recursos iniciais
    }
  }, [imagesPreloaded]);
  
  // Quando o índice da questão estratégica mudar, carregar mais imagens
  // de resultado em segundo plano, priorizando diferentes categorias
  useEffect(() => {
    // Remonta componente quando a questão muda para garantir estado limpo
    setMountKey(Date.now());
    
    // Carrega diferentes conjuntos de imagens com base no progresso
    if (currentQuestionIndex === 1) {
      // Na segunda questão estratégica, carrega transformações
      preloadCriticalImages(['transformation']);
    } else if (currentQuestionIndex === 2) {
      // Na terceira questão, carrega bônus
      preloadCriticalImages(['bonus']);
    } else if (currentQuestionIndex >= 3) {
      // Em questões posteriores, carrega depoimentos
      preloadCriticalImages(['testimonials']);
      
      // Carrega imagens explícitas de alta prioridade
      preloadImagesByUrls(RESULT_CRITICAL_IMAGES);
    }
  }, [currentQuestionIndex]);

  if (currentQuestionIndex >= strategicQuestions.length) return null;

  return (
    <AnimatedWrapper key={mountKey} show={true}>
      <QuizQuestion
        question={strategicQuestions[currentQuestionIndex]}
        onAnswer={onAnswer}
        currentAnswers={Array.isArray(answers) ? answers : (answers[strategicQuestions[currentQuestionIndex].id] || [])}
        autoAdvance={false}
        showQuestionImage={true}
        isStrategicQuestion={true}
      />
    </AnimatedWrapper>
  );
};

export default StrategicQuestions;
