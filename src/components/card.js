
const cardTemplate = document.querySelector("#card-template").content;
const createCard = (content, onDeleteCard, onLikeCard, onOpenModal) => {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  cardImage.src = content.link;
  cardImage.alt = `Фотография места: ${content.name}`;
  cardTitle.textContent = content.name;
  deleteButton.addEventListener("click", () => onDeleteCard(cardElement));
  likeButton.addEventListener("click", () => onLikeCard(likeButton));
  cardImage.addEventListener("click", () => onOpenModal(cardImage, cardTitle));
  return cardElement;
};
const deleteCard = (cardElement) => {
  cardElement.remove();
};
const likeCard = (element) => {
  element.classList.toggle("card__like-button_is-active");
};
export { createCard, deleteCard, likeCard };