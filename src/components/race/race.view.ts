import { ElementBuilder } from 'interfaces/element-builder';
import { View } from 'interfaces/view';

export class RaceView extends ElementBuilder implements View {
  list: HTMLDivElement;
  container: HTMLDivElement;
  winner?: HTMLDivElement;
  airplanesList: HTMLDivElement;

  constructor() {
    super();

    this.container = this.createElement<HTMLHeadingElement>('div', {
      id: 'race',
      classes: ['mt-5'],
    });

    this.airplanesList = this.createElement<HTMLDivElement>('div', {
      id: 'list',
    });
    this.list = this.airplanesList;
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
          'z-3',
        ],
      });
      this.winner.textContent = `The winner is ${name} with ${time}s`;
      document.body.appendChild(this.winner);

      setTimeout(() => {
        this.hideWinner();
      }, 3000);
    }
  }

  hideWinner() {
    if (this.winner) {
      document.body.removeChild(this.winner);
    }
  }

  render() {
    const parent = this.getElement('#garage');
    this.container.append(this.airplanesList);

    if (parent) {
      parent.appendChild(this.container);
    }
  }
}
