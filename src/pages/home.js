export function home() {
  const main = document.createElement('div');
  main.innerHTML = `
    <section class="hero">
      <div class="hero-overlay">
        <div class="hero-content">
          <h1>Деловой этикет в Казахстане</h1>
          <p>Интерактивный учебник для профессионалов, стремящихся овладеть навыками деловой коммуникации</p>
          <div class="hero-buttons">
            <button class="hero-button primary" id="hero-start">Начать обучение</button>
            <button class="hero-button" id="hero-about">О курсе</button>
          </div>
        </div>
      </div>
    </section>

    <div class="container">
      <section style="text-align: center; padding: var(--spacing-2xl) 0;">
        <h2 style="color: var(--primary-color); margin-bottom: var(--spacing-md);">Что вы изучите</h2>
        <p style="font-size: 16px; color: var(--neutral-600); margin-bottom: var(--spacing-lg); max-width: 600px; margin-left: auto; margin-right: auto;">
          Комплексное руководство по деловому этикету и правилам профессионального поведения
        </p>
      </section>

      <section style="margin-bottom: var(--spacing-2xl);">
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
        <button id="cta-btn" class="hero-button primary" style="display: inline-block;">Приступить к урокам</button>
      </section>
    </div>
  `;

  const startBtn = main.querySelector('#hero-start');
  const aboutBtn = main.querySelector('#hero-about');
  const ctaBtn = main.querySelector('#cta-btn');

  startBtn.addEventListener('click', () => {
    window.router.navigate('/lessons');
  });

  aboutBtn.addEventListener('click', () => {
    window.router.navigate('/about');
  });

  ctaBtn.addEventListener('click', () => {
    window.router.navigate('/lessons');
  });

  return main;
}