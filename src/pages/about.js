export function aboutPage() {
  const container = document.createElement('div');
  container.className = 'page-container';

  container.innerHTML = `
    <div class="content-wrapper">
      <h1 class="page-title">О курсе</h1>
      <div class="about-content">
        <p>Интерактивный учебник по деловому этикету в Казахстане</p>
        <p>Изучайте правила делового общения, соответствующие казахстанским традициям и современным бизнес-стандартам.</p>
      </div>
    </div>
  `;

  return container;
}
