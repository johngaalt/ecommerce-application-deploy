import { View } from 'interfaces/view';

export class RaceView extends View {
  list: HTMLDivElement;
  constructor() {
    super();

    const raceContainer = this.createElement('div', {
      id: 'race',
      classes: ['mt-5'],
    });
    const parent = this.getElement('#garage');
    const title = this.createElement('h1', {
      classes: ['h1'],
    });
    const titleSecondary = this.createElement('h3', {
      classes: ['h3'],
    });
    title.textContent = `Garage (#TOTALPAGES#)`;
    titleSecondary.textContent = `Page #1`;

    const airplanesList = this.createElement<HTMLDivElement>('div', {
      id: 'list',
    });
    this.list = airplanesList;

    raceContainer.append(title, titleSecondary, airplanesList);

    if (parent) {
      parent.appendChild(raceContainer);
    }
  }

  clearAirplanesList() {
    this.list.innerHTML = '';
  }
}
