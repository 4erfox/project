export function aboutPage() {
  const main = document.createElement('main');
  main.innerHTML = `
    <div class="container">
      <h1 style="text-align: center; margin-bottom: var(--spacing-lg);">О курсе</h1>

      <div style="background: white; padding: var(--spacing-xl); border-radius: var(--border-radius-lg); box-shadow: var(--shadow-md); max-width: 800px; margin: 0 auto;">
        <h2 style="color: var(--primary-color); margin-bottom: var(--spacing-lg);">Деловой этикет в Казахстане</h2>

        <p style="margin-bottom: var(--spacing-md);">
          Этот интерактивный курс разработан для профессионалов, которые хотят овладеть навыками деловой коммуникации и понять особенности делового этикета в Казахстане.
        </p>

        <h3 style="margin-bottom: var(--spacing-md);">Цели курса</h3>
        <ul style="margin-left: var(--spacing-lg); margin-bottom: var(--spacing-lg);">
          <li style="margin-bottom: var(--spacing-sm);">Освоить основные принципы делового этикета</li>
          <li style="margin-bottom: var(--spacing-sm);">Развить навыки эффективной деловой коммуникации</li>
          <li style="margin-bottom: var(--spacing-sm);">Понять культурные особенности Казахстана в деловой среде</li>
          <li style="margin-bottom: var(--spacing-sm);">Овладеть международными стандартами делового протокола</li>
        </ul>

        <h3 style="margin-bottom: var(--spacing-md);">Структура курса</h3>
        <p style="margin-bottom: var(--spacing-md);">
          Курс состоит из 6 глав, каждая из которых посвящена различным аспектам делового этикета. После каждой главы предусмотрен тест для проверки полученных знаний.
        </p>

        <h3 style="margin-bottom: var(--spacing-md);">Целевая аудитория</h3>
        <ul style="margin-left: var(--spacing-lg); margin-bottom: var(--spacing-lg);">
          <li style="margin-bottom: var(--spacing-sm);">Студенты деловых программ</li>
          <li style="margin-bottom: var(--spacing-sm);">Менеджеры и руководители</li>
          <li style="margin-bottom: var(--spacing-sm);">Предприниматели</li>
          <li style="margin-bottom: var(--spacing-sm);">Специалисты в области международного бизнеса</li>
        </ul>

        <h3 style="margin-bottom: var(--spacing-md);">Что вы получите</h3>
        <p style="margin-bottom: var(--spacing-md);">
          По завершению курса вы будете иметь глубокое понимание правил делового этикета, которое поможет вам успешно взаимодействовать с коллегами и партнерами в профессиональной среде.
        </p>

        <div style="background: var(--neutral-200); padding: var(--spacing-lg); border-radius: var(--border-radius-lg); text-align: center;">
          <p style="margin: 0; color: var(--primary-color); font-weight: 600;">Начните свой путь к профессиональному развитию уже сейчас!</p>
        </div>
      </div>
    </div>
  `;

  return main;
}
