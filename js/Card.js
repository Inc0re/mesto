class Card {
  constructor(data, cardTemplate, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;

    this._deleteCard = this._deleteCard.bind(this);
    this._likeCard = this._likeCard.bind(this);
  }

  _getElementFromTemplate() {
    const cardElement = this._cardTemplate
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  getElement() {
    this._element = this._getElementFromTemplate();
    this._element.querySelector('.element__title').textContent = this._name;
    this._elementImage = this._element.querySelector('.element__image');
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;

    this._setEventListeners();

    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector('.element__delete')
      .addEventListener('click', () => this._deleteCard());
    this._element
      .querySelector('.element__like')
      .addEventListener('click', () => this._likeCard());
    this._element
      .querySelector('.element__image')
      .addEventListener('click', () => this._openPreview());
  }

  _deleteCard() {
    this._element.remove();
  }

  _likeCard() {
    this._element
      .querySelector('.element__like')
      .classList.toggle('element__like_active');
  }

  _openPreview() {
    this._handleCardClick(this._link, this._name);
  }
}

export default Card;
