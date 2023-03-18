class Card {
  constructor(
    data,
    cardTemplate,
    handleCardClick,
    handleDeleteCard,
    handleLikeCard,
    currentUserID
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes.length;
    this.isLiked = data.likes.some(like => like._id === currentUserID);
    this._id = data._id;
    this._canDelete = data.owner._id === currentUserID;
    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;

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
    this._likeButton.addEventListener('click', () => {
      this._handleLikeCard(this);
      this._likeCard();
    });
    this._element
      .querySelector('.element__image')
      .addEventListener('click', () => this._openPreview());
  }

  _likeCard() {
    this._likeButton.classList.toggle('element__like_active');
  }

  _openPreview() {
    this._handleCardClick(this._link, this._name);
  }

  deleteCard() {
    this._element.remove();
  }

  getCardID() {
    return this._id;
  }

  setLikesCount(count) {
    this._elementLikes.textContent = count;
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
    if (this.isLiked) {
      this._likeCard();
    }
    this._setEventListeners();

    return this._element;
  }
}

export default Card;
