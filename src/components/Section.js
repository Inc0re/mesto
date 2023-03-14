class Section {
  constructor(data, containerSelector) {
    // this._items = data.items;
    this._renderer = data.renderer;
    this._container = document.querySelector(containerSelector);
  }

  //отвечает за отрисовку всех элементов
  renderItems(items) {
    items.forEach(item => {
      this.addItem(this._renderer(item).getElement());
    });
  }

  addItem(element, isPrepend = false) {
    if (isPrepend) {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }
}

export default Section;
