// Import section
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { validationConfig, cardTemplate, initialCards } from '../cfg/config.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';

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

// Add place popup elements
const placeAddPopupElement = document.querySelector('#add-place');
const placeAddFormElement = placeAddPopupElement.querySelector('.edit-form');
// Create class instances
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-61',
  headers: {
    authorization: 'c519be36-1688-462e-850e-24d5f59a3900',
    'Content-Type': 'application/json',
  }
});

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
  { renderer: createCard },
  '.elements'
);

// Fetch initial cards from server and render them
api.getInitialCards().then((data) => {
  cardsList.renderItems(data);
});

// cardsList.renderItems(initialCards);

const popupWithImage = new PopupWithImage('#picture-popup');
popupWithImage.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
  avatarSelector: '.profile__avatar',
});

// Fetch user info from server and set it to user info
api.getCurrentUserInfo().then((data) => {
  console.log(data);
  userInfo.setUserInfo(data);
});

const profileEditPopup = new PopupWithForm(
  '#edit-profile',
  handleEditProfileFormSubmit
);
profileEditPopup.setEventListeners();

const placeAddPopup = new PopupWithForm('#add-place', handleAddPlaceFormSubmit);
placeAddPopup.setEventListeners();

// Functions

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
  userInfo.setUserInfo(profileEditPopup.getInputValues());
  // Close popup
  profileEditPopup.close();
}

// Add place form submit handler function
function handleAddPlaceFormSubmit(evt) {
  // Prevent default form submit
  evt.preventDefault();
  // Create new card element
  const card = createCard(placeAddPopup.getInputValues());
  cardsList.addItem(card.getElement(), true);
  placeAddPopup.close();
}

// Profile edit button (✎)
profileEditBtn.addEventListener('click', () => {
  // Reset form errors
  profileEditValidator.resetValidation();
  // Open popup
  profileEditPopup.open();
  // Fill form fields with user info
  profileEditPopup.setInputValues(userInfo.getUserInfo());
});

// Add place button (+)
placeAddBtn.addEventListener('click', () => {
  // Reset form validation errors
  placeAddValidator.resetValidation();
  placeAddPopup.open();
});