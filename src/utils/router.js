export class Router {
  constructor(routes) {
    this.routes = routes;
    this.currentRoute = null;
    window.addEventListener('popstate', () => this.handleRoute());
  }

  navigate(path) {
    window.history.pushState({}, '', path);
    this.handleRoute();
  }

  handleRoute() {
    const path = window.location.pathname;
    const route = this.routes.find(r => r.path === path) || this.routes.find(r => r.path === '/');

    if (route && route.component) {
      this.currentRoute = route;
      this.render(route.component);
    }
  }

  render(component) {
    const app = document.getElementById('app');
    if (app) {
      app.innerHTML = '';
      app.appendChild(component);
    }
  }

  start() {
    this.handleRoute();
  }
}
