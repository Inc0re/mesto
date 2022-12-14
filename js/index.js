// Секция выбора нужных элементов на странице
// Константы и переменные
const popup = document.querySelector('.popup');
const popupCloseBtn = popup.querySelector('.popup__close');
const editProfileBtn = document.querySelector('.profile__edit-button');
const elements = document.querySelector('.elements');
const formElement = document.querySelector('.edit-form');
let nameInput = formElement.querySelector(`input[name='name']`);
let jobInput = formElement.querySelector(`input[name='job']`);
const profile = document.querySelector('.profile');
let profileName = profile.querySelector('.profile__name');
let profileJob = profile.querySelector('.profile__job');

// Функции

// Функция подгрузки значений Name и Job из верстки в поля формы
function fillFormFields() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// Функция переключения видимости попапа
function togglePopup() {
  popup.classList.toggle('popup_opened');
}

// Функция переключения лайков
elements.addEventListener('click', ({ target }) => {
  if (target.classList.contains('element__like')) { // если кликаем на элемент like то
    target.classList.toggle('element__like_active');// ставим убираем модификатор активности
  }
});

// Функция обработчика отправки формы
function handleFormSubmit (evt) {
  // Отменить стандартное поведение
  evt.preventDefault(); 
  // Заменить данные в верстке
  profileName.textContent = nameInput.value;
  profileJob.textContent =  jobInput.value;
  togglePopup();
}

// // Функция подгрузки текстового значения originClass в поле формы с name = destName
// function loadDataToField(originClass, destName) {
//   document.querySelector(`input[name="${destName}"]`).value = document.querySelector(`.${originClass}`).textContent;
// }

// // Функция вставки поля originName в элемент с классом destClass
// function loadDataToPage(originName, destClass) {
//   document.querySelector(`.${destClass}`).textContent = document.querySelector(`input[name="${originName}"]`).value;
// }

// Привязка функций к кнопкам

// Привязка функции togglePopup к кнопкам на верстке
popupCloseBtn.addEventListener('click', togglePopup);
editProfileBtn.addEventListener('click', togglePopup);

// Прикрепляем обработчик к форме при отправке
formElement.addEventListener('submit', handleFormSubmit);

// // Привязка функции loadDataToField к кнопке редактирования профиля
// editProfileBtn.addEventListener('click', () => {
//   loadDataToField('profile__name', 'name');
//   loadDataToField('profile__job', 'job');
// });








fillFormFields();