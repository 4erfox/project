export function Footer() {
  const footer = document.createElement('footer');
  footer.innerHTML = `
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h4>О проекте</h4>
          <p>Интерактивный учебник по деловому этикету в Казахстане для профессионалов и студентов.</p>
        </div>
        <div class="footer-section">
          <h4>Разделы</h4>
          <a href="/" style="display: block;">Главная</a>
          <a href="/lessons" style="display: block;">Уроки</a>
          <a href="/glossary" style="display: block;">Глоссарий</a>
        </div>
        <div class="footer-section">
          <h4>Информация</h4>
          <p>Все права защищены © 2024</p>
          <p>Контакт: info@business-etiquette-kz.edu</p>
        </div>
      </div>
      <div class="footer-divider">
        <p>Изучайте деловой этикет и развивайте свои профессиональные навыки</p>
      </div>
    </div>
  `;

  return footer;
}
