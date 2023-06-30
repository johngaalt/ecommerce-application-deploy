import './Victory.scss';
import eventBus from 'eventBus/index';
import victory from './Victory.html';
import { EventTypes } from 'eventBus/EventTypes';
import gameState from 'gameState/index';
import { allLevels } from 'gameState/Level';

export class Victory {
  VICTORY_ID = 'victory';
  CONFETTI_ID = 'confetti-container';

  constructor() {
    eventBus.subscribe(
      EventTypes.finishLevel,
      this.showVictoryAnimation.bind(this)
    );
  }

  showVictoryAnimation() {
    const { finishedLevels } = gameState.get();
    if (finishedLevels.size === allLevels.getTotalCount()) {
      const victoryEl = document.getElementById(this.VICTORY_ID);
      const confettiContainer = document.getElementById(this.CONFETTI_ID);

      if (victoryEl && confettiContainer) {
        victoryEl.classList.remove('hidden', 'h-0');
        victoryEl.classList.add('active-animation');
        confettiContainer.classList.remove('hidden', 'h-0');
        confettiContainer.classList.add('confetti-container');
        this.createConfetti();

        setTimeout(() => {
          victoryEl.classList.remove('active-animation');
          victoryEl.classList.add('hidden', 'h-0');
          confettiContainer.classList.remove('confetti-container');
          confettiContainer.classList.add('hidden', 'h-0');
          confettiContainer.innerHTML = '';
        }, 3000);
      }
    }
  }

  createConfetti() {
    const confettiContainer = document.getElementById(this.CONFETTI_ID);

    const colors = [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#FF8A65',
      '#7C4DFF',
      '#FF5722',
      '#4CAF50',
      '#F44336',
      '#2196F3',
      '#FFEB3B',
      '#673AB7',
      '#00BCD4',
      '#9C27B0',
      '#3F51B5',
      '#FF9800',
      '#CDDC39',
      '#795548',
      '#E91E63',
      '#00E676',
      '#FFEB3B',
    ];

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti');

      const size = Math.floor(Math.random() * 20 + 10);
      const color = colors[Math.floor(Math.random() * colors.length)];

      confetti.style.width = `${size}px`;
      confetti.style.height = `${size}px`;
      confetti.style.backgroundColor = color;

      const x = Math.floor(Math.random() * window.innerWidth);
      const y = Math.floor(Math.random() * window.innerHeight);

      confetti.style.left = `${x}px`;
      confetti.style.top = `${y}px`;

      confettiContainer?.appendChild(confetti);
    }
  }

  render() {
    return victory;
  }
}
