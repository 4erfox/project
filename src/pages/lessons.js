export function lessonsPage() {
  const container = document.createElement('div');
  container.className = 'page-container';

  container.innerHTML = `
    <div class="content-wrapper">
      <h1 class="page-title">Уроки делового этикета</h1>
      <div class="lessons-grid">
        <div class="lesson-card" data-lesson="1">
          <h2>Урок 1: Приветствие и представление</h2>
          <p>Основы делового приветствия в Казахстане</p>
        </div>
        <div class="lesson-card" data-lesson="2">
          <h2>Урок 2: Деловая переписка</h2>
          <p>Правила составления деловых писем</p>
        </div>
        <div class="lesson-card" data-lesson="3">
          <h2>Урок 3: Деловые встречи</h2>
          <p>Этикет деловых встреч и переговоров</p>
        </div>
      </div>
    </div>
  `;

  const cards = container.querySelectorAll('.lesson-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const lessonId = card.dataset.lesson;
      window.router.navigate(`/lesson/${lessonId}`);
    });
  });

  return container;
}
