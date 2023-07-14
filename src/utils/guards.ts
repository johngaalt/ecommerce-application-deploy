export class DOMGuards {
  static isHTMLElement(element: unknown): element is HTMLElement {
    return !!element && element instanceof HTMLElement;
  }
}
