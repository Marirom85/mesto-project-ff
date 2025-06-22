
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
const profleEditModal = document.querySelector(".popup_type_edit");
const profileEditForm = profleEditModal.querySelector(".popup__form");
const nameInput = profileEditForm.querySelector(".popup__input_type_name");
const descriptionInput = profileEditForm.querySelector(
  ".popup__input_type_description"
);
const profileAddModal = document.querySelector(".popup_type_new-card");
const profileAddForm = profileAddModal.querySelector(".popup__form");
const profileAddButton = document.querySelector(".profile__add-button");
const modalArray = document.querySelectorAll(".popup");
const openCardModal = (
  img,
  title,
  modal = document.querySelector(".popup_type_image")
) => {
  modal.querySelector(".popup__image").src = img.src;
  modal.querySelector(".popup__image").alt = img.alt;
  modal.querySelector(".popup__caption").textContent = title.textContent;
  openModal(modal);
};

initialCards.forEach((cardContent) => {
  const card = createCard(cardContent, deleteCard, likeCard, openCardModal);
  placesList.append(card);
});
profileEditButton.addEventListener("click", () => {
  fillFormInputs(
    [nameInput, descriptionInput],
    [profileTitle, profileDescription]
  );
  openModal(profleEditModal);
});
profileAddButton.addEventListener("click", () => {
  modalResetForm(profileAddForm);
  openModal(profileAddModal);
});
modalArray.forEach((modal) => {
  modal.addEventListener("click", (event) => {
    if (
      event.target === modal ||
      event.target.classList.contains("popup__close")
    ) {
      closeModal(modal);
    }
  });
});
profileEditForm.addEventListener("submit", (e) => {
  const content = handleFormSubmit(e);
  profileTitle.textContent = content.name;
  profileDescription.textContent = content.description;
  closeModal(profleEditModal);
});
profileAddForm.addEventListener("submit", (e) => {
  const cardContent = handleFormSubmit(e);
  closeModal(profileAddModal);
  const card = createCard(cardContent, deleteCard, likeCard, openCardModal);
  placesList.prepend(card);
});