import { calculateProgress } from '../utils/helpers.js';

export function ProgressTracker(userProgress) {
  const container = document.createElement('div');
  container.className = 'progress-tracker';
  container.innerHTML = `
    <div style="background: white; padding: var(--spacing-lg); border-radius: var(--border-radius-lg); box-shadow: var(--shadow-md); margin-bottom: var(--spacing-lg);">
      <h3 style="margin-bottom: var(--spacing-md);">Ваш прогресс</h3>
      <div style="margin-bottom: var(--spacing-md);">
        <div style="display: flex; justify-content: space-between; margin-bottom: var(--spacing-sm);">
          <span>Уроки пройдены</span>
          <span style="font-weight: 600;">${userProgress.lessonsCompleted} из ${userProgress.totalLessons}</span>
        </div>
        <div style="width: 100%; height: 8px; background: var(--neutral-300); border-radius: 4px; overflow: hidden;">
          <div style="height: 100%; background: var(--success-color); width: ${calculateProgress(userProgress.lessonsCompleted, userProgress.totalLessons)}%;"></div>
        </div>
      </div>

      <div style="margin-bottom: var(--spacing-md);">
        <div style="display: flex; justify-content: space-between; margin-bottom: var(--spacing-sm);">
          <span>Тесты пройдены</span>
          <span style="font-weight: 600;">${userProgress.quizzesCompleted} из ${userProgress.totalQuizzes}</span>
        </div>
        <div style="width: 100%; height: 8px; background: var(--neutral-300); border-radius: 4px; overflow: hidden;">
          <div style="height: 100%; background: var(--primary-color); width: ${calculateProgress(userProgress.quizzesCompleted, userProgress.totalQuizzes)}%;"></div>
        </div>
      </div>

      <div style="padding: var(--spacing-md); background: var(--neutral-200); border-radius: var(--border-radius); text-align: center;">
        <p style="margin: 0;">Общий прогресс: <strong>${calculateProgress(userProgress.lessonsCompleted + userProgress.quizzesCompleted, userProgress.totalLessons + userProgress.totalQuizzes)}%</strong></p>
      </div>
    </div>
  `;

  return container;
}
