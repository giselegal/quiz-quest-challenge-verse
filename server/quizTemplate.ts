// Function to generate quiz HTML
function generateQuizHtml(funnel: any, quizConfig: any) {
  return `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${quizConfig.intro?.title || funnel.name}</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: linear-gradient(135deg, #b89b7a 0%, #d4c4a0 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        
        .quiz-container {
          background: white;
          border-radius: 16px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
          padding: 40px;
          max-width: 600px;
          width: 100%;
          text-align: center;
        }
        
        .quiz-intro {
          margin-bottom: 30px;
        }
        
        .quiz-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #432818;
          margin-bottom: 10px;
          font-family: 'Playfair Display', serif;
        }
        
        .quiz-subtitle {
          font-size: 1.25rem;
          color: #b89b7a;
          margin-bottom: 15px;
        }
        
        .quiz-description {
          font-size: 1.1rem;
          color: #6b4f43;
          line-height: 1.6;
          margin-bottom: 30px;
        }
        
        .quiz-question {
          display: none;
          margin-bottom: 30px;
        }
        
        .quiz-question.active {
          display: block;
        }
        
        .question-text {
          font-size: 1.5rem;
          font-weight: 600;
          color: #432818;
          margin-bottom: 25px;
        }
        
        .quiz-options {
          display: grid;
          gap: 15px;
          margin-bottom: 30px;
        }
        
        .quiz-option {
          background: #f8f9fa;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-size: 1.1rem;
          color: #432818;
        }
        
        .quiz-option:hover {
          border-color: #b89b7a;
          background: #fefefe;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(184, 155, 122, 0.15);
        }
        
        .quiz-option.selected {
          border-color: #b89b7a;
          background: #b89b7a;
          color: white;
        }
        
        .quiz-btn {
          background: #b89b7a;
          color: white;
          border: none;
          padding: 15px 40px;
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin: 10px;
        }
        
        .quiz-btn:hover {
          background: #a0855e;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(184, 155, 122, 0.3);
        }
        
        .quiz-btn:disabled {
          background: #ccc;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }
        
        .quiz-result {
          display: none;
          text-align: center;
        }
        
        .quiz-result.active {
          display: block;
        }
        
        .result-image {
          width: 300px;
          height: 200px;
          border-radius: 12px;
          margin: 20px auto;
          display: block;
        }
        
        .result-title {
          font-size: 2rem;
          font-weight: 700;
          color: #432818;
          margin-bottom: 15px;
        }
        
        .result-description {
          font-size: 1.1rem;
          color: #6b4f43;
          line-height: 1.6;
          margin-bottom: 30px;
        }
        
        .progress-bar {
          width: 100%;
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          margin-bottom: 30px;
          overflow: hidden;
        }
        
        .progress-fill {
          height: 100%;
          background: #b89b7a;
          border-radius: 4px;
          transition: width 0.3s ease;
          width: 0%;
        }
        
        @media (max-width: 768px) {
          .quiz-container {
            padding: 30px 20px;
          }
          
          .quiz-title {
            font-size: 2rem;
          }
          
          .question-text {
            font-size: 1.25rem;
          }
        }
      </style>
    </head>
    <body>
      <div class="quiz-container">
        <!-- Intro Screen -->
        <div id="quiz-intro" class="quiz-intro">
          <h1 class="quiz-title">${quizConfig.intro?.title || 'Quiz'}</h1>
          <h2 class="quiz-subtitle">${quizConfig.intro?.subtitle || ''}</h2>
          <p class="quiz-description">${quizConfig.intro?.description || ''}</p>
          <button class="quiz-btn" onclick="startQuiz()">${quizConfig.intro?.buttonText || 'Começar'}</button>
        </div>
        
        <!-- Progress Bar -->
        <div id="progress-container" style="display: none;">
          <div class="progress-bar">
            <div class="progress-fill" id="progress-fill"></div>
          </div>
        </div>
        
        <!-- Questions -->
        ${quizConfig.questions?.map((question: any, index: number) => `
          <div id="question-${index}" class="quiz-question">
            <h3 class="question-text">${question.text}</h3>
            <div class="quiz-options">
              ${question.options?.map((option: any) => `
                <div class="quiz-option" onclick="selectOption(${index}, '${option.id}', ${JSON.stringify(option.points || {}).replace(/"/g, '&quot;')})">
                  ${option.text}
                </div>
              `).join('') || ''}
            </div>
            <button class="quiz-btn" onclick="nextQuestion()" id="next-btn-${index}" disabled>Próxima</button>
          </div>
        `).join('') || ''}
        
        <!-- Results -->
        ${quizConfig.results?.map((result: any) => `
          <div id="result-${result.id}" class="quiz-result">
            <h2 class="result-title">${result.title}</h2>
            ${result.imageUrl ? `<img src="${result.imageUrl}" alt="${result.title}" class="result-image">` : ''}
            <p class="result-description">${result.description}</p>
            <button class="quiz-btn" onclick="restartQuiz()">Fazer Novamente</button>
          </div>
        `).join('') || ''}
      </div>
      
      <script>
        const quizData = ${JSON.stringify(quizConfig)};
        let currentQuestion = 0;
        let answers = {};
        let scores = {};
        
        // Initialize scores
        if (quizData.results) {
          quizData.results.forEach(result => {
            scores[result.id] = 0;
          });
        }
        
        function startQuiz() {
          document.getElementById('quiz-intro').style.display = 'none';
          document.getElementById('progress-container').style.display = 'block';
          showQuestion(0);
          updateProgress();
        }
        
        function showQuestion(index) {
          // Hide all questions
          document.querySelectorAll('.quiz-question').forEach(q => q.classList.remove('active'));
          
          // Show current question
          const question = document.getElementById(\`question-\${index}\`);
          if (question) {
            question.classList.add('active');
          }
        }
        
        function selectOption(questionIndex, optionId, points) {
          // Remove previous selection
          const questionEl = document.getElementById(\`question-\${questionIndex}\`);
          questionEl.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
          
          // Add selection to clicked option
          event.target.classList.add('selected');
          
          // Store answer
          answers[questionIndex] = optionId;
          
          // Add points to scores
          Object.keys(points || {}).forEach(key => {
            if (scores[key] !== undefined) {
              scores[key] += points[key];
            }
          });
          
          // Enable next button
          document.getElementById(\`next-btn-\${questionIndex}\`).disabled = false;
        }
        
        function nextQuestion() {
          currentQuestion++;
          if (currentQuestion < quizData.questions.length) {
            showQuestion(currentQuestion);
            updateProgress();
          } else {
            showResult();
          }
        }
        
        function updateProgress() {
          const progress = ((currentQuestion + 1) / quizData.questions.length) * 100;
          document.getElementById('progress-fill').style.width = \`\${progress}%\`;
        }
        
        function showResult() {
          // Hide all questions and progress
          document.querySelectorAll('.quiz-question').forEach(q => q.style.display = 'none');
          document.getElementById('progress-container').style.display = 'none';
          
          // Find result with highest score
          let maxScore = -1;
          let resultId = null;
          
          Object.keys(scores).forEach(key => {
            if (scores[key] > maxScore) {
              maxScore = scores[key];
              resultId = key;
            }
          });
          
          // Show result
          if (resultId) {
            document.getElementById(\`result-\${resultId}\`).classList.add('active');
          }
          
          // Send result to backend (optional)
          sendResult(resultId, scores, answers);
        }
        
        function restartQuiz() {
          currentQuestion = 0;
          answers = {};
          scores = {};
          
          // Reset scores
          if (quizData.results) {
            quizData.results.forEach(result => {
              scores[result.id] = 0;
            });
          }
          
          // Hide results
          document.querySelectorAll('.quiz-result').forEach(r => r.classList.remove('active'));
          
          // Reset selections
          document.querySelectorAll('.quiz-option').forEach(opt => opt.classList.remove('selected'));
          document.querySelectorAll('[id^="next-btn-"]').forEach(btn => btn.disabled = true);
          
          // Show intro
          document.getElementById('quiz-intro').style.display = 'block';
          document.getElementById('progress-container').style.display = 'none';
        }
        
        function sendResult(resultId, scores, answers) {
          console.log('Quiz completado:', { resultId, scores, answers });
          
          // Optional: Send result to analytics endpoint
          fetch('/api/quiz-results', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              participantId: 'anonymous_' + Date.now(),
              quizId: '${funnel.id}',
              responses: JSON.stringify(answers),
              scores: JSON.stringify(scores),
              predominantStyle: resultId
            })
          }).catch(console.error);
        }
      </script>
    </body>
    </html>
  `;
}

export { generateQuizHtml };
