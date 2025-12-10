export function LessonCard(lesson, onSelect) {
  const card = document.createElement('div');
  card.className = `lesson-card ${lesson.completed ? 'completed' : ''}`;
  card.innerHTML = `
    <div class="lesson-card-header">
      <div class="lesson-card-number">${lesson.number}</div>
      <span class="lesson-card-badge">${lesson.chapter}</span>
    </div>
    <h3>${lesson.title}</h3>
    <p>${lesson.description}</p>
    <div class="lesson-card-footer">
      <div class="lesson-duration">
        <span>⏱️ ${lesson.duration} мин</span>
      </div>
      <div class="lesson-progress" style="width: 150px;">
        <div class="lesson-progress-bar" style="width: ${lesson.progress || 0}%"></div>
      </div>
    </div>
  `;

  card.addEventListener('click', () => {
    onSelect(lesson.id);
  });

  return card;
}
