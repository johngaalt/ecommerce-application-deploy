import './header.scss';
import { View } from 'interfaces/view';

export class HeaderView extends View {
  element: HTMLElement | null = null;
  links = ['Garage', 'Winners'];

  constructor() {
    super();
    const header = this.createElement('header');
    const nav = this.createNavigation();
    const parent = this.getElement('#root');

    header.appendChild(nav);

    if (parent) {
      parent.appendChild(header);
    }

    this.element = header;
  }

  createNavigation() {
    const nav = this.createElement('nav', {
      classes: ['navbar', 'navbar-expand', 'bg-body-tertiary'],
    });
    const container = this.createElement('div', {
      classes: ['container', 'justify-content-center'],
    });
    const ul = this.createElement('ul', {
      classes: ['nav', 'nav-pills'],
    });
    const navItems = this.links.map((link) => this.createNavigationItem(link));

    ul.append(...navItems);
    container.appendChild(ul);
    nav.appendChild(container);

    return nav;
  }

  private createNavigationItem(text: string) {
    // TODO: refactor to router logic to get active page
    const isGaragePage = text.match(/garage/i);
    const icon = this.createIcon(isGaragePage ? 'bi-airplane' : 'bi-trophy');
    const li = this.createElement('li', { classes: ['nav-item'] });
    const a = this.createElement<HTMLLinkElement>('a', {
      classes: ['nav-link', 'icon-link', isGaragePage ? 'active' : 'f'],
    });

    a.href = '#';
    a.textContent = text;
    a.prepend(icon);

    li.appendChild(a);
    return li;
  }
}
