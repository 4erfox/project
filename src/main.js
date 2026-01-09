import { initializePillNav } from './components/PillNav.js';
import { home } from './pages/home.js';
import { lessonsPage } from './pages/lessons.js';
import { lessonDetailPage } from './pages/lesson-detail.js';
import { glossaryPage } from './pages/glossary.js';
import { aboutPage } from './pages/about.js';

class Router {
  constructor() {
    this.currentPath = '/';
  }

  navigate(path) {
    this.currentPath = path;
    window.history.pushState({}, '', path);
    this.render(path);
  }

  render(path) {
    this.updateActiveLinks(path);
    let page;

    if (path.startsWith('/lesson/')) {
      const lessonId = path.split('/')[2];
      page = lessonDetailPage(lessonId);
    } else {
      switch (path) {
        case '/':
          page = home();
          break;
        case '/lessons':
          page = lessonsPage();
          break;
        case '/glossary':
          page = glossaryPage();
          break;
        case '/about':
          page = aboutPage();
          break;
        default:
          page = home();
      }
    }

    const appContainer = document.getElementById('app');
    appContainer.innerHTML = '';
    appContainer.appendChild(page);
  }

  updateActiveLinks(path) {
    const allLinks = document.querySelectorAll('.pill, .mobile-menu-link');
    allLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === path || (path.startsWith('/lesson/') && href === '/lessons')) {
        link.classList.add('is-active');
      } else {
        link.classList.remove('is-active');
      }
    });
  }
}

const router = new Router();
window.router = router;

function initializeApp() {
  initializePillNav();

  const allLinks = document.querySelectorAll('.pill, .mobile-menu-link, .pill-logo');
  allLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const href = link.getAttribute('href');
      router.navigate(href);
    });
  });

  router.render(window.location.pathname);
}

window.addEventListener('popstate', () => {
  router.render(window.location.pathname);
});

document.addEventListener('DOMContentLoaded', initializeApp);
