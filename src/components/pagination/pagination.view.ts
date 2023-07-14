import { View } from 'interfaces/view';

export class PaginationView extends View {
  nav: HTMLElement;
  ul: HTMLElement;

  constructor() {
    super();

    this.nav = this.createElement<HTMLElement>('nav');
    this.ul = this.createElement<HTMLElement>('ul', {
      id: 'pagination-parent',
      classes: ['pagination'],
    });

    const items = Array.from(['Previous', 'Next'], (item) => {
      return this.createPaginationItem(item);
    });
    this.ul.append(...items);
    this.nav.appendChild(this.ul);
    const parent = this.getElement('#subtitle');

    if (parent) {
      parent.appendChild(this.nav);
    }
  }

  createPaginationItem(linkText: string) {
    const li = this.createElement('li', {
      classes: ['page-item'],
    });

    const link = this.createElement<HTMLLinkElement>('a', {
      classes: ['page-link'],
    });
    link.textContent = linkText;
    link.href = '#';

    li.appendChild(link);
    return li;
  }

  // paginationPageClickListener() {
  //   this.ul?.addEventListener('click', () => {

  //   });
  // }
}
