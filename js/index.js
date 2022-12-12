// Секция выбора нужных элементов на странице
const popup = document.querySelector('.popup');
const editFormSaveSaveBtn = popup.querySelector('.edit-form__btn-save');
const popupCloseBtn = popup.querySelector('.popup__close');
const editProfileBtn = document.querySelector('.profile__edit-button');
const elements = document.querySelector('.elements');

// Функции

// Функция переключения видимости попапа
function togglePopup() {
  popup.classList.toggle('popup_opened');
}

// Функция подгрузки текстового значения originClass в поле формы с name = destName
function loadDataToField(originClass, destName) {
  document.querySelector(`input[name="${destName}"]`).value = document.querySelector(`.${originClass}`).textContent;
}

// Функция вставки поля originName в элемент с классом destClass
function loadDataToPage(originName, destClass) {
  document.querySelector(`.${destClass}`).textContent = document.querySelector(`input[name="${originName}"]`).value;
}

// Привязка функций к кнопкам

// Привязка функции togglePopup к кнопкам на верстке
popupCloseBtn.addEventListener('click', togglePopup);
editProfileBtn.addEventListener('click', togglePopup);

// Привязка функции loadDataToField к кнопке редактирования профиля
editProfileBtn.addEventListener('click', () => {
  loadDataToField('profile__name', 'name');
  loadDataToField('profile__job', 'job');
});

// Привязка функции к кнопке сохранить
editFormSaveSaveBtn.addEventListener('click', () => {
  loadDataToPage('name', 'profile__name');
  loadDataToPage('job', 'profile__job');
});

// Функция переключения лайков
elements.addEventListener('click', ({ target }) => {
  if (target.classList.contains('element__like')) { // если кликаем на элемент like то
    target.classList.toggle('element__like_active');// ставим убираем модификатор активности
  }
});

