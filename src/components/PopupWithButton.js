import Popup from './Popup.js';

class PopupWithButton extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._button = this._popup.querySelector('.edit-form__btn-save');
  }

  setCallback(callback) {
    this._submitForm = callback;
  }
  
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', evt => {
      evt.preventDefault();
      this._submitForm();
    });
  }
}

export default PopupWithButton;