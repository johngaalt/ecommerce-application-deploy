import { View } from 'interfaces/view';

export class RaceView extends View {
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
    raceContainer.append(title, titleSecondary);

    if (parent) {
      parent.appendChild(raceContainer);
    }
  }
}
