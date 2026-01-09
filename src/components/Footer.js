export function Footer() {
  const footer = document.createElement('footer');
  footer.className = 'footer';

  footer.innerHTML = `
    <div class="footer-container">
      <div class="footer-content">
        <p>&copy; 2024 Деловой этикет в Казахстане. Все права защищены.</p>
      </div>
    </div>
  `;

  return footer;
}
