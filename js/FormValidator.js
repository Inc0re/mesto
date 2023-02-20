class FormValidator {
  constructor(config) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inputErrorSelector = config.inputErrorSelector;
  }

  // Имеет ли форма невалидный инпут
  _hasInvalidInput(inputList) {
    return inputList.some(
      inputElement => !inputElement.validity.valid
    );
  }

  // Изменение состояние кнопки
  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
    } else {
      buttonElement.disabled = false;
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

  // Добавить обработчики сабмита формы
  _setEventListeners() {}

  // Добавить слушатели
  _handleFormSubmit() {}

  // Включение валидации
  enableValidation() {
    Array.from(document.querySelectorAll(this._formSelector)).forEach(
      formElement => {
        const inputList = Array.from(
          formElement.querySelectorAll(this._inputSelector)
        );
        const buttonElement = formElement.querySelector(
          this._submitButtonSelector
        );
        const inputErrorClass = this._inputErrorSelector;

        inputList.forEach(inputElement => {
          inputElement.addEventListener('input', () => {
            this._checkInputValidity(inputElement, inputErrorClass);
            this._toggleButtonState(inputList, buttonElement);
          });
        });
      }
    );
  }
}

export default FormValidator;
