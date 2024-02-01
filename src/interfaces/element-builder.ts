interface ElementOptions {
  id?: string;
  classes?: string[];
  dataset?: Record<string, string>[];
}

export class ElementBuilder {
  createElement<T extends HTMLElement>(
    tag: string,
    { id, classes, dataset }: ElementOptions = {},
  ): T {
    const element = document.createElement(tag);

    if (id) {
      element.id = id;
    }

    if (classes?.length) {
      element.classList.add(...classes);
    }

    if (dataset) {
      for (const data of dataset) {
        for (const key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            element.dataset[key] = data[key];
          }
        }
      }
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
