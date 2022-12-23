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
// Шаблон карточки
const cardTemplate = document.querySelector('#card').content;
// Массив для заполнения карточек по умолчанию
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Функции

// Функция создание карточек внутри elements из переданного массива
function renderCardsFromArray(arr) {
  arr.forEach(element => {
    const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
    cardElement.querySelector('.element__image').src = element.link;
    cardElement.querySelector('.element__title').textContent = element.name;
    elements.append(cardElement);
  });
}

// Функция подгрузки значений Name и Job из верстки в поля формы
function fillFormFields() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// Функция переключения видимости попапа
function togglePopup(popupElement) {
  popupElement.classList.toggle('popup_opened');
}

// Функция обработчика отправки формы профиля
function handleEditProfileFormSubmit (evt) {
  // Отменить стандартное поведение
  evt.preventDefault(); 
  // Заменить данные в верстке
  profileName.textContent = nameInput.value;
  profileJob.textContent =  jobInput.value;
  togglePopup(editProfilePopup);
}

// Функция обработчика отправки формы профиля
function handleAddPlaceFormSubmit (evt) {
  // Отменить стандартное поведение
  evt.preventDefault(); 
  // Создать новую карточку
  if (placeInput.value && linkInput.value) {
    renderCardsFromArray([{
      name: placeInput.value,
      link: linkInput.value
    }]);
  }
  togglePopup(addPlacePopup);
}

// Привязка функций к кнопкам

// Создание карточек из массива
renderCardsFromArray(initialCards);

// Привязка функции togglePopup к кнопкам на верстке
popupCloseBtnsArr.forEach((element) => 
  element.addEventListener('click', ({target}) => 
    togglePopup(target.parentElement.parentElement)));

editProfileBtn.addEventListener('click', () => {
  // Открыть попап
  togglePopup(editProfilePopup);
  // Загрузить данные в поля
  fillFormFields();
});
addPlaceBtn.addEventListener('click', () => togglePopup(addPlacePopup));


// Прикрепление обработчика к формам при отправке
editProfileFormElement.addEventListener('submit', handleEditProfileFormSubmit);
addPlaceFormElement.addEventListener('submit', handleAddPlaceFormSubmit);

// Переключение лайков
elements.addEventListener('click', ({ target }) => {
  if (target.classList.contains('element__like')) { // если кликаем на элемент like то
    target.classList.toggle('element__like_active');// ставим убираем модификатор активности
  }
});
