export class Utils {
  static convertStringToNode(string: string): Node | null {
    const element = document.createElement('div');
    element.innerHTML = string;
    return element.firstChild;
  }

  static parseMarkup(htmlAsString: string) {
    return htmlAsString
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}
