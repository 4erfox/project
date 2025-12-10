export function Quiz(quiz, onComplete) {
  const container = document.createElement('div');
  container.className = 'quiz-container';

  let currentQuestion = 0;
  let score = 0;
  const answers = [];

  function renderQuestion() {
    const question = quiz.questions[currentQuestion];

    container.innerHTML = `
      <div class="quiz-header">
        <div class="quiz-progress">Вопрос ${currentQuestion + 1} из ${quiz.questions.length}</div>
        <div class="quiz-progress-bar">
          <div class="quiz-progress-fill" style="width: ${((currentQuestion + 1) / quiz.questions.length) * 100}%"></div>
        </div>
      </div>
      <div class="quiz-question">
        <h3>${question.question}</h3>
        <div class="quiz-options">
          ${question.options.map((option, index) => `
            <label class="quiz-option">
              <input type="radio" name="option" value="${index}">
              <span>${option}</span>
            </label>
          `).join('')}
        </div>
      </div>
      <button class="quiz-button" id="next-btn">
        ${currentQuestion === quiz.questions.length - 1 ? 'Завершить' : 'Далее'}
      </button>
    `;

    const options = container.querySelectorAll('.quiz-option');
    const nextBtn = container.querySelector('#next-btn');

    options.forEach(option => {
      option.addEventListener('click', (e) => {
        options.forEach(o => o.classList.remove('selected'));
        option.classList.add('selected');
        const selected = option.querySelector('input').value;
        answers[currentQuestion] = selected;
      });
    });

    nextBtn.addEventListener('click', handleNextQuestion);
  }

  function handleNextQuestion() {
    const question = quiz.questions[currentQuestion];
    const selected = answers[currentQuestion];

    if (selected === undefined) {
      alert('Пожалуйста, выберите ответ');
      return;
    }

    if (parseInt(selected) === question.correct) {
      score++;
    }

    if (currentQuestion < quiz.questions.length - 1) {
      currentQuestion++;
      renderQuestion();
    } else {
      showResults();
    }
  }

  function showResults() {
    const percentage = Math.round((score / quiz.questions.length) * 100);

    container.innerHTML = `
      <div class="quiz-results">
        <h2>Результаты теста</h2>
        <div class="quiz-score">${percentage}%</div>
        <p>Вы ответили правильно: ${score} из ${quiz.questions.length}</p>
        <button class="quiz-button" id="retry-btn" style="margin-top: var(--spacing-lg);">Пройти снова</button>
      </div>
    `;

    const retryBtn = container.querySelector('#retry-btn');
    retryBtn.addEventListener('click', () => {
      currentQuestion = 0;
      score = 0;
      answers.length = 0;
      renderQuestion();
    });

    if (onComplete) {
      onComplete({ score, total: quiz.questions.length, percentage });
    }
  }

  renderQuestion();
  return container;
}
