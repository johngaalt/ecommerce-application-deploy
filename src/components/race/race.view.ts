import { ElementBuilder } from 'interfaces/element-builder';
import { View } from 'interfaces/view';

export class RaceView extends ElementBuilder implements View {
  list: HTMLDivElement;
  container: HTMLDivElement;
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

    if (parent) {
      parent.appendChild(this.container);
    }
  }

  clear() {
    this.list.innerHTML = '';
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

  hideWinner() {
    if (this.winner) {
      document.body.removeChild(this.winner);
    }
  }
}
