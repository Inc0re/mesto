// Имеет ли форма невалидный инпут
function hasInvalidInput(inputList) {
  return inputList.some(inputElement => !inputElement.validity.valid);
};

// Изменение состояние кнопки
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
  } else {
    buttonElement.disabled = false;
  }
};

// Проверка валидности
function checkInputValidity(inputElement, inputErrorClass) {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, inputErrorClass);
  } else {
    hideInputError(inputElement, inputErrorClass);
  }
};

// Скрыть ошибку
function showInputError(inputElement, inputErrorClass) {
  const errorElement = inputElement.parentElement.querySelector(inputErrorClass);
  // inputElement.classList.add('form__input_type_error');
  errorElement.textContent = inputElement.validationMessage;
  // errorElement.classList.add('form__input-error_active');
};

// Показать ошибку
function hideInputError(inputElement, inputErrorClass) {
  const errorElement = inputElement.parentElement.querySelector(inputErrorClass);
  errorElement.textContent = '';
};

// Включение валидации
function enableValidation({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inputErrorSelector
}) {
  Array.from(document.querySelectorAll(formSelector)).forEach(formElement => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    const inputErrorClass = inputErrorSelector;
  
    inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () =>{
        checkInputValidity(inputElement, inputErrorClass);
        toggleButtonState(inputList, buttonElement);
      });
    });
  });
};

// enableValidation({
//   formSelector: '.edit-form',
//   inputSelector: '.edit-form__field',
//   submitButtonSelector: '.edit-form__btn-save',
//   inputErrorSelector: '.edit-form__error',
// });