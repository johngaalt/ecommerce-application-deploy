import { View } from 'interfaces/view';

export class HeadingsView extends View {
  title: HTMLHeadingElement;
  subTitle: HTMLHeadingElement;
  container: HTMLDivElement;

  constructor() {
    super();
    this.container = this.createElement('div', {});

    this.title = this.createElement<HTMLHeadingElement>('h1', {
      classes: ['h1'],
    });
    this.subTitle = this.createElement<HTMLHeadingElement>('h3', {
      id: 'subtitle',
      classes: ['h3', 'd-flex', 'justify-content-between'],
    });
  }

  renderHeadings(
    title: string,
    count: number,
    pageNumber: number,
    limit: number,
  ) {
    this.title.textContent = `${title} (${count})`;
    this.subTitle.textContent = `Page #${pageNumber} from ${Math.ceil(
      count / limit,
    )}`;
    this.container.prepend(this.title, this.subTitle);
    const parent = this.getElement('#race');
    parent?.prepend(this.container);
  }

  clear() {
    this.title.innerHTML = '';
    this.subTitle.innerHTML = '';
  }
}
