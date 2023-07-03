import footer from './Footer.html';
import './Footer.scss';

export class Footer {
  render(hiddenClass: string) {
    return footer.replace('#HIDDENCLASS#', hiddenClass);
  }
}
