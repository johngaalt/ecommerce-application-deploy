import { View } from 'interfaces/view';
import './track.scss';
import { Airplane } from 'types/airplane.type';

export class TrackView extends View {
  selectBtn: HTMLButtonElement;
  removeBtn: HTMLButtonElement;
  startBtn: HTMLButtonElement;
  stopBtn: HTMLButtonElement;
  airplaneWrapper: HTMLDivElement;
  startSpinner: HTMLSpanElement;
  stopSpinner: HTMLSpanElement;

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

    this.startSpinner = this.createElement('span', {
      classes: ['d-none', 'spinner-border', 'spinner-border-sm', 'me-1'],
    });

    this.startBtn = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-primary', 'me-2', 'btn-sm'],
    });
    this.startBtn.textContent = 'Start';
    this.startBtn.type = 'button';
    this.startBtn.prepend(this.startSpinner);

    this.stopSpinner = this.createElement('span', {
      classes: ['d-none', 'spinner-border', 'spinner-border-sm', 'me-1'],
    });

    this.stopBtn = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-danger', 'me-2', 'btn-sm'],
    });
    this.stopBtn.disabled = true;
    this.stopBtn.textContent = 'Stop';
    this.stopBtn.type = 'button';
    this.stopBtn.prepend(this.stopSpinner);

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
    this.airplaneWrapper = this.createElement('div', {
      classes: ['airplane-wrapper'],
    });
    const airplane = this.createIcon('bi-airplane-fill');
    airplane.style.color = item.color;

    const flag = this.createIcon('bi-flag-fill');

    this.airplaneWrapper.appendChild(airplane);
    wrapper.append(this.airplaneWrapper, flag);
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

  removeButtonClickListener(cb: () => void) {
    this.removeBtn.addEventListener('click', () => cb());
  }

  startButtonClickListener(cb: () => void) {
    this.startBtn.addEventListener('click', () => cb());
  }

  stopButtonClickListener(cb: () => void) {
    this.stopBtn.addEventListener('click', () => cb());
  }

  disableStartButton() {
    this.startBtn.disabled = true;
    this.stopBtn.disabled = false;
    this.startSpinner.classList.remove('d-none');
  }

  hideStartSpinner() {
    this.startSpinner.classList.add('d-none');
  }

  startAnimation(time: string) {
    this.airplaneWrapper.classList.add('animated');
    this.airplaneWrapper.style.transitionDuration = time;
  }

  stopAnimation() {
    const { left } = this.airplaneWrapper.getBoundingClientRect();
    this.airplaneWrapper.classList.remove('animated');
    this.airplaneWrapper.style.transition = 'none';
    this.airplaneWrapper.style.left = `${left}px`;
  }

  stopAirplane() {
    this.airplaneWrapper.style.left = '0';
    this.startBtn.disabled = false;
    this.stopBtn.disabled = true;
    this.stopSpinner.classList.add('d-none');
    this.airplaneWrapper.classList.remove('animated');
    this.airplaneWrapper.style.transition = 'none';
  }

  showStopSpinner() {
    this.startBtn.disabled = true;
    this.stopSpinner.classList.remove('d-none');
  }
}
