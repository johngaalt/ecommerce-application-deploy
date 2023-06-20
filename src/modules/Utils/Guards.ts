export class Guards {
  static isHTMLElement(element: unknown): element is HTMLElement {
    return !!element && element instanceof HTMLElement;
  }
}
