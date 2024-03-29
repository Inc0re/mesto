// Import section
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithButton from '../components/PopupWithButton.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import { validationConfig, cardTemplate } from '../cfg/config.js';
import Section from '../components/Section.js';
import Api from '../components/Api.js';

// import index.css from styles folder for webpack to process it
import '../pages/index.css'; // добавьте импорт главного файла стилей

// Select elements from DOM
// Constants and variables
const profileEditBtn = document.querySelector('.profile__edit-button');
const placeAddBtn = document.querySelector('.profile__add-button');
const avatarEditBtn = document.querySelector('.profile__avatar-edit');
// Profile edit popup elements
const profileEditPopupElement = document.querySelector('#edit-profile');
const profileEditFormElement =
  profileEditPopupElement.querySelector('.edit-form');

// Add place popup elements
const placeAddPopupElement = document.querySelector('#add-place');
const placeAddFormElement = placeAddPopupElement.querySelector('.edit-form');
const avatarEditFormElement = document.querySelector('#edit-avatar');
// Create class instances
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-61',
  headers: {
    authorization: 'c519be36-1688-462e-850e-24d5f59a3900',
    'Content-Type': 'application/json',
  },
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

const avatarEditValidator = new FormValidator(
  validationConfig,
  avatarEditFormElement
);
avatarEditValidator.enableValidation();

const cardsList = new Section({ renderer: createCard }, '.elements');

// Promise all to prevent loading of cards before user info is loaded
Promise.all([
  // Fetch user info from server and set it to user info
  api.getCurrentUserInfo(),
  // Fetch initial cards from server and render them
  api.getInitialCards(),
])
  .then(([userData, cardsData]) => {
    // Set user info
    userInfo.setUserInfo(userData);
    // Render cards
    cardsList.renderItems(cardsData);
  })
  .catch(err => {
    console.log(err);
  });

const popupWithImage = new PopupWithImage('#picture-popup');
popupWithImage.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: '.profile__name',
  jobSelector: '.profile__job',
  avatarSelector: '.profile__avatar',
});

const profileEditPopup = new PopupWithForm(
  '#edit-profile',
  handleEditProfileFormSubmit
);
profileEditPopup.setEventListeners();

const placeAddPopup = new PopupWithForm('#add-place', handleAddPlaceFormSubmit);
placeAddPopup.setEventListeners();

const avatarEditPopup = new PopupWithForm('#edit-avatar', handleAvatarEditFormSubmit);
avatarEditPopup.setEventListeners();

const deleteCardPopup = new PopupWithButton('#confirm');
deleteCardPopup.setEventListeners();

// Functions

// Open popup with image
function handleCardClick(link, name) {
  popupWithImage.open(link, name);
}

// Create and return new card element
function createCard(data) {
  const card = new Card(data, cardTemplate, handleCardClick, handleDeleteCard, handleLikeCard, userInfo.getUserId());
  return card;
}

// Edit profile form submit handler function
function handleEditProfileFormSubmit(evt) {
  // Show loading state
  profileEditPopup.renderLoading('Сохранение...');
  // Prevent default form submit
  evt.preventDefault();
  // Send user info to server
  api.updateUserInfo(profileEditPopup.getInputValues()).then(data => {
    // Set user info to user info
    userInfo.setUserInfo(data);
    // Close popup
    profileEditPopup.close();
  }).catch(err => {
    console.log(err);
  }).finally(() => {
    // Hide loading state
    profileEditPopup.renderLoading('Сохранить');
  });
}

// Edit avatar form submit handler function
function handleAvatarEditFormSubmit(evt) {
  // Show loading state
  avatarEditPopup.renderLoading('Сохранение...');
  // Prevent default form submit
  evt.preventDefault();
  // Send user info to server
  api.updateUserAvatar(avatarEditPopup.getInputValues()).then(data => {
    // Set user info to user info
    userInfo.setUserInfo(data);
    // Close popup
    avatarEditPopup.close();
  }).catch(err => {
    console.log(err);
  }).finally(() => {
    // Hide loading state
    avatarEditPopup.renderLoading('Сохранить');
  });
}

// Add place form submit handler function
function handleAddPlaceFormSubmit(evt) {
  // Show loading state
  placeAddPopup.renderLoading('Создание...');
  // Prevent default form submit
  evt.preventDefault();
  // Send new card data to server
  api.addNewCard(placeAddPopup.getInputValues()).then(data => {
    // Add new card to DOM
    const card = createCard(data);
    cardsList.addItem(card.getElement(), true);
    placeAddPopup.close();
  }).catch(err => {
    console.log(err);
  }).finally(() => {
    // Hide loading state
    placeAddPopup.renderLoading('Создать');
  });
}

// Delete card handler function
function handleDeleteCard(card) {
  // Open popup
  deleteCardPopup.open();
  // Set callback
  deleteCardPopup.setCallback(() => {
    // Send delete request to server
    api.deleteCard(card.getCardID()).then(() => {
      // Remove card from DOM
      card.deleteCard();
      deleteCardPopup.close();
    });
  }).catch(err => {
    console.log(err);
  });
}

// Like card handler function
function handleLikeCard(card) {
  //Check if card is liked
  if (card.isLiked) {
    // Send dislike request to server
    api.dislikeCard(card.getCardID()).then(data => {
      // Set likes count
      card.setLikesCount(data.likes.length);
      card.isLiked = false;
      card.toggleLikeBtn();
    });
  } else {
    // Send like request to server
    api.likeCard(card.getCardID()).then(data => {
      // Set likes count
      card.setLikesCount(data.likes.length);
      card.isLiked = true;
      card.toggleLikeBtn();
    });
  }
}

// Callbacks

// Profile edit button (✎) click callback
function profileEditCallback() {
  // Reset form validation errors
  profileEditValidator.resetValidation();
  // Open popup
  profileEditPopup.open();
  // Fill form fields with user info
  profileEditPopup.setInputValues(userInfo.getUserInfo());
}

// Avatar edit button (✎) click callback
function avatarEditCallback() {
  // Reset form validation errors
  avatarEditValidator.resetValidation();
  // Open popup
  avatarEditPopup.open();
}

// Place add button (+) click callback
function placeAddCallback() {
  // Reset form validation errors
  placeAddValidator.resetValidation();
  // Open popup
  placeAddPopup.open();
}

// Event listeners

// Profile edit button (✎)
profileEditBtn.addEventListener('click', profileEditCallback);

// Avatar edit button (✎)
avatarEditBtn.addEventListener('click', avatarEditCallback);

// Add place button (+)
placeAddBtn.addEventListener('click', placeAddCallback);
