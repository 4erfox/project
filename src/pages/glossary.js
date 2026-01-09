export function glossaryPage() {
  const container = document.createElement('div');
  container.className = 'page-container';

  container.innerHTML = `
    <div class="content-wrapper">
      <h1 class="page-title">Глоссарий</h1>
      <div class="glossary-list">
        <div class="glossary-item">
          <h3>Деловой этикет</h3>
          <p>Свод правил поведения в профессиональной среде</p>
        </div>
        <div class="glossary-item">
          <h3>Протокол</h3>
          <p>Установленный порядок проведения деловых мероприятий</p>
        </div>
      </div>
    </div>
  `;

  return container;
}
