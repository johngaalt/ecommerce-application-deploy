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
import { EventTypes } from 'eventBus/EventTypes';
import eventBus from 'eventBus/index';
import { Utils } from 'utils/index';

export class Editor {
  static EDITOR_ID = 'editor';
  static SELECTOR_INPUT_ID = 'selector-input';
  static BUTTON_ID = 'input-button';

  CSS_EDITOR_ID = 'css-editor';
  HTML_EDITOR_ID = 'html-editor';

  static changeInputValueListener() {
    const input = document.getElementById(this.SELECTOR_INPUT_ID);

    input?.addEventListener('change', Editor.changeInputValue);
  }

  static compareAnswerButtonListener() {
    const button = document.getElementById(this.BUTTON_ID);

    button?.addEventListener('click', Editor.clickButton);
  }

  static clickButton() {
    const input = document.getElementById(Editor.SELECTOR_INPUT_ID);
    if (DOMGuards.isHTMLInputElement(input)) {
      const value = input.value;
      if (value) {
        Editor.checkAnswer(value);
      }
    }
  }

  static changeInputValue(event: Event) {
    if (DOMGuards.isHTMLInputElement(event.target)) {
      const value = event.target.value;
      Editor.checkAnswer(value);
    }
  }

  private static checkAnswer(value: string) {
    const editor = document.getElementById(Editor.EDITOR_ID);
    const { currentLevelId } = gameState.get();
    const { selector } = allLevels.getCurrentLevel(currentLevelId);

    if (value === selector) {
      gameState.saveFinishedLevel(currentLevelId);
      const nextLevelId = currentLevelId + 1;
      gameState.saveCurrentLevelId(nextLevelId);
      eventBus.publish(EventTypes.selectLevelListItem, {
        levelId: nextLevelId,
      });
      eventBus.publish(EventTypes.finishLevel, undefined);
    } else {
      editor?.classList.add('shake');
      setTimeout(() => {
        editor?.classList.remove('shake');
      }, 500);
    }
  }

  getCurrentLevel(): ILevel {
    const { currentLevelId } = gameState.get();
    return allLevels.getCurrentLevel(currentLevelId);
  }

  initCSSEditor() {
    const codeEditor = document.getElementById(this.CSS_EDITOR_ID);
    if (codeEditor) {
      codeEditor.innerHTML = `<pre class="line-numbers language-css"><code>{
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
      const parsedMarkup = Utils.parseMarkup(boardMarkup);
      codeEditor.innerHTML = `<pre class="language-markup line-numbers"><code>${parsedMarkup}</code></pre>`;
      Prism.highlightAllUnder(codeEditor);
    }
  }

  render() {
    return editor;
  }
}
