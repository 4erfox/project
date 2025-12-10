import { LessonCard } from '../components/LessonCard.js';
import { lessons } from '../data/lessons.js';

export function lessonsPage() {
  const main = document.createElement('main');
  main.innerHTML = `
    <div class="container">
      <h1 style="text-align: center; margin-bottom: var(--spacing-xl);">Уроки</h1>
      <p style="text-align: center; color: var(--neutral-600); margin-bottom: var(--spacing-2xl); max-width: 600px; margin-left: auto; margin-right: auto;">
        Выберите урок и начните изучение делового этикета
      </p>
      <div class="row" id="lessons-grid"></div>
    </div>
  `;

  const grid = main.querySelector('#lessons-grid');

  lessons.forEach((lesson) => {
    const card = LessonCard(lesson, (lessonId) => {
      window.router.navigate(`/lesson/${lessonId}`);
    });
    grid.appendChild(card);
  });

  return main;
}
