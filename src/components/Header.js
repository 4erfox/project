export function Header(onNavigate) {
  const header = document.createElement('header');
  header.innerHTML = `
    <div class="container flex-between">
      <div class="logo">
        Деловой этикет <span>РК</span>
      </div>
      <button class="nav-toggle" id="nav-toggle">☰</button>
    </div>
  `;

  const toggleBtn = header.querySelector('#nav-toggle');
  const nav = Navigation(onNavigate);

  toggleBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
  });

  header.appendChild(nav);
  return header;
}

function Navigation(onNavigate) {
  const nav = document.createElement('nav');
  nav.className = 'navigation';

  const links = [
    { href: '/', text: 'Главная' },
    { href: '/lessons', text: 'Уроки' },
    { href: '/glossary', text: 'Глоссарий' },
    { href: '/about', text: 'О курсе' },
  ];

  links.forEach(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.text;

    if (window.location.pathname === link.href) {
      a.classList.add('active');
    }

    a.addEventListener('click', (e) => {
      e.preventDefault();
      const navToggle = document.querySelector('.nav-toggle');
      if (navToggle) {
        nav.classList.remove('active');
      }
      onNavigate(link.href);
    });

    nav.appendChild(a);
  });

  return nav;
}
