/**
 * Critical Page Route Mapping
 * Fixes the disconnection between editor steps and actual production pages
 */

// Map editor step numbers to actual route pages
export const STEP_TO_ROUTE_MAPPING = {
  // Steps 1-18: Quiz flow on /quiz route
  1: { route: '/quiz', component: 'QuizIntro', description: 'Quiz Introduction' },
  2: { route: '/quiz', component: 'QuizContent', description: 'Question 1' },
  3: { route: '/quiz', component: 'QuizContent', description: 'Question 2' },
  4: { route: '/quiz', component: 'QuizContent', description: 'Question 3' },
  5: { route: '/quiz', component: 'QuizContent', description: 'Question 4' },
  6: { route: '/quiz', component: 'QuizContent', description: 'Question 5' },
  7: { route: '/quiz', component: 'QuizContent', description: 'Question 6' },
  8: { route: '/quiz', component: 'QuizContent', description: 'Question 7' },
  9: { route: '/quiz', component: 'QuizContent', description: 'Question 8' },
  10: { route: '/quiz', component: 'QuizContent', description: 'Question 9' },
  11: { route: '/quiz', component: 'QuizContent', description: 'Question 10' },
  12: { route: '/quiz', component: 'MainTransition', description: 'Main Transition' },
  13: { route: '/quiz', component: 'QuizTransition', description: 'Strategic Question 1' },
  14: { route: '/quiz', component: 'QuizTransition', description: 'Strategic Question 2' },
  15: { route: '/quiz', component: 'QuizTransition', description: 'Strategic Question 3' },
  16: { route: '/quiz', component: 'QuizTransition', description: 'Strategic Question 4' },
  17: { route: '/quiz', component: 'QuizTransition', description: 'Strategic Question 5' },
  18: { route: '/quiz', component: 'QuizTransition', description: 'Strategic Question 6' },
  19: { route: '/quiz', component: 'LoadingManager', description: 'Final Loading' },
  
  // Step 20: Result Page - CORRESPONDS TO /resultado
  20: { 
    route: '/resultado', 
    component: 'ResultPage', 
    description: 'Result Page (Test A)',
    pageFile: 'client/src/pages/ResultPage.tsx',
    isResultPage: true
  },
  
  // Step 21: Quiz Discover Style - CORRESPONDS TO /quiz-descubra-seu-estilo
  21: { 
    route: '/quiz-descubra-seu-estilo', 
    component: 'QuizDescubraSeuEstilo', 
    description: 'Quiz Discover Style (Test B)',
    pageFile: 'client/src/pages/quiz-descubra-seu-estilo.tsx',
    isOfferPage: true
  }
};

// Route to steps mapping (reverse lookup)
export const ROUTE_TO_STEPS_MAPPING = {
  '/quiz': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
  '/resultado': [20],
  '/quiz-descubra-seu-estilo': [21]
};

// Get step configuration by step number
export const getStepByNumber = (stepNumber: number) => {
  return STEP_TO_ROUTE_MAPPING[stepNumber as keyof typeof STEP_TO_ROUTE_MAPPING];
};

// Get all steps for a specific route
export const getStepsByRoute = (route: string) => {
  return ROUTE_TO_STEPS_MAPPING[route as keyof typeof ROUTE_TO_STEPS_MAPPING] || [];
};

// Check if step is a result page
export const isResultPageStep = (stepNumber: number): boolean => {
  const step = getStepByNumber(stepNumber);
  return step?.isResultPage === true;
};

// Check if step is an offer page
export const isOfferPageStep = (stepNumber: number): boolean => {
  const step = getStepByNumber(stepNumber);
  return step?.isOfferPage === true;
};

// Get the production page file for a step
export const getPageFileByStep = (stepNumber: number): string | undefined => {
  const step = getStepByNumber(stepNumber);
  return step?.pageFile;
};

// Validate step configuration
export const validateStepConfiguration = () => {
  const totalSteps = Object.keys(STEP_TO_ROUTE_MAPPING).length;
  console.log(`✅ Step mapping configured for ${totalSteps} steps`);
  
  // Check critical steps
  const resultStep = getStepByNumber(20);
  const offerStep = getStepByNumber(21);
  
  console.log('📊 Critical Step Configuration:');
  console.log(`  Step 20 (Result): ${resultStep?.route} → ${resultStep?.component}`);
  console.log(`  Step 21 (Offer): ${offerStep?.route} → ${offerStep?.component}`);
  
  return {
    totalSteps,
    resultStepCorrect: resultStep?.route === '/resultado',
    offerStepCorrect: offerStep?.route === '/quiz-descubra-seu-estilo'
  };
};