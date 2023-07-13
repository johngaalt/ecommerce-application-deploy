import { View } from 'interfaces/view';

export class RaceView extends View {
  list: HTMLDivElement;
  container: HTMLDivElement;

  constructor() {
    super();

    this.container = this.createElement<HTMLHeadingElement>('div', {
      id: 'race',
      classes: ['mt-5'],
    });
    const parent = this.getElement('#garage');

    const airplanesList = this.createElement<HTMLDivElement>('div', {
      id: 'list',
    });
    this.list = airplanesList;

    this.container.append(airplanesList);

    if (parent) {
      parent.appendChild(this.container);
    }
  }

  renderHeadings(count: number, pageNumber: number) {
    const title = this.createElement<HTMLHeadingElement>('h1', {
      classes: ['h1'],
    });
    title.textContent = `Garage (${count})`;

    const titleSecondary = this.createElement<HTMLHeadingElement>('h3', {
      classes: ['h3'],
    });
    titleSecondary.textContent = `Page #${pageNumber}`;
    this.container.prepend(title, titleSecondary);
  }

  clearAirplanesList() {
    this.list.innerHTML = '';
  }
}
