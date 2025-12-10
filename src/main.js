import { Router } from './utils/router.js';
import { Header } from './components/Header.js';
import { Footer } from './components/Footer.js';
import { home } from './pages/home.js';
import { lessonsPage } from './pages/lessons.js';
import { lessonDetailPage } from './pages/lesson-detail.js';
import { glossaryPage } from './pages/glossary.js';
import { aboutPage } from './pages/about.js';

const router = new Router([
  { path: '/', component: home() },
  { path: '/lessons', component: lessonsPage() },
  { path: '/glossary', component: glossaryPage() },
  { path: '/about', component: aboutPage() }
]);

window.router = router;

function createLayout(page) {
  const layout = document.createElement('div');
  layout.style.cssText = 'display: flex; flex-direction: column; min-height: 100vh;';

  const header = Header((path) => {
    if (path.startsWith('/lesson/')) {
      const lessonId = path.split('/')[2];
      renderLessonDetail(lessonId);
    } else {
      router.navigate(path);
    }
  });

  const mainContent = document.createElement('div');
  mainContent.style.flex = '1';
  mainContent.appendChild(page);

  const footer = Footer();

  layout.appendChild(header);
  layout.appendChild(mainContent);
  layout.appendChild(footer);

  return layout;
}

function renderLessonDetail(lessonId) {
  const page = lessonDetailPage(lessonId);
  const layout = createLayout(page);
  const app = document.getElementById('app');
  app.innerHTML = '';
  app.appendChild(layout);
}

function handleRoute() {
  const path = window.location.pathname;

  if (path.startsWith('/lesson/')) {
    const lessonId = path.split('/')[2];
    renderLessonDetail(lessonId);
  } else {
    let page;

    if (path === '/') {
      page = home();
    } else if (path === '/lessons') {
      page = lessonsPage();
    } else if (path === '/glossary') {
      page = glossaryPage();
    } else if (path === '/about') {
      page = aboutPage();
    } else {
      page = home();
    }

    const layout = createLayout(page);
    const app = document.getElementById('app');
    app.innerHTML = '';
    app.appendChild(layout);
  }
}

window.addEventListener('popstate', handleRoute);

handleRoute();
