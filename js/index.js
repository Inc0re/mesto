// Секция выбора нужных элементов на странице
// Константы и переменные
const popupCloseBtnsArr = document.querySelectorAll('.popup__close');
const editProfileBtn = document.querySelector('.profile__edit-button');
const addPlaceBtn = document.querySelector('.profile__add-button');
const elements = document.querySelector('.elements');
// Элементы попапа редактирования профиля
const editProfilePopup = document.querySelector('#edit-profile');
const editProfileFormElement = editProfilePopup.querySelector('.edit-form');
const nameInput = editProfileFormElement.querySelector(`input[name='name']`);
const jobInput = editProfileFormElement.querySelector(`input[name='job']`);
// Элементы Имя и Место работы в профиле
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
// Элементы попапа добавления места
const addPlacePopup = document.querySelector('#add-place');
const addPlaceFormElement = addPlacePopup.querySelector('.edit-form');
const placeInput = addPlaceFormElement.querySelector(`input[name='title']`);
const linkInput = addPlaceFormElement.querySelector(`input[name='link']`);
const imagePopup = document.querySelector('#picture-popup');
const imagePopupImage = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__image-caption');
// Шаблон карточки
const cardTemplate = document.querySelector('#card').content;

const popupsArr = Array.from(document.querySelectorAll('.popup'));

// Функции

// Функция создания карточки и добавления обработчиков для удаления и лайка
function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardElementImage = cardElement.querySelector('.element__image');
  const deleteButton = cardElement.querySelector('.element__delete');
  const likeButton = cardElement.querySelector('.element__like');
  
  cardElementImage.src = link;
  cardElementImage.alt = name;
  cardElement.querySelector('.element__title').textContent = name;

  deleteButton.addEventListener('click', () => cardElement.remove());
  likeButton.addEventListener('click', () => likeButton.classList.toggle('element__like_active'));
  cardElementImage.addEventListener('click', () => openImagePopup(link, name));

  return cardElement;
}

// Функция создание карточек внутри elements из переданного массива
function renderCardsFromArray(arr) {
  arr.forEach(element => elements.append(createCard(element.name, element.link)));
}

// Функция подгрузки значений Name и Job из верстки в поля формы
function fillFormFields() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// Функция открытия попапа
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}

// Функция закрытия попапа
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
}

// Функция обработчика отправки формы профиля
function handleEditProfileFormSubmit (evt) {
  // Отменить стандартное поведение
  evt.preventDefault(); 
  // Заменить данные в верстке
  profileName.textContent = nameInput.value;
  profileJob.textContent =  jobInput.value;
  closePopup(editProfilePopup);
}

// Функция обработчика отправки формы профиля
function handleAddPlaceFormSubmit (evt) {
  // Отменить стандартное поведение
  evt.preventDefault(); 
  // Создать новую карточку
  if (placeInput.value && linkInput.value) {
    elements.prepend(createCard(placeInput.value, linkInput.value));
  }
  closePopup(addPlacePopup);
}

// Функция открыттия просмотре фото
function openImagePopup(url, caption) {
  imagePopupImage.src = url;
  imagePopupImage.alt = caption;
  imagePopupCaption.textContent = caption;
  openPopup(imagePopup);
}

// Вызов функций и создание обработчиков

// Создание карточек из массива
renderCardsFromArray(initialCards);

// // Закрытие попапа при нажатии на крестик (предыдущая версия)
// popupCloseBtnsArr.forEach((element) => 
//   element.addEventListener('click', ({target}) => 
//     closePopup(target.closest('.popup'))));

// Закрытие попапа при клике на крестик или на оверлей (через всплытие)
popupsArr.forEach(popup => {
  popup.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup')) {
      closePopup(evt.target);
    } else if (evt.target.classList.contains('popup__close')) {
      closePopup(evt.target.closest('.popup'));
    }
  });
});

// Закрытие попапов при нажатии Escape
document.addEventListener('keydown', evt => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
      openedPopup.classList.remove('popup_opened');
    }
  }
});

// Кнопка изменения профиля (карандаш)
editProfileBtn.addEventListener('click', () => {
  // Открыть попап
  openPopup(editProfilePopup);
  // Загрузить данные в поля
  fillFormFields();
});

// Кнопка добааления места (+)
addPlaceBtn.addEventListener('click', () => {
  placeInput.value = '';
  linkInput.value = '';
  openPopup(addPlacePopup);
});


// Прикрепление обработчика к формам при отправке
editProfileFormElement.addEventListener('submit', handleEditProfileFormSubmit);
addPlaceFormElement.addEventListener('submit', handleAddPlaceFormSubmit);


