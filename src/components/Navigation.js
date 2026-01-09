export function Navigation(onNavigate) {
  const navbar = document.createElement('nav');
  navbar.className = 'navbar';

  navbar.innerHTML = `
    <div class="navbar-container">
      <a class="navbar-brand" href="/">
        <div class="navbar-brand-icon">БЭ</div>
        <span>Деловой этикет РК</span>
      </a>
      
      <button class="navbar-toggle" id="navbar-toggle" aria-label="Toggle menu">
        <div class="hamburger"></div>
        <div class="hamburger"></div>
        <div class="hamburger"></div>
      </button>

      <ul class="navbar-menu" id="navbar-menu">
        <li class="navbar-item">
          <a href="/" class="navbar-link active" data-page="home">Главная</a>
        </li>
        <li class="navbar-item">
          <a href="/lessons" class="navbar-link" data-page="lessons">Уроки</a>
        </li>
        <li class="navbar-item">
          <a href="/glossary" class="navbar-link" data-page="glossary">Глоссарий</a>
        </li>
        <li class="navbar-item">
          <a href="/about" class="navbar-link" data-page="about">О курсе</a>
        </li>
      </ul>
    </div>
  `;

  const toggle = navbar.querySelector('#navbar-toggle');
  const menu = navbar.querySelector('#navbar-menu');
  const links = navbar.querySelectorAll('.navbar-link');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    menu.classList.toggle('active');
  });

  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      
      const href = link.getAttribute('href');
      if (href.startsWith('/lesson/')) {
        const lessonId = href.split('/')[2];
        window.router.navigate(`/lesson/${lessonId}`);
      } else {
        window.router.navigate(href);
      }
      
      toggle.classList.remove('active');
      menu.classList.remove('active');
      
      links.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      onNavigate(href);
    });
  });

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY > 50;
    navbar.classList.toggle('scrolled', scrolled);
  });

  return navbar;
}

export function updateActiveLink(path) {
  const links = document.querySelectorAll('.navbar-link');
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (path === href || (path.startsWith('/lesson/') && href === '/lessons')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
