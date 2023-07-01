export class Utils {
  static convertStringToNode(string: string): Node | null {
    const element = document.createElement('div');
    element.innerHTML = string;
    return element.firstChild;
  }

  static parseMarkup(htmlAsString: string) {
    const wrapper = `<div class="table">\n  ${htmlAsString}\n</div>`;
    return wrapper
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}
