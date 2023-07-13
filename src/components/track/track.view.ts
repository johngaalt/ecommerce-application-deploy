import { View } from 'interfaces/view';
import './track.scss';

export class TrackView extends View {
  constructor(name: string, id: number) {
    super();
    const editContainer = this.createElement('div', {
      id: 'edit-container',
      classes: ['mt-3'],
    });

    const buttonSelect = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-success', 'me-2'],
    });
    buttonSelect.textContent = 'Select';
    buttonSelect.type = 'button';

    const buttonRemove = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-danger', 'me-2'],
    });
    buttonRemove.textContent = 'Remove';
    buttonRemove.type = 'button';

    const model = this.createElement('span', {
      id: String(id),
    });
    model.textContent = name;

    editContainer.append(buttonSelect, buttonRemove, model);

    const trackContainer = this.createElement<HTMLElement>('div', {
      id: 'track',
      classes: ['d-flex', 'mt-3', 'flex-column'],
    });

    const buttonWrapper = this.createElement('div');

    const buttonStart = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-primary', 'me-2'],
    });
    buttonStart.textContent = 'Start';
    buttonStart.type = 'button';

    const buttonStop = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-danger', 'me-2'],
    });
    buttonStop.textContent = 'Stop';
    buttonStop.type = 'button';

    const wrapper = this.createElement('div', {
      classes: [
        'wrapper',
        'flex-grow-1',
        'border-bottom',
        'border-top',
        'border-light',
        'mt-3',
      ],
    });
    const airplaneWrapper = this.createElement('div', {
      classes: ['airplane-wrapper'],
    });
    const airplane = this.createIcon('bi-airplane-fill');
    const flag = this.createIcon('bi-flag-fill');
    airplaneWrapper.appendChild(airplane);
    wrapper.append(airplaneWrapper, flag);

    buttonWrapper.append(buttonStart, buttonStop);
    trackContainer.append(buttonWrapper, wrapper);

    const parent = this.getElement('#race');
    if (parent) {
      parent.append(editContainer, trackContainer);
    }
  }
}
