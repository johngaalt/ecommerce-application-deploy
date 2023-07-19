interface ElementOptions {
  id?: string;
  classes?: string[];
}

export class ElementBuilder {
  createElement<T extends HTMLElement>(
    tag: string,
    { id, classes }: ElementOptions = {},
  ): T {
    const element = document.createElement(tag);

    if (id) {
      element.id = id;
    }

    if (classes?.length) {
      element.classList.add(...classes);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return element as any;
  }

  getElement(selector: string) {
    return document.querySelector(selector);
  }

  createIcon(name: string) {
    return this.createElement('i', {
      classes: ['bi', name],
    });
  }
}
