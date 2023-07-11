import { View } from 'interfaces/view';
import './track.scss';

export class TrackView extends View {
  constructor(name: string, id: string) {
    super();
    const editContainer = this.createElement('div', {
      id: 'edit-container',
      classes: ['mt-3'],
    });

    const buttonSelect = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-success', 'me-2'],
    });
    buttonSelect.textContent = 'SELECT';
    buttonSelect.type = 'button';

    const buttonRemove = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-danger', 'me-2'],
    });
    buttonRemove.textContent = 'REMOVE';
    buttonRemove.type = 'button';

    const model = this.createElement('span', {
      id: id,
    });
    model.textContent = name;

    editContainer.append(buttonSelect, buttonRemove, model);

    const trackContainer = this.createElement<HTMLElement>('div', {
      id: 'track',
      classes: ['border-bottom', 'border-5', 'd-flex', 'mt-3', 'pb-3'],
    });

    const buttonStart = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-primary', 'me-2'],
    });
    buttonStart.textContent = 'START';
    buttonStart.type = 'button';

    const buttonStop = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-danger', 'me-2'],
    });
    buttonStop.textContent = 'STOP';
    buttonStop.type = 'button';

    const wrapper = this.createElement('div', {
      classes: ['wrapper', 'flex-grow-1'],
    });
    const airplaneWrapper = this.createElement('div', {
      classes: ['airplane-wrapper'],
    });
    const airplane = this.createIcon('bi-airplane-fill');
    airplaneWrapper.appendChild(airplane);
    wrapper.appendChild(airplaneWrapper);

    trackContainer.append(buttonStart, buttonStop, wrapper);

    const parent = this.getElement('#race');
    if (parent) {
      parent.append(editContainer, trackContainer);
    }
  }
}
