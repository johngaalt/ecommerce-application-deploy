import { View } from 'interfaces/view';
import { Airplane } from 'types/airplane.type';

export class RaceView extends View {
  list: HTMLDivElement;
  container: HTMLDivElement;
  title: HTMLHeadingElement;
  subTitle: HTMLHeadingElement;
  winner?: HTMLDivElement;

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

    this.title = this.createElement<HTMLHeadingElement>('h1', {
      classes: ['h1'],
    });
    this.subTitle = this.createElement<HTMLHeadingElement>('h3', {
      id: 'subtitle',
      classes: ['h3', 'd-flex', 'justify-content-between'],
    });

    if (parent) {
      parent.appendChild(this.container);
    }
  }

  renderHeadings(count: number, pageNumber: number, limit: number) {
    this.title.textContent = `Garage (${count})`;
    this.subTitle.textContent = `Page #${pageNumber} from ${Math.ceil(
      count / limit,
    )}`;
    this.container.prepend(this.title, this.subTitle);
  }

  clear() {
    this.list.innerHTML = '';
    this.title.innerHTML = '';
    this.subTitle.innerHTML = '';
  }

  showWinner(name: string, time: number) {
    if (name) {
      this.winner = this.createElement('div', {
        classes: [
          'position-fixed',
          'alert',
          'alert-success',
          'start-50',
          'top-50',
          'translate-middle',
        ],
      });
      this.winner.textContent = `The winner is ${name} with ${time}s`;
      document.body.appendChild(this.winner);
    }
  }
}
