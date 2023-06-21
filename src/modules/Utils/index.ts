export class Utils {
  static convertStringToNode(string: string): Node | null {
    const element = document.createElement('div');
    element.innerHTML = string;
    return element.firstChild;
  }
}
