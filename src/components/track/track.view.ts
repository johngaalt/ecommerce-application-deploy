import { ElementBuilder } from 'interfaces/element-builder';
import './track.scss';
import { Airplane } from 'types/airplane.type';
import { View } from 'interfaces/view';

export class TrackView extends ElementBuilder implements View {
  selectBtn: HTMLButtonElement;
  removeBtn: HTMLButtonElement;
  startBtn: HTMLButtonElement;
  stopBtn: HTMLButtonElement;
  airplaneWrapper: HTMLDivElement;
  startSpinner: HTMLSpanElement;
  stopSpinner: HTMLSpanElement;
  editContainer: HTMLDivElement;
  buttonWrapper2: HTMLDivElement;
  model: HTMLSpanElement;
  buttonWrapper1: HTMLDivElement;
  wrapper: HTMLDivElement;
  airplane: HTMLElement;
  flag: HTMLElement;
  trackContainer: HTMLDivElement;

  constructor(item: Airplane) {
    super();
    this.editContainer = this.createElement('div', {
      classes: ['mt-3', 'd-flex', 'justify-content-between'],
    });
    this.buttonWrapper2 = this.createElement<HTMLDivElement>('div');

    this.selectBtn = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-outline-light', 'me-2', 'btn-sm'],
    });
    this.selectBtn.textContent = 'Select';
    this.selectBtn.type = 'button';

    this.removeBtn = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-outline-danger', 'me-2', 'btn-sm'],
    });
    this.removeBtn.textContent = 'Remove';
    this.removeBtn.type = 'button';

    this.model = this.createElement('span', {
      id: String(item.id),
      classes: ['fw-bold', 'text-light'],
    });
    this.model.textContent = item.name;

    this.trackContainer = this.createElement<HTMLDivElement>('div', {
      classes: ['d-flex', 'mt-3', 'flex-column'],
    });

    this.buttonWrapper1 = this.createElement('div');

    this.startSpinner = this.createElement('span', {
      classes: ['d-none', 'spinner-border', 'spinner-border-sm', 'me-1'],
    });

    this.startBtn = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-outline-light', 'me-2', 'btn-sm'],
    });
    this.startBtn.textContent = 'Start';
    this.startBtn.type = 'button';

    this.stopSpinner = this.createElement('span', {
      classes: ['d-none', 'spinner-border', 'spinner-border-sm', 'me-1'],
    });

    this.stopBtn = this.createElement<HTMLButtonElement>('button', {
      classes: ['btn', 'btn-outline-danger', 'me-2', 'btn-sm'],
    });
    this.stopBtn.disabled = true;
    this.stopBtn.textContent = 'Stop';
    this.stopBtn.type = 'button';

    this.wrapper = this.createElement<HTMLDivElement>('div', {
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
    this.airplane = this.createIcon('bi-airplane-fill');
    this.airplane.style.color = item.color;

    this.flag = this.createIcon('bi-flag-fill');
    this.flag.classList.add('text-danger');
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
    // TODO: fix transition reset to properly restart animation
    this.airplaneWrapper.style.transition = 'none';
    this.airplaneWrapper.style.left = `${left}px`;
  }

  stopAirplane() {
    this.airplaneWrapper.style.left = '0';
    this.startBtn.disabled = false;
    this.stopBtn.disabled = true;
    this.stopSpinner.classList.add('d-none');
    this.airplaneWrapper.classList.remove('animated');
    // TODO: fix transition reset to properly restart animation
    this.airplaneWrapper.style.transition = 'none';
  }

  showStopSpinner() {
    this.startBtn.disabled = true;
    this.stopSpinner.classList.remove('d-none');
  }

  render() {
    this.startBtn.prepend(this.startSpinner);
    this.stopBtn.prepend(this.stopSpinner);
    this.airplaneWrapper.appendChild(this.airplane);
    this.wrapper.append(this.airplaneWrapper, this.flag);
    this.buttonWrapper1.append(this.selectBtn, this.removeBtn, this.model);
    this.buttonWrapper2.append(this.startBtn, this.stopBtn);
    this.editContainer.append(this.buttonWrapper1, this.buttonWrapper2);
    this.trackContainer.append(this.wrapper);

    const parent = this.getElement('#list');
    if (parent) {
      parent.append(this.editContainer, this.trackContainer);
    }
  }
}
