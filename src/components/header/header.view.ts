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
      classes: ['container'],
    });
    const ul = this.createElement('ul', {
      classes: ['navbar-nav'],
    });
    const navItems = this.links.map((link) => this.createNavigationItem(link));

    ul.append(...navItems);
    container.appendChild(ul);
    nav.appendChild(container);

    return nav;
  }

  private createNavigationItem(text: string) {
    const li = this.createElement('li', { classes: ['nav-item'] });
    const a = this.createElement<HTMLLinkElement>('a', {
      classes: ['nav-link'],
    });

    a.href = '#';
    a.textContent = text;

    li.appendChild(a);
    return li;
  }
}
