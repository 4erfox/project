import { glossary } from '../data/glossary.js';

export function glossaryPage() {
  const main = document.createElement('main');
  main.innerHTML = `
    <div class="container">
      <h1 style="text-align: center; margin-bottom: var(--spacing-lg);">Глоссарий</h1>
      <p style="text-align: center; color: var(--neutral-600); margin-bottom: var(--spacing-2xl);">
        Словарь основных терминов делового этикета
      </p>

      <div style="background: white; padding: var(--spacing-xl); border-radius: var(--border-radius-lg); box-shadow: var(--shadow-md);">
        <div id="glossary-list"></div>
      </div>
    </div>
  `;

  const glossaryList = main.querySelector('#glossary-list');
  glossary.forEach((item, index) => {
    const div = document.createElement('div');
    div.style.cssText = 'margin-bottom: var(--spacing-lg); padding-bottom: var(--spacing-lg); border-bottom: 1px solid var(--neutral-300);';
    if (index === glossary.length - 1) {
      div.style.borderBottom = 'none';
    }
    div.innerHTML = `
      <h4 style="color: var(--primary-color); margin-bottom: var(--spacing-sm);">${item.term}</h4>
      <p style="color: var(--neutral-600);">${item.definition}</p>
    `;
    glossaryList.appendChild(div);
  });

  return main;
}
