import { Route } from 'types/route.type';
import eventBus from './event.service';
import { EventTypes } from 'types/event.enum';

export class Router {
  private routes: Record<string, Route>;
  private currentPath: string;
  private container: HTMLDivElement;

  constructor(container: HTMLDivElement, routes: Record<string, Route>) {
    this.container = container;
    this.routes = routes;
    this.currentPath = '';
    window.addEventListener('popstate', this.onPopStateChange.bind(this));
  }

  private onPopStateChange() {
    this.navigateTo(window.location.pathname, false);
  }

  navigateTo(path: string, addHistory = true) {
    // this.container.innerHTML = '';
    const route = this.routes[path];

    if (route) {
      if (addHistory) {
        window.history.pushState({}, '', path);
      }

      this.currentPath = path;
      // route.init();
      eventBus.publish(EventTypes.urlChanged, path);
    } else {
      global.console.error(`Path '${path}' is not registered in router`);
    }
  }
}
