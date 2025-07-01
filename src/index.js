import "core-js/stable";
import "regenerator-runtime/runtime";
import "./pages/index.css";

import initialCards from "./utils/initialcards.js"; // проверьте регистр файла!

import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import { modalResetForm } from "./components/form.js";
import { enableValidation, clearValidation } from "./components/validation.js";

// Конфигурация для валидации форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

// Включаем валидатор для всех форм с конфигом
enableValidation(validationConfig);

// Получаем ссылки на элементы профиля
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Список карточек
const placesList = document.querySelector(".places__list");

// Кнопки и модалки для профиля
const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector(".popup_type_edit");
const profileEditForm = profileEditModal.querySelector(".popup__form");
const nameInput = profileEditForm.querySelector(".popup__input_type_name");
const descriptionInput = profileEditForm.querySelector(".popup__input_type_description");

// Кнопки и модалки для добавления места
const profileAddButton = document.querySelector(".profile__add-button");
const profileAddModal = document.querySelector(".popup_type_new-card");
const profileAddForm = profileAddModal.querySelector(".popup__form");

// Модалка показа увеличенной картинки
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupImageCaption = popupTypeImage.querySelector(".popup__caption");

// Открытие модалки с карточкой (увеличение картинки)
function openCardModal(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupImageCaption.textContent = cardData.name;
  openModal(popupTypeImage);
}

// Добавляем начальные карточки из массива initialCards
initialCards.forEach((cardContent) => {
  const card = createCard(cardContent, deleteCard, likeCard, openCardModal);
  placesList.append(card);
});

// Обработчик клика по кнопке добавления нового места
profileAddButton.addEventListener('click', () => {
  clearValidation(profileAddForm, validationConfig);
  modalResetForm(profileAddModal);
  openModal(profileAddModal);
});

// Обработчик клика по кнопке редактирования профиля - открывает модалку и заполняет поля из профиля
profileEditButton.addEventListener('click', () => {
  clearValidation(profileEditForm, validationConfig);
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
});

// Обработчик сабмита формы редактирования профиля
profileEditForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  // обновляем данные профиля
  profileTitle.textContent = nameInput.value.trim();
  profileDescription.textContent = descriptionInput.value.trim();
  closeModal(profileEditModal);
});

// Обработчик сабмита формы добавления новой карточки
profileAddForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const cardName = profileAddForm.elements.name.value.trim();
  const cardLink = profileAddForm.elements.link.value.trim();

  if (cardName && cardLink) {
    const cardData = {
      name: cardName,
      link: cardLink,
    };
    const newCard = createCard(cardData, deleteCard, likeCard, openCardModal);
    placesList.prepend(newCard);

    closeModal(profileAddModal);
    modalResetForm(profileAddModal);
    clearValidation(profileAddForm, validationConfig);
    profileAddForm.reset();
  }
});
