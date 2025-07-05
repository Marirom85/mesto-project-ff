// Шаблон карточки ищем один раз
const cardTemplateElement = document
  .querySelector("#card-template")
  .content.querySelector(".card");

export function createCard(
  data,
  { onDelete, onLike, onImageClick, currentUserId }
) {
  const cardElement = cardTemplateElement.cloneNode(true);
  const imageElement = cardElement.querySelector(".card__image");
  const titleElement = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");
  const deleteButton = cardElement.querySelector(".card__delete-button");

  titleElement.textContent = data.name;
  imageElement.src = data.link;
  imageElement.alt = data.name;

  // Показываем количество лайков
  likeCount.textContent = data.likes.length;

  // Отображаем активный лайк, если пользователь уже лайкнул
  const isLiked = data.likes.some((user) => user._id === currentUserId);
  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  }

  // Показываем корзину только на своих карточках
  if (!data.owner || data.owner._id !== currentUserId) {
    deleteButton.style.display = "none";
  } else {
    deleteButton.addEventListener("click", () =>
      onDelete(cardElement, data._id)
    );
  }

  likeButton.addEventListener("click", () =>
    onLike(
      data._id,
      likeButton,
      likeCount,
      likeButton.classList.contains("card__like-button_is-active")
    )
  );
  imageElement.addEventListener("click", () => onImageClick(data));

  return cardElement;
}

export function deleteCard(cardElement) {
  cardElement.remove();
}

export function toggleCardLike(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}