import "./pages/index.css";
import { openModal, closeModal } from "./components/modal.js";
import { createCard } from "./components/card.js";
import {
  enableValidation,
  clearValidation,
  validationSettings,
} from "./components/validation.js";
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

// Универсальный обработчик профиля
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
          onDelete: (cardElement, cardId) => {
            cardToDelete = { cardElement, cardId };
            openModal(popupDeleteCard);
          },
          onLike: handleLike,
          onImageClick: ({ name, link }) => {
            popupImageEl.src = link;
            popupImageEl.alt = name;
            popupCaption.textContent = name;
            openModal(popupImage);
          },
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

let currentUserId = null;
let cardToDelete = null;

function handleLike(cardId, likeButton, likeCount, isLiked) {
  const apiMethod = isLiked ? api.unlikeCard : api.likeCard;
  apiMethod
    .call(api, cardId)
    .then((updatedCard) => {
      likeButton.classList.toggle(
        "card__like-button_is-active",
        updatedCard.likes.some((user) => user._id === currentUserId)
      );
      likeCount.textContent = updatedCard.likes.length;
    })
    .catch(console.error);
}

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
          onDelete: (cardElement, cardId) => {
            cardToDelete = { cardElement, cardId };
            openModal(popupDeleteCard);
          },
          onLike: handleLike,
          onImageClick: ({ name, link }) => {
            popupImageEl.src = link;
            popupImageEl.alt = name;
            popupCaption.textContent = name;
            openModal(popupImage);
          },
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

const popupDeleteCard = document.querySelector(".popup_type_delete-card");
const confirmDeleteButton = popupDeleteCard?.querySelector(".popup__button");

if (confirmDeleteButton) {
  confirmDeleteButton.addEventListener("click", () => {
    if (cardToDelete) {
      api
        .deleteCard(cardToDelete.cardId)
        .then(() => {
          cardToDelete.cardElement.remove();
          closeModal(popupDeleteCard);
          cardToDelete = null;
        })
        .catch(console.error);
    }
  });
}

const avatarPopup = document.querySelector(".popup_type_edit-avatar");
const avatarForm = document.forms["edit-avatar"];
const avatarInput = avatarForm.elements["avatar"];
const profileImage = document.querySelector(".profile__image");

profileImage.addEventListener("click", () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationSettings);
  openModal(avatarPopup);
});

function handleAvatarFormSubmit(evt) {
  function makeRequest() {
    return api.updateAvatar({ avatar: avatarInput.value }).then((userData) => {
      profileImage.style.backgroundImage = `url('${userData.avatar}')`;
      closeModal(avatarPopup);
    });
  }
  handleSubmit(makeRequest, evt);
}
avatarForm.addEventListener("submit", handleAvatarFormSubmit);
