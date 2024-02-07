import './header.scss';
import { ElementBuilder } from 'interfaces/element-builder';
import { View } from 'interfaces/view';

export class HeaderView extends ElementBuilder implements View {
  ul!: HTMLUListElement;
  navItems!: HTMLLIElement[];
  links = [
    { name: 'Garage', link: '#garage', icon: 'bi-airplane' },
    { name: 'Winners', link: '#winners', icon: 'bi-trophy' },
  ];
  nav: HTMLElement;

  constructor() {
    super();
    this.nav = this.createNavigation();
  }

  setActiveLink() {
    const links = this.navItems.map((li) => li.querySelector('a'));

    links?.forEach((link) => {
      if (link) {
        const path = window.location.hash;
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

  render() {
    const parent = this.getElement('header');

    if (parent) {
      parent.prepend(this.nav);
    }

    this.setActiveLink();
  }
}