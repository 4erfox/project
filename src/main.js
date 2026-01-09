import { Navigation, updateActiveLink } from './components/Navigation.js';
import { Footer } from './components/Footer.js';
import { home } from './pages/home.js';
import { lessonsPage } from './pages/lessons.js';
import { lessonDetailPage } from './pages/lesson-detail.js';
import { glossaryPage } from './pages/glossary.js';
import { aboutPage } from './pages/about.js';

const routes = [
  { path: '/', page: 'home' },
  { path: '/lessons', page: 'lessons' },
  { path: '/glossary', page: 'glossary' },
  { path: '/about', page: 'about' }
];

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
    updateActiveLink(path);
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
}

const router = new Router();
window.router = router;

function initializeApp() {
  const app = document.getElementById('app');
  
  const navbar = Navigation((path) => {
    router.navigate(path);
  });

  const footer = Footer();

  const appWrapper = document.createElement('div');
  appWrapper.style.cssText = 'display: flex; flex-direction: column; min-height: 100vh;';

  const mainContent = document.createElement('div');
  mainContent.style.flex = '1';

  appWrapper.appendChild(navbar);
  appWrapper.appendChild(mainContent);
  appWrapper.appendChild(footer);

  app.appendChild(appWrapper);

  const contentContainer = appWrapper.querySelector('div:nth-child(2)');
  contentContainer.innerHTML = '';
  router.render('/');
}

window.addEventListener('popstate', () => {
  router.render(window.location.pathname);
});

document.addEventListener('DOMContentLoaded', initializeApp);
