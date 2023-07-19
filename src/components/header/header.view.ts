import { DOMGuards } from 'utils/guards';
import './header.scss';
import { ElementBuilder } from 'interfaces/element-builder';
import { View } from 'interfaces/view';

export class HeaderView extends ElementBuilder implements View {
  element: HTMLElement | null = null;
  ul!: HTMLUListElement;
  navItems!: HTMLLIElement[];
  links = [
    { name: 'Garage', link: '/', icon: 'bi-airplane' },
    { name: 'Winners', link: '/winners', icon: 'bi-trophy' },
  ];

  constructor() {
    super();
    const nav = this.createNavigation();
    const parent = this.getElement('header');

    if (parent) {
      parent.prepend(nav);
    }

    this.element = nav;
    this.setActiveLink(window.location.pathname);
  }

  setActiveLink(path: string) {
    const links = this.navItems.map((li) => li.querySelector('a'));

    links?.forEach((link) => {
      if (link) {
        link.classList.remove('active');

        if (link.getAttribute('href') === path) {
          link.classList.add('active');
        }
      }
    });
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

    this.navItems = this.links.map(({ name, link, icon }) =>
      this.createNavigationItem(name, link, icon),
    );

    this.ul.append(...this.navItems);
    container.appendChild(this.ul);
    nav.appendChild(container);

    return nav;
  }

  private createNavigationItem(
    text: string,
    link: string,
    iconStr: string,
  ): HTMLLIElement {
    const icon = this.createIcon(iconStr);
    const li = this.createElement<HTMLLIElement>('li', {
      classes: ['nav-item'],
    });
    const a = this.createElement<HTMLLinkElement>('a', {
      classes: ['nav-link', 'icon-link'],
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
