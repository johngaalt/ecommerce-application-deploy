import { View } from 'interfaces/view';
import './track.scss';
import { Airplane } from 'types/airplane.type';

export class TrackView extends View {
  constructor(item: Airplane) {
    super();
    const editContainer = this.createElement('div', {
      classes: ['mt-3', 'd-flex', 'justify-content-between'],
    });
    const buttonWrapper2 = this.createElement('div');

    const buttonSelect = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-secondary', 'me-2', 'btn-sm'],
    });
    buttonSelect.textContent = 'Select';
    buttonSelect.type = 'button';

    const buttonRemove = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-danger', 'me-2', 'btn-sm'],
    });
    buttonRemove.textContent = 'Remove';
    buttonRemove.type = 'button';

    const model = this.createElement('span', {
      id: String(item.id),
      classes: ['fw-bold', 'text-light'],
    });
    model.textContent = item.name;

    const trackContainer = this.createElement<HTMLElement>('div', {
      classes: ['d-flex', 'mt-3', 'flex-column'],
    });

    const buttonWrapper1 = this.createElement('div');

    const buttonStart = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-primary', 'me-2', 'btn-sm'],
    });
    buttonStart.textContent = 'Start';
    buttonStart.type = 'button';

    const buttonStop = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-danger', 'me-2', 'btn-sm'],
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
        'mb-5',
      ],
    });
    const airplaneWrapper = this.createElement('div', {
      classes: ['airplane-wrapper'],
    });
    const airplane = this.createIcon('bi-airplane-fill');
    airplane.style.color = item.color;

    const flag = this.createIcon('bi-flag-fill');

    airplaneWrapper.appendChild(airplane);
    wrapper.append(airplaneWrapper, flag);
    buttonWrapper1.append(buttonSelect, buttonRemove, model);
    buttonWrapper2.append(buttonStart, buttonStop);
    editContainer.append(buttonWrapper1, buttonWrapper2);
    trackContainer.append(wrapper);

    const parent = this.getElement('#race');
    if (parent) {
      parent.append(editContainer, trackContainer);
    }
  }
}
