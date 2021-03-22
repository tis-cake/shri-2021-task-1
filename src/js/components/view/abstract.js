const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstElementChild;
};

class Abstract {
  constructor(data) {
    if (new.target === Abstract) {
      throw new Error('Невозможно создать экземляр класса Abstract, так как он является родительским классом');
    }

    this._data = data;
    this._element = null;
  }

  getTemplate() {
    throw new Error('Метод класса Abstract не реализует getTemplate');
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._data = null;
    this._element = null;
  }
}

export { Abstract };
