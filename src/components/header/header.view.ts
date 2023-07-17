import { DOMGuards } from 'utils/guards';
import './header.scss';
import { View } from 'interfaces/view';

export class HeaderView extends View {
  element: HTMLElement | null = null;
  ul!: HTMLUListElement;
  links = [
    { name: 'Garage', link: '/' },
    { name: 'Winners', link: '/winners' },
  ];

  constructor() {
    super();
    const header = this.createElement('header');
    const nav = this.createNavigation();
    const parent = this.getElement('#root');

    header.appendChild(nav);

    if (parent) {
      parent.prepend(header);
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
    this.ul = this.createElement('ul', {
      classes: ['nav', 'nav-pills'],
    });

    const navItems = this.links.map((link) =>
      this.createNavigationItem(link.name, link.link),
    );

    this.ul.append(...navItems);
    container.appendChild(this.ul);
    nav.appendChild(container);

    return nav;
  }

  private createNavigationItem(text: string, link: string) {
    // TODO: refactor to router logic to get active page
    const isGaragePage = text.match(/garage/i);
    const icon = this.createIcon(isGaragePage ? 'bi-airplane' : 'bi-trophy');
    const li = this.createElement('li', { classes: ['nav-item'] });
    const a = this.createElement<HTMLLinkElement>('a', {
      classes: ['nav-link', 'icon-link', isGaragePage ? 'active' : 'f'],
    });

    a.href = link;
    a.textContent = text;
    a.prepend(icon);

    li.appendChild(a);
    return li;
  }

  ulClickListener(cb: (path: string) => void) {
    this.ul.addEventListener('click', (event) => {
      if (DOMGuards.isHTMLElement(event.target)) {
        const link = event.target.closest<HTMLLinkElement>('.nav-link');
        if (link) {
          event.preventDefault();
          const path = link.href.split('/').at(-1) || '';
          cb(`/${path}`);
        }
      }
    });
  }
}
