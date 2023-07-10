interface ElementOptions {
  id?: string;
  classes?: string[];
}

export class View {
  createElement(tag: string, { id, classes }: ElementOptions = {}) {
    const element = document.createElement(tag);

    if (id) {
      element.id = id;
    }

    if (classes?.length) {
      element.classList.add(...classes);
    }

    return element;
  }

  getElement(selector: string) {
    return document.querySelector(selector);
  }
}
