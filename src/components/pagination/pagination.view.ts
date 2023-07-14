import { View } from 'interfaces/view';
import { Pagination } from 'types/pagination.enum';
import { DOMGuards } from 'utils/guards';

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

    const elements = [Pagination.Previous, Pagination.Next];

    const items = Array.from(elements, (item) => {
      const isFirstPage = item === Pagination.Previous && currentPage === 1;
      const isLastPage = item === Pagination.Next && currentPage === pageCount;
      const isOnlyPage = pageCount <= 1;

      const isDisabled = isFirstPage || isLastPage || isOnlyPage;
      return this.createPaginationItem(item, isDisabled);
    });
    this.ul.append(...items);
    this.nav.appendChild(this.ul);
    const parent = this.getElement('#subtitle');

    if (parent) {
      parent.appendChild(this.nav);
    }
  }

  createPaginationItem(linkText: string, isDisabled: boolean) {
    const li = this.createElement('li', {
      classes: ['page-item', isDisabled ? 'disabled' : 'enabled'],
    });

    const link = this.createElement<HTMLLinkElement>('a', {
      classes: ['page-link'],
    });
    link.textContent = linkText;
    link.href = '#';

    li.appendChild(link);
    return li;
  }

  paginationPageClickListener(cb: (text: string) => void) {
    this.ul?.addEventListener('click', (event) => {
      if (DOMGuards.isHTMLElement(event.target)) {
        const target = event.target.closest('.page-item');
        if (
          target &&
          target.textContent &&
          target.classList.contains('enabled')
        ) {
          cb(target.textContent);
        }
      }
    });
  }
}
