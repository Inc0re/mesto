// Функция переключения видимости попапа
function togglePopup() {
  let popup = document.querySelector('.popup');
  popup.classList.toggle('popup_opened');
}

// Привязка функции togglePopup к кнопкам на верстке
let popupCloseBtn = document.querySelector('.popup__close');
let editProfileBtn = document.querySelector('.profile__edit-button');
popupCloseBtn.addEventListener('click', togglePopup);
editProfileBtn.addEventListener('click', togglePopup);

// Функция переключения лайков
let elements = document.querySelector('.elements'); // выбираем блок elements целиком
elements.addEventListener('click', ({target}) => {
  if (target.classList.contains('element__like')) { // если кликаем на элемент like то
    target.classList.toggle('element__like_active');// ставим убираем модификатор активности
  }
}); 