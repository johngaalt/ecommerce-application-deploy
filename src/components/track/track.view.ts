import { View } from 'interfaces/view';
import './track.scss';
import { Airplane } from 'types/airplane.type';

export class TrackView extends View {
  selectBtn: HTMLButtonElement;
  removeBtn: HTMLButtonElement;
  startBtn: HTMLButtonElement;
  stopBtn: HTMLButtonElement;

  constructor(item: Airplane) {
    super();
    const editContainer = this.createElement('div', {
      classes: ['mt-3', 'd-flex', 'justify-content-between'],
    });
    const buttonWrapper2 = this.createElement('div');

    this.selectBtn = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-secondary', 'me-2', 'btn-sm'],
    });
    this.selectBtn.textContent = 'Select';
    this.selectBtn.type = 'button';

    this.removeBtn = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-danger', 'me-2', 'btn-sm'],
    });
    this.removeBtn.textContent = 'Remove';
    this.removeBtn.type = 'button';

    const model = this.createElement('span', {
      id: String(item.id),
      classes: ['fw-bold', 'text-light'],
    });
    model.textContent = item.name;

    const trackContainer = this.createElement<HTMLElement>('div', {
      classes: ['d-flex', 'mt-3', 'flex-column'],
    });

    const buttonWrapper1 = this.createElement('div');

    this.startBtn = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-primary', 'me-2', 'btn-sm'],
    });
    this.startBtn.textContent = 'Start';
    this.startBtn.type = 'button';

    this.stopBtn = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-danger', 'me-2', 'btn-sm'],
    });
    this.stopBtn.textContent = 'Stop';
    this.stopBtn.type = 'button';

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
    buttonWrapper1.append(this.selectBtn, this.removeBtn, model);
    buttonWrapper2.append(this.startBtn, this.stopBtn);
    editContainer.append(buttonWrapper1, buttonWrapper2);
    trackContainer.append(wrapper);

    const parent = this.getElement('#list');
    if (parent) {
      parent.append(editContainer, trackContainer);
    }
  }

  selectButtonClickListener(cb: () => void) {
    this.selectBtn.addEventListener('click', () => cb());
  }
}
