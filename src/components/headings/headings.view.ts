import { View } from 'interfaces/view';

export class HeadingsView extends View {
  title: HTMLHeadingElement;
  subtitle: HTMLHeadingElement;
  container: HTMLDivElement;

  constructor() {
    super();
    this.container = this.createElement('div', {
      classes: ['container', 'mt-4'],
    });

    this.title = this.createElement<HTMLHeadingElement>('h1', {
      classes: ['h1'],
    });
    this.subtitle = this.createElement<HTMLHeadingElement>('h3', {
      id: 'subtitle',
      classes: ['h3', 'd-flex', 'justify-content-between'],
    });
  }

  renderHeadings(
    title: string,
    count: number,
    pageNumber: number,
    limit: number,
    parentId: string,
  ) {
    this.title.textContent = `${title} (${count})`;
    this.subtitle.textContent = `Page #${pageNumber} from ${Math.ceil(
      count / limit,
    )}`;
    this.container.prepend(this.title, this.subtitle);
    const parent = this.getElement(parentId);
    parent?.prepend(this.container);
  }

  clear() {
    this.container.innerHTML = '';
  }
}
