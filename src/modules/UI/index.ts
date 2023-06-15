import { createHeader } from './components/Header/Header';
import { createGameWrapper } from './components/GameWrapper/GameWrapper';

export function initApp() {
  const header = createHeader();
  const gameWrapper = createGameWrapper();

  document.body.innerHTML = header + gameWrapper;
}
