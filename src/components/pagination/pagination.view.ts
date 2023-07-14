import { View } from 'interfaces/view';

export class PaginationView extends View {
  nav?: HTMLElement;
  ul?: HTMLElement;

  constructor() {
    super();
  }

  render(pageCount: number, currentPage: number) {
    this.nav = this.createElement<HTMLElement>('nav');
    this.ul = this.createElement<HTMLElement>('ul', {
      classes: ['pagination'],
    });

    const items = Array.from({ length: pageCount }, (_item, index) => {
      const idx = index + 1;
      return this.createPaginationItem(idx, currentPage === idx);
    });
    this.ul.append(...items);
    this.nav.appendChild(this.ul);
    const parent = this.getElement('#subtitle');

    if (parent) {
      parent.appendChild(this.nav);
    }
  }

  createPaginationItem(linkText: number, isActive: boolean) {
    const li = this.createElement('li', {
      classes: ['page-item', isActive ? 'active' : 'item'],
    });

    const link = this.createElement<HTMLLinkElement>('a', {
      classes: ['page-link'],
    });
    link.textContent = String(linkText);
    link.href = '#';

    li.appendChild(link);
    return li;
  }
}
