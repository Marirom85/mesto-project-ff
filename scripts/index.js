// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

// создание карточки
function createCard(cardData, onDelete) {
	// Клон шаблон карточки
	const cardTemplate = document.querySelector("#card-template").content;
	const cardElement = cardTemplate
		.querySelector(".places__item")
		.cloneNode(true);

	// Заполняем данные карточки
	cardElement.querySelector(".card__title").textContent = cardData.name;
	const cardImage = cardElement.querySelector(".card__image");
	cardImage.src = cardData.link;
	cardImage.alt = cardData.name;

	// Добавляем обработчик для кнопки delete
	cardElement
		.querySelector(".card__delete-button")
		.addEventListener("click", () => {
			onDelete(cardElement);
		});

	return cardElement;
}
// функция удаления карточки
const removeCard = (cardElement) => {
	cardElement.remove();
};
// Функция инициализации карточек
function initializeCards() {
	const cardList = document.querySelector(".places__list");

	initialCards.forEach((cardData) => {
		const cardElement = createCard(cardData, removeCard);
		cardList.append(cardElement);
	});
}

// Запуск функции
initializeCards();
