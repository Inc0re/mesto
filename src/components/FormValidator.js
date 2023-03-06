class FormValidator {
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inputErrorSelector = config.inputErrorSelector;
    this._formElement = formElement;
  }

  // Имеет ли форма невалидный инпут
  _hasInvalidInput(inputList) {
    return inputList.some(
      inputElement => !inputElement.validity.valid
    );
  }

  // Изменение состояние кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.disabled = false;
    }
  }

  // Проверка валидности
  _checkInputValidity(inputElement, inputErrorClass) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputErrorClass);
    } else {
      this._hideInputError(inputElement, inputErrorClass);
    }
  }

  // Показать ошибку
  _showInputError(inputElement, inputErrorClass) {
    const errorElement =
      inputElement.parentElement.querySelector(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
  }

  // Спрятать ошибку
  _hideInputError(inputElement, inputErrorClass) {
    const errorElement =
      inputElement.parentElement.querySelector(inputErrorClass);
    errorElement.textContent = '';
  }

  _setEventListeners() {
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement, this._inputErrorSelector);
        this._toggleButtonState();
      });
    });
  }

  // Включение валидации
  enableValidation() {
    const formElement = this._formElement;
    this._inputList = Array.from(
      formElement.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = formElement.querySelector(
      this._submitButtonSelector
    );
    this._setEventListeners();
  }

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement, this._inputErrorSelector);
    });
  }
}

export default FormValidator;
