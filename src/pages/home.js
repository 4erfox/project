export function home() {
  const main = document.createElement('main');
  main.innerHTML = `
    <div class="container">
      <section style="text-align: center; padding: var(--spacing-2xl) 0;">
        <h1 style="color: var(--primary-color); margin-bottom: var(--spacing-md);">Деловой этикет в Казахстане</h1>
        <p style="font-size: 18px; color: var(--neutral-600); margin-bottom: var(--spacing-lg); max-width: 600px; margin-left: auto; margin-right: auto;">
          Интерактивный учебник для профессионалов, стремящихся овладеть навыками деловой коммуникации в казахстанской и международной среде
        </p>
        <a href="/lessons" style="display: inline-block; padding: var(--spacing-md) var(--spacing-lg); background: var(--primary-color); color: white; border-radius: var(--border-radius); font-weight: 600; transition: background 0.2s ease;">
          Начать обучение
        </a>
      </section>

      <section style="margin-bottom: var(--spacing-2xl);">
        <h2 style="text-align: center; margin-bottom: var(--spacing-xl);">Что вы изучите</h2>
        <div class="row">
          <div class="col-4">
            <div style="background: white; padding: var(--spacing-lg); border-radius: var(--border-radius-lg); box-shadow: var(--shadow-md); text-align: center;">
              <div style="font-size: 40px; margin-bottom: var(--spacing-md);">📚</div>
              <h3 style="color: var(--primary-color);">6 глав обучения</h3>
              <p style="color: var(--neutral-600);">Комплексное изучение всех аспектов делового этикета</p>
            </div>
          </div>
          <div class="col-4">
            <div style="background: white; padding: var(--spacing-lg); border-radius: var(--border-radius-lg); box-shadow: var(--shadow-md); text-align: center;">
              <div style="font-size: 40px; margin-bottom: var(--spacing-md);">✅</div>
              <h3 style="color: var(--primary-color);">Интерактивные тесты</h3>
              <p style="color: var(--neutral-600);">Проверьте свои знания после каждого урока</p>
            </div>
          </div>
          <div class="col-4">
            <div style="background: white; padding: var(--spacing-lg); border-radius: var(--border-radius-lg); box-shadow: var(--shadow-md); text-align: center;">
              <div style="font-size: 40px; margin-bottom: var(--spacing-md);">📊</div>
              <h3 style="color: var(--primary-color);">Отслеживание прогресса</h3>
              <p style="color: var(--neutral-600);">Смотрите свой прогресс обучения в реальном времени</p>
            </div>
          </div>
        </div>
      </section>

      <section style="background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-light) 100%); color: white; padding: var(--spacing-xl); border-radius: var(--border-radius-lg); text-align: center;">
        <h2 style="color: white; margin-bottom: var(--spacing-md);">Готовы к успеху?</h2>
        <p style="margin-bottom: var(--spacing-lg);">Начните изучение делового этикета и развивайте свои профессиональные навыки прямо сейчас</p>
        <a href="/lessons" style="display: inline-block; padding: var(--spacing-md) var(--spacing-lg); background: var(--secondary-light); color: var(--primary-dark); border-radius: var(--border-radius); font-weight: 600; transition: background 0.2s ease;">
          Приступить к урокам
        </a>
      </section>
    </div>
  `;

  const links = main.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.router.navigate(link.getAttribute('href'));
    });
  });

  return main;
}
