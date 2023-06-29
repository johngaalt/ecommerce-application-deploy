import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/plugins/line-numbers/prism-line-numbers';

import editor from './Editor.html';
import './Editor.scss';
import { allLevels } from 'gameState/Level';
import gameState from 'gameState/index';
import { ILevel } from 'gameState/types/ILevel';
import { DOMGuards } from 'utils/Guards';

export class Editor {
  static EDITOR_ID = 'editor';
  static SELECTOR_INPUT_ID = 'selector-input';

  CSS_EDITOR_ID = 'css-editor';
  HTML_EDITOR_ID = 'html-editor';

  static changeInputValueListener() {
    const input = document.getElementById(this.SELECTOR_INPUT_ID);

    input?.addEventListener('change', Editor.changeInputValue);
  }

  static changeInputValue(event: Event) {
    const editor = document.getElementById(Editor.EDITOR_ID);

    if (DOMGuards.isHTMLInputElement(event.target)) {
      const value = event.target.value;
      const { currentLevelId } = gameState.get();
      const { selector } = allLevels.getCurrentLevel(currentLevelId);

      if (value === selector) {
        gameState.saveFinishedLevel(currentLevelId);
      } else {
        editor?.classList.add('shake');
        setTimeout(() => {
          editor?.classList.remove('shake');
        }, 500);
      }
    }
  }

  getCurrentLevel(): ILevel {
    const { currentLevelId } = gameState.get();
    return allLevels.getCurrentLevel(currentLevelId);
  }

  initCSSEditor() {
    const codeEditor = document.getElementById(this.CSS_EDITOR_ID);
    if (codeEditor) {
      codeEditor.innerHTML = `<pre class="line-numbers" data-start="2"><code class="language-css">
  {
  /* Styles would go here. */
  }

  /*
  Type a number to skip to a level.
  Ex → "5" for level 5
  */
         </code></pre>`;
      Prism.highlightAllUnder(codeEditor);
    }
  }

  initHTMLEditor() {
    const { boardMarkup } = this.getCurrentLevel();
    const codeEditor = document.getElementById(this.HTML_EDITOR_ID);
    if (codeEditor) {
      codeEditor.innerHTML = `<pre><code class="language-markup line-numbers">${boardMarkup}</code></pre>`;
      Prism.highlightAllUnder(codeEditor);
    }
  }

  render() {
    return editor;
  }
}
