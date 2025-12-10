import { lessons } from '../data/lessons.js';
import { quizzes } from '../data/quizzes.js';
import { Quiz } from '../components/Quiz.js';

export function lessonDetailPage(lessonId) {
  const main = document.createElement('main');
  const lesson = lessons.find(l => l.id === parseInt(lessonId));

  if (!lesson) {
    main.innerHTML = '<div class="container"><p>Урок не найден</p></div>';
    return main;
  }

  main.innerHTML = `
    <div class="container">
      <div style="margin-bottom: var(--spacing-lg);">
        <button id="back-btn" style="padding: var(--spacing-sm) var(--spacing-md); background: var(--neutral-300); border: none; border-radius: var(--border-radius); cursor: pointer;">
          ← Назад к урокам
        </button>
      </div>
      <div id="lesson-content"></div>
      <div style="margin-top: var(--spacing-2xl); padding-top: var(--spacing-lg); border-top: 1px solid var(--neutral-300);">
        <h3 style="margin-bottom: var(--spacing-lg);">Проверка знаний</h3>
        <div id="quiz-container"></div>
      </div>
    </div>
  `;

  const contentDiv = main.querySelector('#lesson-content');
  contentDiv.innerHTML = `
    <div style="background: white; padding: var(--spacing-xl); border-radius: var(--border-radius-lg); box-shadow: var(--shadow-md);">
      ${lesson.content}
    </div>
  `;

  const quiz = quizzes.find(q => q.lessonId === lesson.id);
  if (quiz) {
    const quizContainer = main.querySelector('#quiz-container');
    const quizComponent = Quiz(quiz, (result) => {
      console.log('Quiz completed:', result);
    });
    quizContainer.appendChild(quizComponent);
  }

  const backBtn = main.querySelector('#back-btn');
  backBtn.addEventListener('click', () => {
    window.router.navigate('/lessons');
  });

  return main;
}
