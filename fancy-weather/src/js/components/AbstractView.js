const render = (markupString) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = markupString.trim();
  return wrapper;
};

export default class AbstractView {
  constructor() {
    if (new.target === AbstractView) {
      throw new Error('This is an abstract class.');
    }
  }

  get template() {
    throw new Error('Template is required!');
  }

  get element() {
    if (this.element) {
      return this.element;
    }

    this.element = this.render();
    this.bind(this.element);
    return this.element;
  }

  render() {
    return render(this.template);
  }

  bindListeners(_element) {
    return this.element;
  }
}
