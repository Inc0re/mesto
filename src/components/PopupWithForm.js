import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._submitForm = submitForm;
    this._form = this._popup.querySelector('.edit-form');
    this._inputList = this._form.querySelectorAll('.edit-form__field');
    this._button = this._form.querySelector('.edit-form__btn-save');
  }

  getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setInputValues(data) {
    this._inputList.forEach(input => {
      input.value = data[input.name];
    });
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitForm);
  }

  close() {
    super.close();
    this._form.reset();
  }

  renderLoading(text) {
    this._button.textContent = text;
  }

}

export default PopupWithForm;