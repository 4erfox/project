import SplitText from './components/SplitText.js';
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

    this.animateNewContent();
  }

  animateNewContent() {
    const greetingText = document.getElementById('greeting-text');
    const proverbText = document.getElementById('proverb-text');

    if (greetingText) {
      new SplitText({
        element: greetingText,
        delay: 100,
        duration: 0.6,
        ease: 'power3.out',
        from: { opacity: 0, y: 40 },
        to: { opacity: 1, y: 0 },
      });
    }

    if (proverbText) {
      new SplitText({
        element: proverbText,
        delay: 150,
        duration: 0.8,
        ease: 'power3.out',
        from: { opacity: 0, y: 40 },
        to: { opacity: 1, y: 0 },
        startDelay: 800,
      });
    }
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

document.addEventListener('DOMContentLoaded', () => {
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
});

window.addEventListener('popstate', () => {
  router.render(window.location.pathname);
});