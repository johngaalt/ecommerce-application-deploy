import { Route } from 'types/route.type';

export class Router {
  private routes: Record<string, Route>;
  private currentPath: string;

  constructor(routes: Record<string, Route>) {
    this.routes = routes;
    this.currentPath = '';
    window.addEventListener('popstate', this.onPopStateChange.bind(this));
  }

  private onPopStateChange() {
    console.log(window.location.pathname);
    this.navigateTo(window.location.pathname, false);
  }

  navigateTo(path: string, addHistory = true) {
    const route = this.routes[path];

    if (route) {
      if (addHistory) {
        window.history.pushState({}, '', path);
      }

      this.currentPath = path;
      route.init();
    } else {
      console.error(`Path '${path}' is not registered in router`);
    }
  }
}
