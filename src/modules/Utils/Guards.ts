export class DOMGuards {
  static isHTMLElement(element: unknown): element is HTMLElement {
    return !!element && element instanceof HTMLElement;
  }
}

export class ObjectGuards {
  static hasProp<T>(data: unknown, prop: string): data is Record<string, T> {
    return !!data && typeof data === 'object' && prop in data;
  }
}
