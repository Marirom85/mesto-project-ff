import "./pages/index.css";
import { openModal, closeModal } from "./components/modal.js";
import { createCard } from "./components/card.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import api from "./components/api.js";
import {
  renderLoading,
  handleSubmit,
  renderCard,
} from "./utils/utils.js";

// === DOM-элементы ===
const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const formEditProfile = document.forms["edit-profile"];
const inputName = formEditProfile.elements["name"];
const inputJob = formEditProfile.elements["description"];
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const buttonAddCard = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_new-card");
const formAddCard = document.forms["new-place"];

const popupImage = document.querySelector(".popup_type_image");
const popupImageEl = popupImage.querySelector(".popup__image");
const popupCaption = popupImage.querySelector(".popup__caption");

const cardsContainer = document.querySelector(".places__list");

document.querySelectorAll(".popup__close").forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => closeModal(popup));
});

function handleImageClick({ name, link }) {
  popupImageEl.src = link;
  popupImageEl.alt = name;
  popupCaption.textContent = name;
  openModal(popupImage);
}

function handleProfileFormSubmit(evt) {
  function makeRequest() {
    return api
      .updateUserInfo({ name: inputName.value, about: inputJob.value })
      .then((userData) => {
        profileName.textContent = userData.name;
        profileJob.textContent = userData.about;
        closeModal(popupEditProfile);
      });
  }
  handleSubmit(makeRequest, evt);
}

buttonAddCard.addEventListener("click", () => {
  formAddCard.reset();
  clearValidation(formAddCard, validationSettings);
  openModal(popupAddCard);
});

function handleAddCardSubmit(evt) {
  function makeRequest() {
    const name = formAddCard.elements["place-name"].value;
    const link = formAddCard.elements["link"].value;
    return api.addCard({ name, link }).then((cardData) => {
      renderCard(
        cardData,
        {
          createCard,
          onImageClick: handleImageClick,
          currentUserId,
        },
        cardsContainer,
        "prepend"
      );
      closeModal(popupAddCard);
    });
  }
  handleSubmit(makeRequest, evt);
}

const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

let currentUserId = null;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cards]) => {
    currentUserId = userData._id;
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    profileImage.style.backgroundImage = `url('${userData.avatar}')`;
    cards.forEach((cardData) => {
      renderCard(
        cardData,
        {
          createCard,
          onImageClick: handleImageClick,
          currentUserId,
        },
        cardsContainer,
        "append"
      );
    });
  })
  .catch(console.error);

buttonEditProfile.addEventListener("click", () => {
  inputName.value = profileName.textContent;
  inputJob.value = profileJob.textContent;
  clearValidation(formEditProfile, validationSettings);
  openModal(popupEditProfile);
});

formEditProfile.addEventListener("submit", handleProfileFormSubmit);
formAddCard.addEventListener("submit", handleAddCardSubmit);

enableValidation(validationSettings);