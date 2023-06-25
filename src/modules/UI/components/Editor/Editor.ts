import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-markup';
import 'prismjs/plugins/line-numbers/prism-line-numbers';

import editor from './Editor.html';

export class Editor {
  CSS_EDITOR_ID = 'css-editor';
  HTML_EDITOR_ID = 'html-editor';

  initCSSEditor() {
    const codeEditor = document.getElementById(this.CSS_EDITOR_ID);
    if (codeEditor) {
      codeEditor.innerHTML =
        '<pre class="line-numbers" data-start="2"><code class="language-css"> p { color: red } </code></pre>';
      Prism.highlightAllUnder(codeEditor);
    }
  }

  initHTMLEditor() {
    const codeEditor = document.getElementById(this.HTML_EDITOR_ID);
    if (codeEditor) {
      codeEditor.innerHTML =
        '<pre><code class="language-markup line-numbers"><-- Your code here --></code></pre>';
      Prism.highlightAllUnder(codeEditor);
    }
  }

  render() {
    return editor;
  }
}
