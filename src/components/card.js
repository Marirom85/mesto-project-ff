// card.js

const cardTemplate = document.querySelector('#card-template').content;

function createCard(data, handleDelete, handleLike, handleOpenImage) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const likeButton = cardElement.querySelector('.card__like-button');
  const deleteButton = cardElement.querySelector('.card__delete-button');

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardTitle.textContent = data.name;

  likeButton.addEventListener('click', () => {
    handleLike(cardElement);
  });

  deleteButton.addEventListener('click', () => {
    handleDelete(cardElement);
  });

  cardImage.addEventListener('click', () => {
    handleOpenImage(data);
  });

  return cardElement;
}

function deleteCard(cardElement) {
  cardElement.remove();
}

function likeCard(cardElement) {
  const likeButton = cardElement.querySelector('.card__like-button');
  likeButton.classList.toggle('card__like-button_is-active');
}

export { createCard, deleteCard, likeCard };