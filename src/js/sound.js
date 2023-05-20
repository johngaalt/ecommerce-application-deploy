import clickSound from '../../assets/sounds/click.wav';
import winSound from '../../assets/sounds/win.wav';
import loseSound from '../../assets/sounds/lose.wav';
import startSound from '../../assets/sounds/start.wav';

class Sound {
  isEnabled = true;

  playClickSound() {
    if (!this.isEnabled) return;

    const audio = new Audio(clickSound);
    audio.play();
  }

  playWinSound() {
    if (!this.isEnabled) return;

    const audio = new Audio(winSound);
    audio.play();
  }

  playLoseSound() {
    if (!this.isEnabled) return;

    const audio = new Audio(loseSound);
    audio.play();
  }

  playStartSound() {
    if (!this.isEnabled) return;

    const audio = new Audio(startSound);
    audio.play();
  }
}

export default new Sound();
