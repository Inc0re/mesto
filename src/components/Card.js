class Card {
  constructor(
    data,
    cardTemplate,
    handleCardClick,
    handleDeleteCard,
    currentUserID
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes.length;
    this._id = data._id;
    this._canDelete = data.owner._id === currentUserID;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this.deleteCard = this.deleteCard.bind(this);
    this._likeCard = this._likeCard.bind(this);
  }

  _getElementFromTemplate() {
    const cardElement = this._cardTemplate
      .querySelector('.element')
      .cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    if (this._canDelete) {
      this._deleteButton.addEventListener('click', () =>
        this._handleDeleteCard(this)
      );
    }
    this._likeButton.addEventListener('click', () => this._likeCard());
    this._element
      .querySelector('.element__image')
      .addEventListener('click', () => this._openPreview());
  }

  deleteCard() {
    this._element.remove();
  }

  _likeCard() {
    this._likeButton.classList.toggle('element__like_active');
  }

  _openPreview() {
    this._handleCardClick(this._link, this._name);
  }

  getCardID() {
    return this._id;
  }

  getElement() {
    this._element = this._getElementFromTemplate();
    this._element.querySelector('.element__title').textContent = this._name;
    this._elementImage = this._element.querySelector('.element__image');
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;
    this._elementLikes = this._element.querySelector('.element__like-counter');
    this._elementLikes.textContent = this._likes;
    this._likeButton = this._element.querySelector('.element__like');
    this._deleteButton = this._element.querySelector('.element__delete');
    if (!this._canDelete) {
      this._deleteButton.remove();
    }

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
