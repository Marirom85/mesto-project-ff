import "core-js/stable";
import "regenerator-runtime/runtime";
import "./pages/index.css";
import initialCards from "./utils/initialcards.js";
import { createCard, deleteCard, likeCard } from "./components/card.js";
import { openModal, closeModal } from "./components/modal.js";
import {
  fillFormInputs,
  modalResetForm,
  handleFormSubmit,
} from "./components/form.js";

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const placesList = document.querySelector(".places__list");

const profileEditButton = document.querySelector(".profile__edit-button");
const profileEditModal = document.querySelector(".popup_type_edit");
const profileEditForm = profileEditModal.querySelector(".popup__form");
const nameInput = profileEditForm.querySelector(".popup__input_type_name");
const descriptionInput = profileEditForm.querySelector(
  ".popup__input_type_description"
);

const profileAddButton = document.querySelector(".profile__add-button");
const profileAddModal = document.querySelector(".popup_type_new-card");
const profileAddForm = profileAddModal.querySelector(".popup__form");

const modalArray = document.querySelectorAll(".popup");

const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = popupTypeImage.querySelector(".popup__image");
const popupImageCaption = popupTypeImage.querySelector(".popup__caption");


function openCardModal(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupImageCaption.textContent = cardData.name;
  openModal(popupTypeImage);
}

initialCards.forEach((cardContent) => {
  const card = createCard(cardContent, deleteCard, likeCard, openCardModal);
  placesList.append(card);
});

function handleAddButtonClick() {
  modalResetForm(profileAddForm);
  openModal(profileAddModal);
}

profileAddButton.addEventListener("click", handleAddButtonClick);


modalArray.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (event.target === modal || event.target.classList.contains("popup__close")) {
      closeModal(modal);
    }
  });
});

function handleEditButtonClick() {
  fillFormInputs([nameInput, descriptionInput], [profileTitle, profileDescription]);
  openModal(profileEditModal);
}

profileEditButton.addEventListener("click", handleEditButtonClick);


profileEditForm.addEventListener("submit", (e) => {
  const content = handleFormSubmit(e);
  profileTitle.textContent = content.name;
  profileDescription.textContent = content.description;
  closeModal(profileEditModal);
});

profileAddForm.addEventListener("submit", (e) => {
  const cardContent = handleFormSubmit(e);
  closeModal(profileAddModal);
  const card = createCard(cardContent, deleteCard, likeCard, openCardModal);
  placesList.prepend(card);
});