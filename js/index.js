// Секция выбора нужных элементов на странице
// Константы и переменные
const popupCloseBtn = document.querySelector('.popup__close');
const editProfileBtn = document.querySelector('.profile__edit-button');
const elements = document.querySelector('.elements');
const nameInput = document.querySelector(`input[name='name']`);
const jobInput = document.querySelector(`input[name='job']`);
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const popup = document.querySelector('.popup');
const formElement = document.querySelector('.edit-form');
const cardTemplate = document.querySelector('#card').content;
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
function togglePopup() {
  popup.classList.toggle('popup_opened');
}

// Функция обработчика отправки формы
function handleFormSubmit (evt) {
  // Отменить стандартное поведение
  evt.preventDefault(); 
  // Заменить данные в верстке
  profileName.textContent = nameInput.value;
  profileJob.textContent =  jobInput.value;
  togglePopup();
}

// Привязка функций к кнопкам

// Создание карточек из массива
renderCardsFromArray(initialCards);

// Привязка функции togglePopup к кнопкам на верстке
popupCloseBtn.addEventListener('click', togglePopup);
editProfileBtn.addEventListener('click', () => {
  // Открыть попап
  togglePopup();
  // Загрузить данные в поля
  fillFormFields();
});

// Прикрепление обработчика к форме при отправке
formElement.addEventListener('submit', handleFormSubmit);

// Переключение лайков
elements.addEventListener('click', ({ target }) => {
  if (target.classList.contains('element__like')) { // если кликаем на элемент like то
    target.classList.toggle('element__like_active');// ставим убираем модификатор активности
  }
});
