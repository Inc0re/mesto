// Import section
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { validationConfig, initialCards, cardTemplate } from './config.js';
// Секция выбора нужных элементов на странице
// Константы и переменные
const profileEditBtn = document.querySelector('.profile__edit-button');
const placeAddBtn = document.querySelector('.profile__add-button');
const elements = document.querySelector('.elements');
// Элементы попапа редактирования профиля
const profileEditPopup = document.querySelector('#edit-profile');
const profileEditFormElement = profileEditPopup.querySelector('.edit-form');
const nameInput = profileEditFormElement.querySelector(`input[name='name']`);
const jobInput = profileEditFormElement.querySelector(`input[name='job']`);
// Элементы Имя и Место работы в профиле
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
// Элементы попапа добавления места
const placeAddPopup = document.querySelector('#add-place');
const placeAddFormElement = placeAddPopup.querySelector('.edit-form');
const placeInput = placeAddFormElement.querySelector(`input[name='title']`);
const linkInput = placeAddFormElement.querySelector(`input[name='link']`);
const imagePopup = document.querySelector('#picture-popup');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__image-caption');

// Список всех попапов
const popupsArr = Array.from(document.querySelectorAll('.popup'));

// Enable validation for each form
const profileEditValidator = new FormValidator(
  validationConfig,
  profileEditFormElement
);
profileEditValidator.enableValidation();

const placeAddValidator = new FormValidator(
  validationConfig,
  placeAddFormElement
);
placeAddValidator.enableValidation();

// Функции

// Функция создание карточек внутри elements из переданного массива
function renderCardsFromArray(arr) {
  arr.forEach(element => {
    const card = createCard(element);
    elements.append(card.getElement());
  });
}

// Функция подгрузки значений Name и Job из верстки в поля формы
function fillFormFields() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// Функция открытия попапа
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

// Функция закрытия попапа
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

// Функция обработчика отправки формы профиля
function handleEditProfileFormSubmit(evt) {
  // Отменить стандартное поведение
  evt.preventDefault();
  // Заменить данные в верстке
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profileEditPopup);
}

// Create and return new card element
function createCard(data) {
  const card = new Card(data, cardTemplate, openImagePopup);
  return card;
}

// Функция обработчика отправки формы профиля
function handleAddPlaceFormSubmit(evt) {
  // Отменить стандартное поведение
  evt.preventDefault();
  // Создать новую карточку
  const card = createCard({ name: placeInput.value, link: linkInput.value });
  elements.prepend(card.getElement());
  closePopup(placeAddPopup);
}

// Функция открытия просмотра фото
function openImagePopup(url, caption) {
  imagePopupImage.src = url;
  imagePopupImage.alt = caption;
  imagePopupCaption.textContent = caption;
  openPopup(imagePopup);
}

// Закрытие попапа на Esc
function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

// Вызов функций и создание обработчиков

// Создание карточек из массива
renderCardsFromArray(initialCards);

// Закрытие попапа при клике на крестик или на оверлей (через всплытие)
popupsArr.forEach(popup => {
  popup.addEventListener('click', evt => {
    if (
      evt.target.classList.contains('popup') ||
      evt.target.classList.contains('popup__close')
    ) {
      closePopup(popup);
    }
  });
});

// Кнопка изменения профиля (карандаш)
profileEditBtn.addEventListener('click', () => {
  // Reset form errors
  resetFormErrors(profileEditFormElement);
  // Открыть попап
  openPopup(profileEditPopup);
  // Загрузить данные в поля
  fillFormFields();
});

// Кнопка добавления места (+)
placeAddBtn.addEventListener('click', () => {
  // Reset form fields
  placeAddFormElement.reset();
  // Reset form validation errors
  resetFormErrors(placeAddFormElement);
  openPopup(placeAddPopup);
  // Сделать кнопку в форме неактивной
  const placeAddSaveBtn = placeAddPopup.querySelector('.edit-form__btn-save');
  placeAddSaveBtn.disabled = true;
});

// Form errors reset function
// TODO: move to FormValidator class
function resetFormErrors(formElement) {
  formElement
    .querySelectorAll(validationConfig.inputErrorSelector)
    .forEach(error => {
      error.textContent = '';
    });
}

// Прикрепление обработчика к формам при отправке
profileEditFormElement.addEventListener('submit', handleEditProfileFormSubmit);
placeAddFormElement.addEventListener('submit', handleAddPlaceFormSubmit);
