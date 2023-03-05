// Import section
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';
import { validationConfig, initialCards, cardTemplate } from './config.js';
import Section from './Section.js';

// import index.css from styles folder for webpack to process it
import '../pages/index.css'; // добавьте импорт главного файла стилей

// Select elements from DOM
// Constants and variables
const profileEditBtn = document.querySelector('.profile__edit-button');
const placeAddBtn = document.querySelector('.profile__add-button');
// Profile edit popup elements
const profileEditPopupElement = document.querySelector('#edit-profile');
const profileEditFormElement =
  profileEditPopupElement.querySelector('.edit-form');
const nameInput = profileEditFormElement.querySelector(`input[name='name']`);
const jobInput = profileEditFormElement.querySelector(`input[name='job']`);

// Add place popup elements
const placeAddPopupElement = document.querySelector('#add-place');
const placeAddFormElement = placeAddPopupElement.querySelector('.edit-form');
const placeInput = placeAddFormElement.querySelector(`input[name='title']`);
const linkInput = placeAddFormElement.querySelector(`input[name='link']`);

// Create class instances

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

const cardsList = new Section(
  { items: initialCards, renderer: createCard },
  '.elements'
);
cardsList.renderItems();

const popupWithImage = new PopupWithImage('#picture-popup');

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
});

const profileEditPopup = new PopupWithForm(
  '#edit-profile',
  handleEditProfileFormSubmit
);

const placeAddPopup = new PopupWithForm('#add-place', handleAddPlaceFormSubmit);

// Functions

// Get user info and fill form fields
function fillFormFields() {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.job;
}

// Open popup with image
function handleCardClick(link, name) {
  popupWithImage.open(link, name);
}

// Create and return new card element
function createCard(data) {
  const card = new Card(data, cardTemplate, handleCardClick);
  return card;
}

// Edit profile form submit handler function
function handleEditProfileFormSubmit(evt) {
  // Prevent default form submit
  evt.preventDefault();
  // Get data from form instance and set it to user info
  userInfo.setUserInfo(profileEditPopup._getInputValues());
  // Close popup
  profileEditPopup.close();
}

// Add place form submit handler function
function handleAddPlaceFormSubmit(evt) {
  // Prevent default form submit
  evt.preventDefault();
  // Create new card element
  const card = createCard(placeAddPopup._getInputValues());
  // const card = createCard({ name: placeInput.value, link: linkInput.value });
  cardsList.addItem(card.getElement(), true);
  placeAddPopup.close();
}

// Profile edit button (✎)
profileEditBtn.addEventListener('click', () => {
  // Reset form errors
  resetFormErrors(profileEditFormElement);
  // Open popup
  profileEditPopup.open();
  // Fill form fields
  fillFormFields();
});

// Add place button (+)
placeAddBtn.addEventListener('click', () => {
  // Reset form validation errors
  resetFormErrors(placeAddFormElement);
  placeAddPopup.open();
});

// Form errors reset function
function resetFormErrors(formElement) {
  formElement
    .querySelectorAll(validationConfig.inputErrorSelector)
    .forEach(error => {
      error.textContent = '';
    });
}