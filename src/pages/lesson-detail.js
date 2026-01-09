export function lessonDetailPage(lessonId) {
  const container = document.createElement('div');
  container.className = 'page-container';

  const lessons = {
    '1': {
      title: 'Приветствие и представление',
      content: 'Основы делового приветствия в Казахстане...'
    },
    '2': {
      title: 'Деловая переписка',
      content: 'Правила составления деловых писем...'
    },
    '3': {
      title: 'Деловые встречи',
      content: 'Этикет деловых встреч и переговоров...'
    }
  };

  const lesson = lessons[lessonId] || { title: 'Урок не найден', content: '' };

  container.innerHTML = `
    <div class="content-wrapper">
      <button class="back-button" onclick="window.router.navigate('/lessons')">← Назад к урокам</button>
      <h1 class="page-title">${lesson.title}</h1>
      <div class="lesson-content">
        <p>${lesson.content}</p>
      </div>
    </div>
  `;

  return container;
}
