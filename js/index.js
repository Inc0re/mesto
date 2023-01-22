// Секция выбора нужных элементов на странице
// Константы и переменные
const popupCloseBtnsArr = document.querySelectorAll('.popup__close');
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
// Шаблон карточки
const cardTemplate = document.querySelector('#card').content;
// Список всех попапов
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
  document.addEventListener('keydown', closeByEsc);
}

// Функция закрытия попапа
function closePopup(popupElement) {
  popupElement.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

// Функция обработчика отправки формы профиля
function handleEditProfileFormSubmit (evt) {
  // Отменить стандартное поведение
  evt.preventDefault(); 
  // Заменить данные в верстке
  profileName.textContent = nameInput.value;
  profileJob.textContent =  jobInput.value;
  closePopup(profileEditPopup);
}

// Функция обработчика отправки формы профиля
function handleAddPlaceFormSubmit (evt) {
  // Отменить стандартное поведение
  evt.preventDefault(); 
  // Создать новую карточку
  elements.prepend(createCard(placeInput.value, linkInput.value));
  closePopup(placeAddPopup);
}

// Функция открыттия просмотре фото
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

// // Закрытие попапа при нажатии на крестик (предыдущая версия)
// popupCloseBtnsArr.forEach((element) => 
//   element.addEventListener('click', ({target}) => 
//     closePopup(target.closest('.popup'))));

// Закрытие попапа при клике на крестик или на оверлей (через всплытие)
popupsArr.forEach(popup => {
  popup.addEventListener('click', evt => {
    if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});

// Кнопка изменения профиля (карандаш)
profileEditBtn.addEventListener('click', () => {
  // Открыть попап
  openPopup(profileEditPopup);
  // Загрузить данные в поля
  fillFormFields();
});

// Кнопка добааления места (+)
placeAddBtn.addEventListener('click', () => {
  placeInput.value = '';
  linkInput.value = '';
  openPopup(placeAddPopup);
  // Сделать кнопку в форме неактивной
  const placeAddSaveBtn = placeAddPopup.querySelector('.edit-form__btn-save');
  placeAddSaveBtn.disabled = true;
});


// Прикрепление обработчика к формам при отправке
profileEditFormElement.addEventListener('submit', handleEditProfileFormSubmit);
placeAddFormElement.addEventListener('submit', handleAddPlaceFormSubmit);


